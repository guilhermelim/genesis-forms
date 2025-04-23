import axios from "@/auth/lib/axios";
import { setSession } from "@/auth/lib/jwt";
import { User } from "../model/user.interface";

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    const response = await axios.post("/api/auth/login", { email, password });
    const { token, user } = response.data;

    setSession(token);
    return user;
  }

  static async register(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const response = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });
    const { token, user } = response.data;

    setSession(token);
    return user;
  }

  static logout(): void {
    setSession(null);
  }

  static async getCurrentUser(): Promise<User> {
    const response = await axios.get("/api/auth/me");
    return response.data.user;
  }
}
