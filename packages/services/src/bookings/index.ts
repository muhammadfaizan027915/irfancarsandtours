import {
  BookingRepository,
  BookedCarRepository,
  CarRepository,
} from "@icat/repositories";
import { BookingSelect } from "@icat/database";
import {
  CarBookingRequestDto,
  CarBookingResponseDto,
  CarBookingResponseSchema,
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

  async createBooking({
    cars,
    ...data
  }: CarBookingRequestDto): Promise<CarBookingResponseDto> {
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

    return CarBookingResponseSchema.parse(booking);
  }

  async getBookingById(
    bookingId: string
  ): Promise<CarBookingResponseDto | null> {
    const booking = await this.bookingRepository.findById(bookingId);
    return booking ? CarBookingResponseSchema.parse(booking) : null;
  }
}
