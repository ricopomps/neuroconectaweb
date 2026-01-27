"use client";
import { Institution } from "@/models/institution";
import { User } from "@/models/user";
import { list as listInstitutions } from "@/network/api/institution";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  institutions: Institution[] | undefined;
  fetchInstitutions: () => Promise<void>;
  addInstitution: (institution: Institution) => void;
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

  const [institutions, setInstitutions] = useState<Institution[]>();
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useCallback(async (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);

    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authUser", JSON.stringify(newUser));

    // Fetch institutions after login
    try {
      setIsLoading(true);
      const fetchedInstitutions = await listInstitutions();
      setInstitutions(fetchedInstitutions);
    } catch (error) {
      console.error("Failed to fetch institutions:", error);
      setInstitutions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchInstitutions = useCallback(async () => {
    // Only fetch if not already loaded
    if (institutions !== undefined) return;

    try {
      setIsLoading(true);
      const fetchedInstitutions = await listInstitutions();
      setInstitutions(fetchedInstitutions);
    } catch (error) {
      console.error("Failed to fetch institutions:", error);
      setInstitutions([]);
    } finally {
      setIsLoading(false);
    }
  }, [institutions]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setInstitutions(undefined);

    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }, []);

  useEffect(() => {
    if (!user || institutions !== undefined) return;

    fetchInstitutions();
  }, [user, institutions, fetchInstitutions]);

  const addInstitution = useCallback((institution: Institution) => {
    setInstitutions((prev) => [...(prev || []), institution]);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      setAuth,
      logout,
      isLoading,
      institutions,
      fetchInstitutions,
      addInstitution,
    }),
    [
      token,
      user,
      setAuth,
      logout,
      isLoading,
      institutions,
      fetchInstitutions,
      addInstitution,
    ],
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
