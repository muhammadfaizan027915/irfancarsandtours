import {
  ChangePasswordBodyDto,
  CreateGuestUserBodyDto,
  CreateUserBodyDto,
  DetailedUserResponseDto,
  DetailedUserResponseSchema,
  GetUsersBodyDto,
  PaginatedUserResponseDto,
  PaginatedUserResponseSchema,
  SignInBodyDto,
  UpdateUserBodyDto,
  UserResponseDto,
  UserResponseSchema,
  UserResponseWithPasswordSchema,
} from "@icat/contracts";
import { db, DbOrTransaction } from "@icat/database";
import {
  DuplicateEmailError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  sendWelcomeEmail,
} from "@icat/lib";
import { UserRepository } from "@icat/repositories";
import { comparePassword, hashPassword } from "../auth/password.utils";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll(
    arg?: GetUsersBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<PaginatedUserResponseDto> {
    const result = await this.userRepository.findAll(arg, tx);
    return PaginatedUserResponseSchema.parse(result);
  }

  async findById(
    id: string,
    tx: DbOrTransaction = db,
  ): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id, tx);
    return user ? UserResponseSchema.parse(user) : null;
  }

  async getUserByEmail(
    email: string,
    tx: DbOrTransaction = db,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findByEmail(email, tx);

    if (!user) {
      throw new NotFoundError("User");
    }

    return UserResponseSchema.parse(user);
  }

  async getUserByEmailWithPassword(email: string, tx: DbOrTransaction = db) {
    const user = await this.userRepository.findByEmail(email, tx);

    if (!user) {
      throw new NotFoundError("User");
    }

    return UserResponseWithPasswordSchema.parse(user);
  }

  async createUser(
    data: CreateUserBodyDto | CreateGuestUserBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(data.email, tx);

    if (existingUser) {
      throw new DuplicateEmailError(data?.email);
    }

    const passwordHash =
      "password" in data && data.password
        ? await hashPassword(data.password)
        : null;

    const createdUser = await this.userRepository.create(
      {
        ...data,
        password: passwordHash,
      },
      tx,
    );

    const parsedUser = UserResponseSchema.parse(createdUser);

    // Fire and forget welcome email
    sendWelcomeEmail({
      email: parsedUser.email,
      name: parsedUser.name,
    }).catch((err) => console.error("Failed to send welcome email:", err));

    return parsedUser;
  }

  async validateUserCredentials(
    credentials: SignInBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<UserResponseDto> {
    const { email, password } = credentials || {};
    const user = await this.getUserByEmailWithPassword(email, tx);

    if (!user.password) {
      throw new ForbiddenError({
        message:
          "This account was created as a guest. Please reset your password to log in.",
      });
    }

    const isValid = await comparePassword(
      password,
      user.password,
    );

    if (!isValid) {
      throw new ValidationError({ message: "Invalid email or password" });
    }

    return UserResponseSchema.parse(user);
  }

  async getDetailedUserByEmail(
    email: string,
    tx: DbOrTransaction = db,
  ): Promise<DetailedUserResponseDto> {
    const user = await this.userRepository.findByEmail(email, tx);

    if (!user) {
      throw new NotFoundError("User");
    }

    return DetailedUserResponseSchema.parse(user);
  }

  async updateUser(
    id: string,
    updates: Partial<UpdateUserBodyDto> & { password?: string | null },
    tx: DbOrTransaction = db,
  ): Promise<DetailedUserResponseDto | null> {
    const existingUser = await this.userRepository.findById(id, tx);

    if (!existingUser) {
      throw new NotFoundError("User");
    }

    const updatedUser = await this.userRepository.update(id, updates, tx);

    return updatedUser ? DetailedUserResponseSchema.parse(updatedUser) : null;
  }

  async changePassword(
    id: string,
    data: ChangePasswordBodyDto,
    tx: DbOrTransaction = db,
  ): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id, tx);

    if (!user) {
      throw new NotFoundError("User");
    }

    const userWithPassword = UserResponseWithPasswordSchema.parse(user);

    const isValid = await comparePassword(
      data?.currentPassword,
      userWithPassword?.password ?? "",
    );

    if (!isValid) {
      throw new ValidationError({ message: "Current password is incorrect" });
    }

    const hashedPassword = await hashPassword(data?.password);

    const updatedUser = await this.userRepository.update(
      id,
      {
        password: hashedPassword,
      },
      tx,
    );

    return updatedUser ? UserResponseSchema.parse(updatedUser) : null;
  }
}
