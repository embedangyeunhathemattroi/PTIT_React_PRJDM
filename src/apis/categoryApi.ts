// src/apis/CategoriesAPI.ts
import axios from "axios";
import type { Category } from "../types/category";


const API_URL = "http://localhost:8080/categories";

// Lấy tất cả categories
export const fetchCategoriesApi = async (): Promise<Category[]> => {
  const res = await axios.get<Category[]>(API_URL);
  return res.data;
};

// Thêm category mới
export const addCategoryApi = async (category: { name: string; topic: string }): Promise<Category> => {
  const newCategory = { ...category, createdAt: new Date().toISOString() };
  const res = await axios.post<Category>(API_URL, newCategory);
  return res.data;
};

// Cập nhật category
export const updateCategoryApi = async (category: Category): Promise<Category> => {
  const res = await axios.patch<Category>(`${API_URL}/${category.id}`, category);
  return res.data;
};

// Xóa category
export const deleteCategoryApi = async (id: number): Promise<number> => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
