import axios from "@/node_modules/axios/index";
import { User } from "../interfaces/usernIterface";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = async (body: User): Promise<User> => {
  try {
    const url = `${BASE_URL}/auth/login`;
    const res = await axios.post(url, body);
    const { accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Користувач не зареєстрований";

    throw new Error(message);
  }
};

export const refreshToken = async (refreshToken: string) => {
  const url = `${BASE_URL}/auth/refresh`;

  const res = await axios.post(url, {
    refreshToken: refreshToken,
  });
  if (!res.data) {
    throw new Error("Не вдалося оновити токен");
  }
  const { accessToken } = res.data;

  localStorage.setItem("accessToken", accessToken);

  return res.data;
};

export const registration = async (body: User) => {
  try {
    const url = `${BASE_URL}/auth/registration`;
    const res = await axios.post(url, body);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Помилка в реєстрації";
    throw new Error(message);
  }
};
