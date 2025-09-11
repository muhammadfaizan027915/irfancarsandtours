import { UserRepository } from "@icat/repositories";
import { CreateUserBodyDto, UserResponseSchema } from "@icat/contracts";
import { DuplicateEmailError } from "@icat/lib";
import { AuthService } from "../auth";

export class UserService {
  userRepository: UserRepository;
  authService: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  async createUser(data: CreateUserBodyDto) {
    const dbUser = await this.userRepository.findByEmail(data?.email);

    if (dbUser) {
      throw new DuplicateEmailError(data?.email);
    }

    const { password, ...restUser } = data;

    const passwodHash = await this.authService.hashPassword(password);

    const createdUser = await this.userRepository.create({
      ...restUser,
      password: passwodHash,
    });

    return UserResponseSchema.parse(createdUser);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
