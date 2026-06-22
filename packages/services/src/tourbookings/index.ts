
import { eq, sql } from "drizzle-orm";
import { after } from "next/server";

import {
  GetTourBookingByUserIdBodyDto,
  GetTourBookingsBodyDto,
  PaginatedTourBookingResponseDto,
  PaginatedTourBookingResponseSchema,
  PaginatedTourBookingWithUserResponseDto,
  PaginatedTourBookingWithUserResponseSchema,
  TourBookingBodyDto,
  TourBookingResponseDto,
  TourBookingResponseSchema,
  TourBookingWithUserListItemResponseDto,
  TourBookingWithUserListItemResponseSchema,
} from "@icat/contracts";
import {
  bookedToursTable,
  BookingStatus,
  db,
  DbOrTransaction,
} from "@icat/database";
import { ValidationError } from "@icat/lib/errors";
import {
  sendTourBookingConfirmationEmail,
  sendTourBookingCreatedAdminEmail,
  sendTourBookingPriceUpdateEmail,
  sendTourBookingStatusUpdateEmail,
} from "@icat/lib/emails";
import { TourBookingRepository } from "@icat/repositories";

import { BookedTourService } from "../bookedtours";
import { TourService } from "../tours";
import { UserService } from "../users";

export class TourBookingService {
  private userService: UserService;
  private tourService: TourService;
  private bookedTourService: BookedTourService;
  private tourBookingRepository: TourBookingRepository;

  constructor() {
    this.userService = new UserService();
    this.tourService = new TourService();
    this.bookedTourService = new BookedTourService();
    this.tourBookingRepository = new TourBookingRepository();
  }

  async getAll(
    query?: GetTourBookingsBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<PaginatedTourBookingWithUserResponseDto> {
    const result = await this.tourBookingRepository.findAll(query, tx);
    return PaginatedTourBookingWithUserResponseSchema.parse(result);
  }

  async getAllByUserId(
    query: GetTourBookingByUserIdBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<PaginatedTourBookingResponseDto> {
    const result = await this.tourBookingRepository.findAllByUserId(query, tx);
    return PaginatedTourBookingResponseSchema.parse(result);
  }

  async getById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<TourBookingResponseDto | null> {
    const booking = await this.tourBookingRepository.findById(id, tx);
    return booking ? TourBookingResponseSchema.parse(booking) : null;
  }

  async getByIdWithUser(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<TourBookingWithUserListItemResponseDto | null> {
    const booking = await this.tourBookingRepository.findByIdWithUser(id, tx);
    return booking
      ? TourBookingWithUserListItemResponseSchema.parse(booking)
      : null;
  }

  async updateStatus(
    id: string,
    status: BookingStatus,
    tx: DbOrTransaction = db,
  ) {
    const updatedBooking = await this.tourBookingRepository.updateStatus(
      id,
      status,
      tx,
    );

    if (updatedBooking) {
      after(
        sendTourBookingStatusUpdateEmail({
          user: { name: updatedBooking.name, email: updatedBooking.email },
          booking: updatedBooking,
        }),
      );
    }

    return updatedBooking;
  }

  async createBooking(
    { tours, userId, ...data }: TourBookingBodyDto,
    providedUserId?: string,
    tx: DbOrTransaction = db,
  ): Promise<TourBookingResponseDto> {
    const executeCreate = async (transaction: DbOrTransaction) => {
      let totalPrice = 0;
      let user = null;
      let activeUserId = userId || providedUserId;

      if (!activeUserId) {
        try {
          user = await this.userService.getUserByEmail(data.email, transaction);
          activeUserId = user.id;
        } catch {
          user = await this.userService.createUser(data, transaction);
          activeUserId = user.id;
        }
      } else {
        user = await this.userService.findById(activeUserId!, transaction);
      }

      const tourIds = tours.map((tour) => tour.tourId);
      const toursPricingsAndCapacity =
        await this.tourService.getToursPricingsAndCapacity(
          tourIds,
          transaction,
        );

      for (const tour of toursPricingsAndCapacity) {
        const [capacity] = await tx
          .select({
            booked: sql<number>`COALESCE(SUM(adults_number + children_number), 0)`,
          })
          .from(bookedToursTable)
          .where(eq(bookedToursTable.tourId, tour.id));

        const currentBooked = Number(capacity.booked);
        const requestedParticipants = tours
          .filter((t) => t.tourId === tour.id)
          .reduce(
            (sum, t) => sum + (t.adultsNumber ?? 0) + (t.childrenNumber ?? 0),
            0,
          );

        if (currentBooked + requestedParticipants > tour.maxCapacity) {
          throw new ValidationError({
            message: `Tour "${tour.name}" has reached its capacity limit. Available spots: ${
              tour.maxCapacity - currentBooked
            }`,
          });
        }
      }

      const tourDetailsMap = new Map(
        toursPricingsAndCapacity.map((t) => [t.id, t]),
      );

      const bookedTours = tours.map((tour) => {
        const tourDetail = tourDetailsMap.get(tour.tourId);
        const quotedPricePerAdult = tourDetail?.pricePerAdult ?? 0;
        const quotedPricePerChild = tourDetail?.pricePerChild ?? 0;

        totalPrice +=
          quotedPricePerAdult * (tour.adultsNumber ?? 0) +
          quotedPricePerChild * (tour.childrenNumber ?? 0);

        return {
          ...tour,
          quotedPricePerAdult,
          quotedPricePerChild,
        };
      });

      const booking = await this.tourBookingRepository.create(
        {
          ...data,
          userId: activeUserId,
          name: data.name,
          email: data.email,
          phone: data.phone,
          cnic: data.cnic,
          totalPrice,
        },
        transaction,
      );

      await this.bookedTourService.createBookedTours(
        bookedTours.map((bt) => ({ ...bt, tourBookingId: booking.id })),
        transaction,
      );

      const parsedBooking = TourBookingResponseSchema.parse(booking);

      if (parsedBooking) {
        after(
          sendTourBookingConfirmationEmail({
            user: { name: parsedBooking.name, email: parsedBooking.email },
            booking: parsedBooking,
          }),
        );
        after(
          sendTourBookingCreatedAdminEmail({
            user: { name: parsedBooking.name, email: parsedBooking.email },
            booking: parsedBooking,
          }),
        );
      }

      return parsedBooking;
    };

    return tx === db
      ? await db.transaction((newTx) => executeCreate(newTx))
      : await executeCreate(tx);
  }

  async recalculateTotalPrice(
    bookingId: string,
    tx: DbOrTransaction = db,
  ): Promise<void> {
    const bookedTours = await this.bookedTourService.getBookedToursByBookingId(
      bookingId,
      tx,
    );

    let totalPrice = 0;
    for (const tour of bookedTours) {
      totalPrice +=
        (tour.quotedPricePerAdult ?? 0) * (tour.adultsNumber ?? 0) +
        (tour.quotedPricePerChild ?? 0) * (tour.childrenNumber ?? 0);
    }

    await this.tourBookingRepository.update(bookingId, { totalPrice }, tx);
  }

  async updateBookedTourPrices(
    bookedTourId: string,
    quotedPricePerAdult: number,
    quotedPricePerChild: number,
    tx: DbOrTransaction = db,
  ) {
    const executeUpdate = async (transaction: DbOrTransaction) => {
      const updatedBookedTour = await this.bookedTourService.update(
        bookedTourId,
        { quotedPricePerAdult, quotedPricePerChild },
        transaction,
      );

      if (updatedBookedTour?.tourBookingId) {
        await this.recalculateTotalPrice(
          updatedBookedTour.tourBookingId,
          transaction,
        );

        const booking = await this.tourBookingRepository.findById(
          updatedBookedTour.tourBookingId,
          transaction,
        );

        if (booking) {
          const parsedBooking = TourBookingResponseSchema.parse(booking);

          if (parsedBooking) {
            after(
              sendTourBookingPriceUpdateEmail({
                user: { name: parsedBooking.name, email: parsedBooking.email },
                booking: parsedBooking,
              }),
            );
          }
        }
      }

      return updatedBookedTour;
    };

    return tx === db
      ? await db.transaction((newTx) => executeUpdate(newTx))
      : await executeUpdate(tx);
  }

  async deleteBookingsWithDeletedTours(tx: DbOrTransaction = db) {
    const executeDelete = async (transaction: DbOrTransaction) => {
      const bookingIds =
        await this.tourBookingRepository.findIdsWithDeletedTours(transaction);

      if (bookingIds.length > 0) {
        await this.tourBookingRepository.deleteMany(bookingIds, transaction);
      }
    };

    return tx === db
      ? await db.transaction((newTx) => executeDelete(newTx))
      : await executeDelete(tx);
  }
}
