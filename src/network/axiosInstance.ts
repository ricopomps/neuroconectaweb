import { AppRoutes } from "@/lib/routes";
import axios from "axios";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  TooManyRequestsError,
} from "./http-errors";

const axiosInstace = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 50000,
  withCredentials: true,
});

// Adicionar token automaticamente em todas as requisições
axiosInstace.interceptors.request.use((config) => {
  if (globalThis.window !== undefined) {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosInstace.interceptors.response.use(null, (error) => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.error;

    if (error.response?.status === 401) {
      if (globalThis.window !== undefined) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      }

      if (globalThis.window !== undefined) {
        globalThis.window.location.href = AppRoutes.LOGIN;
      }
    }

    switch (error.response?.status) {
      case 400:
        throw new BadRequestError(errorMessage);
      case 404:
        throw new NotFoundError(errorMessage);
      case 409:
        throw new ConflictError(errorMessage);
      case 429:
        throw new TooManyRequestsError(errorMessage);
    }
  }

  throw error;
});

export default axiosInstace;
