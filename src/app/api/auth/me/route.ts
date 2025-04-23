import { me } from "@/auth/controllers/me.controller";

export async function GET(request: Request) {
  return me(request);
}
