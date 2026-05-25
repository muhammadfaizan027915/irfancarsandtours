import "server-only";

import { after } from "next/server";

import {
  BookingRequestDto,
  BookingResponseDto,
  BookingResponseSchema,
  BookingWithUserListItemResponseDto,
  BookingWithUserListItemResponseSchema,
  GetBookingsBodyDto,
  GetBookingsByUserIdBodyDto,
  PaginatedBookingResponseDto,
  PaginatedBookingResponseSchema,
  PaginatedBookingWithUserResponseDto,
  PaginatedBookingWithUserResponseSchema,
  UpdateBookingRequestBodyDto,
} from "@icat/contracts";
import { db, DbOrTransaction } from "@icat/database";
import { sendBookingConfirmationEmail } from "@icat/lib/emails";
import { BookingRepository } from "@icat/repositories";
import { BookedCarService, CarService, UserService } from "@icat/services";

export class BookingService {
  private bookingRepository: BookingRepository;
  private bookedCarService: BookedCarService;
  private userService: UserService;
  private carService: CarService;

  constructor() {
    this.bookingRepository = new BookingRepository();
    this.bookedCarService = new BookedCarService();
    this.carService = new CarService();
    this.userService = new UserService();
  }

  async getAll(
    args?: GetBookingsBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<PaginatedBookingWithUserResponseDto> {
    const result = await this.bookingRepository.findAll(args, tx);
    return PaginatedBookingWithUserResponseSchema.parse(result);
  }

  async getAllByUserId(
    args: GetBookingsByUserIdBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<PaginatedBookingResponseDto> {
    const result = await this.bookingRepository.findAllByUserId(args, tx);
    return PaginatedBookingResponseSchema.parse(result);
  }

  async getBookingById(
    bookingId: string,
    tx: DbOrTransaction = db,
  ): Promise<BookingResponseDto | null> {
    const booking = await this.bookingRepository.findById(bookingId, tx);
    return booking ? BookingResponseSchema.parse(booking) : null;
  }

  async getBookingByIdWithUser(
    bookingId: string,
    tx: DbOrTransaction = db,
  ): Promise<BookingWithUserListItemResponseDto | null> {
    const booking = await this.bookingRepository.findByIdWithUser(
      bookingId,
      tx,
    );
    return booking
      ? BookingWithUserListItemResponseSchema.parse(booking)
      : null;
  }

  async createBooking(
    { cars, userId, ...data }: BookingRequestDto,
    providedUserId?: string,
    tx: DbOrTransaction = db,
  ): Promise<BookingResponseDto> {
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
      }

      const carIds = cars.map((car) => car.carId);
      const carsWithDriverAndStartingPrice =
        await this.carService.getCarsDriverAndStartingPrice(
          carIds,
          transaction,
        );

      const carDetailsMap = new Map(
        carsWithDriverAndStartingPrice.map((c) => [c.id, c]),
      );

      const bookedCars = cars.map((car) => {
        const carDetail = carDetailsMap.get(car.carId);
        const quotedPrice = car.quotedPrice ?? carDetail?.startingPrice ?? 0;

        totalPrice += quotedPrice * (car.quantity ?? 1);

        return {
          ...car,
          bookedWithDriver: carDetail?.forceWithDriver ?? car.bookedWithDriver,
          quotedPrice,
        };
      });

      const booking = await this.bookingRepository.create(
        {
          ...data,
          userId: activeUserId,
          pickupDate: new Date(data.pickupDate),
          dropoffDate: new Date(data.dropoffDate),
          totalPrice,
        },
        transaction,
      );

      await this.userService.updateUser(activeUserId, data, transaction);

      await this.bookedCarService.createMany(
        bookedCars.map((bc) => ({ ...bc, bookingId: booking.id })),
        transaction,
      );

      const parsedBooking = BookingResponseSchema.parse(booking);

      if (user && parsedBooking) {
        after(
          sendBookingConfirmationEmail({
            user,
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

  async updateBooking(
    bookingId: string,
    data: UpdateBookingRequestBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<BookingResponseDto | null> {
    const booking = await this.bookingRepository.update(bookingId, data, tx);
    return booking ? BookingResponseSchema.parse(booking) : null;
  }
}
