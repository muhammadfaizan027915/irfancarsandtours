

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    const bcrypt = await import("bcryptjs");
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashed: string): Promise<boolean> {
    const bcrypt = await import("bcryptjs");
    return bcrypt.compare(password, hashed);
  }
}
