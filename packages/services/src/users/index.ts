import { UserRepository } from "@icat/repositories";
import {
  CreateUserBodyDto,
  UserResponseSchema,
  UserResponseDto,
  UserResponseWithPasswordSchema,
  SignInBodyDto,
} from "@icat/contracts";
import { DuplicateEmailError, NotFoundError, ValidationError } from "@icat/lib";
import { AuthService } from "../auth";

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly authService: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  async createUser(data: CreateUserBodyDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new DuplicateEmailError(data?.email);
    }

    const passwordHash = await this.authService.hashPassword(data.password);

    const createdUser = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    return UserResponseSchema.parse(createdUser);
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User");
    }

    return UserResponseSchema.parse(user);
  }

  async getUserByEmailWithPassword(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User");
    }

    return UserResponseWithPasswordSchema.parse(user);
  }

  async validateUser(credentials: SignInBodyDto): Promise<UserResponseDto> {
    const { email, password } = credentials || {};
    const user = await this.getUserByEmailWithPassword(email);

    const isValid = await this.authService.comparePassword(
      password,
      user.password
    );

    if (!isValid) {
      throw new ValidationError({ message: "Invalid email or password" });
    }

    return UserResponseSchema.parse(user);
  }
}
