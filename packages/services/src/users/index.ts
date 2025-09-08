import { UserRepository } from "@icat/repositories";

export class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: any) {
    return await this.userRepository.create(userData);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
