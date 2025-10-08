import { UserRepository } from "@icat/repositories";
import {
  CreateUserBodyDto,
  UserResponseSchema,
  UserResponseDto,
  SignInBodyDto,
  DetailedUserResponseSchema,
  DetailedUserResponseDto,
  UserResponseWithPasswordSchema,
  UpdateUserBodyDto,
  ChangePasswordBodyDto,
  PaginatedUserResponseDto,
  PaginatedUserResponseSchema,
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

  async getAll(): Promise<PaginatedUserResponseDto> {
    const result = await this.userRepository.findAll();
    return PaginatedUserResponseSchema.parse(result);
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

  async validateUserCredentials(
    credentials: SignInBodyDto
  ): Promise<UserResponseDto> {
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

  async getDetailedUserByEmail(
    email: string
  ): Promise<DetailedUserResponseDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User");
    }

    return DetailedUserResponseSchema.parse(user);
  }

  async updateUser(
    id: string,
    updates: UpdateUserBodyDto
  ): Promise<DetailedUserResponseDto | null> {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundError("User");
    }

    const updatedUser = await this.userRepository.update(id, updates);

    return updatedUser ? DetailedUserResponseSchema.parse(updatedUser) : null;
  }

  async changePassword(
    id: string,
    data: ChangePasswordBodyDto
  ): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User");
    }

    const userWithPassword = UserResponseWithPasswordSchema.parse(user);

    const isValid = await this.authService.comparePassword(
      data?.currentPassword,
      userWithPassword.password
    );

    if (!isValid) {
      throw new ValidationError({ message: "Current password is incorrect" });
    }

    const hashedPassword = await this.authService.hashPassword(data?.password);

    const updatedUser = await this.userRepository.update(id, {
      password: hashedPassword,
    });

    return updatedUser ? UserResponseSchema.parse(updatedUser) : null;
  }
}
