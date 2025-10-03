import axios from "axios";
import type { Result } from "../types/utils";

const BASE_URL = "http://localhost:8080/results";

// Lấy tất cả kết quả
export const getResults = async (): Promise<Result[]> => {
  const res = await axios.get<Result[]>(BASE_URL);
  return res.data;
};

// Lưu kết quả mới
export const postResult = async (newResult: Result): Promise<Result> => {
  const res = await axios.post<Result>(BASE_URL, newResult);
  return res.data;
};
