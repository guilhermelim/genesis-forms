"use client";

import { useAuth } from "@/auth/context/JWTContext";

export default function AdminSection() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Bem-vindo, {user?.name}
      </h1>
      <p className="text-gray-700 mb-4">
        Você está na página de administração.
      </p>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Sair
      </button>
    </div>
  );
}
