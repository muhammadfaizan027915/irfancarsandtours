import {
  BookingRepository,
  BookedCarRepository,
  CarRepository,
} from "@icat/repositories";
import {
  BookingRequestDto,
  BookingResponseDto,
  BookingResponseSchema,
  BookingWithUserListItemDto,
  BookingWithUserListItemResponseSchema,
  GetBookingsBodyDto,
  GetBookingsByUserIdBodyDto,
  PaginatedBookingResponseDto,
  PaginatedBookingResponseSchema,
  PaginatedBookingWithUserResponseDto,
  PaginatedBookingWithUserResponseSchema,
} from "@icat/contracts";
import { UserService } from "@icat/services/users";
import { auth } from "@icat/lib";

export class BookingService {
  private bookingRepository: BookingRepository;
  private bookedCarRepository: BookedCarRepository;
  private carRepository: CarRepository;
  private userService: UserService;

  constructor() {
    this.bookingRepository = new BookingRepository();
    this.bookedCarRepository = new BookedCarRepository();
    this.carRepository = new CarRepository();
    this.userService = new UserService();
  }

  async getAll(
    args?: GetBookingsBodyDto
  ): Promise<PaginatedBookingWithUserResponseDto> {
    const result = await this.bookingRepository.findAll(args);
    return PaginatedBookingWithUserResponseSchema.parse(result);
  }

  async getAllByUserId(
    args: GetBookingsByUserIdBodyDto
  ): Promise<PaginatedBookingResponseDto> {
    const result = await this.bookingRepository.findAllByUserId(args);
    return PaginatedBookingResponseSchema.parse(result);
  }

  async getBookingById(bookingId: string): Promise<BookingResponseDto | null> {
    const booking = await this.bookingRepository.findById(bookingId);
    return booking ? BookingResponseSchema.parse(booking) : null;
  }

  async getBookingByIdWithUser(
    bookingId: string
  ): Promise<BookingWithUserListItemDto | null> {
    const booking = await this.bookingRepository.findByIdWithUser(bookingId);
    return booking
      ? BookingWithUserListItemResponseSchema.parse(booking)
      : null;
  }

  async createBooking({
    cars,
    ...data
  }: BookingRequestDto): Promise<BookingResponseDto> {
    const session = await auth();
    const sessionUser = session?.user;

    const booking = await this.bookingRepository.create({
      ...data,
      userId: sessionUser?.id as string,
      pickupDate: new Date(data.pickupDate),
      dropoffDate: new Date(data.dropoffDate),
    });

    this.userService.updateUser(sessionUser?.id as string, data);

    const carIds = cars.map((car) => car?.carId);
    const carsWithDriverRules = await this.carRepository.findCarsDriverRules(
      carIds
    );

    for await (const car of cars) {
      const carWithDriverRule = carsWithDriverRules.find(
        (c) => c.id === car.carId
      );

      await this.bookedCarRepository.create({
        ...car,
        bookingId: booking.id,
        bookedWithDriver: carWithDriverRule?.forceWithDriver
          ? carWithDriverRule?.forceWithDriver
          : car?.bookedWithDriver,
      });
    }

    return BookingResponseSchema.parse(booking);
  }
}
