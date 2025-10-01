import {
  BookingRepository,
  BookedCarRepository,
  CarRepository,
} from "@icat/repositories";
import { BookingInsert, BookingSelect, BookedCarSelect } from "@icat/database";
import { CarBookingRequestDto } from "@icat/contracts";
import { auth } from "@icat/lib";
import { UserService } from "../users";

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

  async createBooking({ cars, ...data }: CarBookingRequestDto): Promise<{
    booking: BookingSelect;
  }> {
    const session = await auth();
    const sessionUser = session?.user;

    const booking = await this.bookingRepository.create({
      userId: sessionUser?.id as string,
      ...data,
    });

    this.userService.updateUser(sessionUser?.id as string, data);

    const carIds = cars.map((car) => car?.carId);
    const carsWithDriverRules = await this.carRepository.findCarsDriverRules(
      carIds
    );

    for (const car of cars) {
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

    return { booking };
  }
}
