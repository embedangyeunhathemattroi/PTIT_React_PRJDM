// src/apis/AuthAPI.ts
import axios from "axios";
import type { User } from "../types/utils";


const API_URL = "http://localhost:8080/users";

// Lấy tất cả user
export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(API_URL);
  return res.data;
};

// Đăng ký user
export const registerApi = async (userData: Omit<User, "id" | "role">): Promise<User> => {
  const users = await fetchUsers();

  if (users.some(u => u.email === userData.email)) {
    throw new Error("Email already exists");
  }

  const newUser = { ...userData, role: "user" };
  const res = await axios.post<User>(API_URL, newUser);
  return res.data;
};

// Đăng nhập
export const loginApi = async (email: string, password: string): Promise<User> => {
  const users = await fetchUsers();
  const found = users.find(u => u.email === email && u.password === password);
  if (!found) throw new Error("Sai email hoặc mật khẩu");
  return found;
};
