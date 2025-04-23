"use client";

import { useAuth } from "@/auth/context/JWTContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ClientAuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string; // Role necessária para acessar a página (opcional)
}

export default function ClientAuthGuard({
  children,
  requiredRole,
}: ClientAuthGuardProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login"); // Redireciona para a página de login se não estiver autenticado
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      setAccessDenied(true); // Define que o acesso foi negado
    }
  }, [isAuthenticated, user, requiredRole, router]);

  if (!isAuthenticated) {
    return null; // Exibe nada enquanto verifica a autenticação
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Acesso Restrito
          </h1>
          <p className="text-gray-600 mb-4">
            Você não tem permissão para acessar este conteúdo.
          </p>
          <button
            onClick={() => {
              logout();
              router.push("/auth/login");
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sair da Conta
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
