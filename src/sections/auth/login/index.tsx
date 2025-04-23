"use client";

import { useAuth } from "@/auth/context/JWTContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginSection() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/admin");
    } catch {
      setError("Credenciais inválidas");
    }
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base text-gray-900 placeholder-gray-500"
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base text-gray-900 placeholder-gray-500"
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid} // Botão desabilitado se o formulário não estiver preenchido
          className={`w-full py-3 px-4 rounded-lg text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isFormValid
              ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Entrar
        </button>
        <p className="mt-6 text-sm text-gray-600 text-center">
          Não tem uma conta?{" "}
          <a href="/auth/register" className="text-indigo-600 hover:underline">
            Registre-se
          </a>
        </p>
      </form>
    </div>
  );
}
