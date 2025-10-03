// import axios from "axios";
// import type { Vocab } from "../types/vocab";


// const API_URL = "http://localhost:8080/vocabs";

// export const fetchVocabsApi = async (): Promise<Vocab[]> => {
//   const res = await axios.get<Vocab[]>(API_URL);
//   return res.data;
// };

// export const addVocabApi = async (vocabData: Omit<Vocab, "id">): Promise<Vocab> => {
//   const res = await axios.post<Vocab>(API_URL, vocabData);
//   return res.data;
// };

// export const updateVocabApi = async (vocabData: Vocab): Promise<Vocab> => {
//   const res = await axios.put<Vocab>(`${API_URL}/${vocabData.id}`, vocabData);
//   return res.data;
// };

// export const deleteVocabApi = async (id: number): Promise<number> => {
//   await axios.delete(`${API_URL}/${id}`);
//   return id;
// };


// src/apis/VocabAPI.ts
import axiosClient from "./axiosClient";
import type { Vocab } from "../types/vocab";

const API_URL = "/vocabs"; // URL tương đối, nối với baseURL của axiosClient

/**
 * Lấy tất cả từ vựng
 */
export const fetchVocabsApi = async (): Promise<Vocab[]> => {
  const res = await axiosClient.get<Vocab[]>(API_URL);
  return res.data;
};

/**
 * Thêm từ vựng mới
 */
export const addVocabApi = async (vocabData: Omit<Vocab, "id">): Promise<Vocab> => {
  const res = await axiosClient.post<Vocab>(API_URL, vocabData);
  return res.data;
};

/**
 * Cập nhật từ vựng
 */
export const updateVocabApi = async (vocabData: Vocab): Promise<Vocab> => {
  const res = await axiosClient.put<Vocab>(`${API_URL}/${vocabData.id}`, vocabData);
  return res.data;
};

/**
 * Xóa từ vựng
 */
export const deleteVocabApi = async (id: number): Promise<number> => {
  await axiosClient.delete(`${API_URL}/${id}`);
  return id;
};
