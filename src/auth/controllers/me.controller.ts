import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/auth/lib/jwt";

export async function me(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    return NextResponse.json({ user: decoded });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Token inválido ou expirado" },
      { status: 401 }
    );
  }
}
