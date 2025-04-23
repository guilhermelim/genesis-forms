"use client";

import { useAuth } from "@/auth/context/JWTContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Menu() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-xl font-bold text-indigo-600 cursor-pointer">
                Form Genesis
              </h1>
            </Link>
          </div>
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Sair
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
