export interface User {
  id: string; // ID do usuário
  name: string; // Nome do usuário
  email: string; // Email do usuário
  password: string; // Senha do usuário
  photo?: string; // Foto em formato Base64 (opcional)
  role: "user" | "admin"; // Papel do usuário, pode ser "user" ou "admin"
}
