import React, { createContext, useContext, useState } from "react";
import type { AuthUser, Credentials } from "../types/Auth";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem("auth_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials: Credentials): Promise<void> => {
    if (
      credentials.email !== "admin@test.com" ||
      credentials.password !== "123456"
    )
      throw new Error("Invalid credentials!.");

    const authUser: AuthUser = {
      id: 1,
      name: "Admin",
      email: "admin@test.com",
      token: "1234567890",
    };

    localStorage.setItem("auth_user", JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
