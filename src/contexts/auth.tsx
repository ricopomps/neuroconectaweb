"use client";
import { User } from "@/models/user";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (globalThis.window === undefined) return null;
    return localStorage.getItem("authToken");
  });

  const [user, setUser] = useState<User | null>(() => {
    if (globalThis.window === undefined) return null;

    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("authUser");
      return null;
    }
  });

  const [isLoading] = useState(false);

  const setAuth = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);

    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authUser", JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }, []);

  const value = useMemo(
    () => ({ token, user, setAuth, logout, isLoading }),
    [token, user, setAuth, logout, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
