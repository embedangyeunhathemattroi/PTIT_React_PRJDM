// import axios from "axios";
// import type { Result } from "../types/utils";

// const BASE_URL = "http://localhost:8080/results";

// // Lấy tất cả kết quả
// export const getResults = async (): Promise<Result[]> => {
//   const res = await axios.get<Result[]>(BASE_URL);
//   return res.data;
// };

// // Lưu kết quả mới
// export const postResult = async (newResult: Result): Promise<Result> => {
//   const res = await axios.post<Result>(BASE_URL, newResult);
//   return res.data;
// };


// src/apis/ResultAPI.ts
import axiosClient from "./axiosClient";
import type { Result } from "../types/utils";

const BASE_URL = "/results"; // URL tương đối nối với baseURL của axiosClient

/**
 * Lấy tất cả kết quả quiz
 */
export const getResults = async (): Promise<Result[]> => {
  const res = await axiosClient.get<Result[]>(BASE_URL);
  return res.data;
};

/**
 * Lưu kết quả quiz mới
 * @param newResult Thông tin kết quả quiz
 */
export const postResult = async (newResult: Result): Promise<Result> => {
  const res = await axiosClient.post<Result>(BASE_URL, newResult);
  return res.data;
};
