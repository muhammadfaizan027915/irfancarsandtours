import { AuthService } from "@icat/services";

const authService = new AuthService();

export const { GET, POST } = authService.handlers;
