"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "@/auth/lib/authService";
import { User } from "../model/user.interface";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await AuthService.login(email, password);
    setUser(loggedInUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (name: string, email: string, password: string) => {
    const registeredUser = await AuthService.register(name, email, password);
    setUser(registeredUser);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
