import { UserRepository } from "@icat/repositories";
import { CreateUserBodyDto, UserResponseSchema } from "@icat/contracts";
import { AuthService } from "../auth";

export class UserService {
  userRepository: UserRepository;
  authService: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
  }

  async createUser(userData: CreateUserBodyDto) {
    const { password, ...restUser } = userData;

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
