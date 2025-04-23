import { jwtDecode } from "jwt-decode";

export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export const JWT_EXPIRATION = "1h"; // Tempo de expiração do token

export const isValidToken = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }
  const decoded: { exp: number } = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    localStorage.removeItem("accessToken");
  }
};
