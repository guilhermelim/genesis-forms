import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/auth/lib/jwt";
import { User } from "@/auth/model/User";

// Define a estrutura esperada do token decodificado
interface DecodedToken {
  id: string;
  role?: string; // Role do usuário (opcional)
}

// Extende o tipo NextApiRequest para incluir a propriedade `user`
interface AuthenticatedRequest extends NextApiRequest {
  user?: DecodedToken;
}

// Define as opções para o guard
interface ServerAuthGuardOptions {
  requireRole?: string; // Role necessária para acessar a rota (opcional)
}

// Middleware unificado para autenticação e verificação de roles
export default function serverAuthGuard(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>,
  options: ServerAuthGuardOptions = {}
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const authorizationHeader = req.headers.authorization;

      // Verifica se o cabeçalho de autorização está presente
      if (!authorizationHeader) {
        return res
          .status(401)
          .json({ message: "Token de autorização ausente" });
      }

      const token = authorizationHeader.split(" ")[1];

      // Verifica e decodifica o token JWT
      const decodedToken = verify(token, JWT_SECRET) as DecodedToken;

      // Verifica se uma role específica é necessária
      if (options.requireRole) {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (user.role !== options.requireRole) {
          return res
            .status(403)
            .json({ message: "Acesso negado. Role insuficiente." });
        }
      }

      // Adiciona o usuário decodificado ao objeto req
      req.user = decodedToken;

      // Chama o handler original
      await handler(req, res);
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token de autorização inválido" });
    }
  };
}
