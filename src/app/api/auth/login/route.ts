import { login } from "@/auth/controllers/login.controller";

export async function POST(request: Request) {
  return login(request);
}
