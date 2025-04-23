import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || // URL personalizada, se configurada
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000");

const instance = axios.create({
  baseURL, // Base URL da API
});

export default instance;
