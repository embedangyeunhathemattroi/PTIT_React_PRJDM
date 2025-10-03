// src/apis/AuthAPI.ts
import axiosClient from "./axiosClient";
import type { User } from "../types/utils";

const API_URL = "/users"; // URL tương đối, sẽ tự nối với baseURL của axiosClient

/**
 * Lấy tất cả user từ server
 */
export const fetchUsers = async (): Promise<User[]> => {
  const res = await axiosClient.get<User[]>(API_URL);
  return res.data;
};

/**
 * Đăng ký user mới
 * - Kiểm tra email đã tồn tại chưa
 * - Nếu chưa tồn tại thì tạo user mới
 */
export const registerApi = async (userData: Omit<User, "id" | "role">): Promise<User> => {
  // Lấy danh sách user hiện tại
  const users = await fetchUsers();

  // Kiểm tra email trùng
  if (users.some(u => u.email === userData.email)) {
    throw new Error("Email đã tồn tại");
  }

  // Tạo user mới với role mặc định là "user"
  const newUser = { ...userData, role: "user" };

  // Gọi API tạo user mới
  const res = await axiosClient.post<User>(API_URL, newUser);
  return res.data;
};

/**
 * Đăng nhập
 * - Kiểm tra email và password có đúng không
 * - Nếu đúng thì trả về thông tin user
 */
export const loginApi = async (email: string, password: string): Promise<User> => {
  const users = await fetchUsers();
  const found = users.find(u => u.email === email && u.password === password);
  if (!found) throw new Error("Sai email hoặc mật khẩu");
  return found;
};
