import { register } from "@/auth/controllers/register.controller";

export async function POST(request: Request) {
  return register(request);
}
