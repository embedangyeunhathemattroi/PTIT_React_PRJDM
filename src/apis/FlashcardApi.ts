// // src/apis/FlashcardAPI.ts
// import axios from "axios";

// import type { Category } from "../types/category";
// import type { Vocab } from "../types/vocab";


// const VOCABS_URL = "http://localhost:8080/vocabs";
// const CATEGORIES_URL = "http://localhost:8080/categories";

// // Lấy vocabs và categories
// export const fetchVocabsApi = async (): Promise<{ vocabs: Vocab[], categories: Category[] }> => {
//   const [vocabsRes, categoriesRes] = await Promise.all([
//     axios.get<Vocab[]>(VOCABS_URL),
//     axios.get<Category[]>(CATEGORIES_URL),
//   ]);
//   return {
//     vocabs: vocabsRes.data,
//     categories: categoriesRes.data,
//   };
// };

// // Cập nhật trạng thái học
// export const markVocabAsLearnedApi = async (vocab: Vocab): Promise<Vocab> => {
//   const res = await axios.patch<Vocab>(`${VOCABS_URL}/${vocab.id}`, { ...vocab, isLearned: true });
//   return res.data;
// };


// src/apis/FlashcardAPI.ts
import axiosClient from "./axiosClient";
import type { Category } from "../types/category";
import type { Vocab } from "../types/vocab";

/**
 * Lấy tất cả vocabs và categories
 * - Dùng Promise.all để gọi 2 API cùng lúc cho nhanh
 */
export const fetchVocabsAndCategoriesApi = async (): Promise<{ vocabs: Vocab[], categories: Category[] }> => {
  const [vocabsRes, categoriesRes] = await Promise.all([
    axiosClient.get<Vocab[]>("/vocabs"),
    axiosClient.get<Category[]>("/categories"),
  ]);

  return {
    vocabs: vocabsRes.data,
    categories: categoriesRes.data,
  };
};

/**
 * Đánh dấu vocab đã học
 * - Gửi request cập nhật isLearned = true
 */
export const markVocabAsLearnedApi = async (vocab: Vocab): Promise<Vocab> => {
  const res = await axiosClient.patch<Vocab>(`/vocabs/${vocab.id}`, { ...vocab, isLearned: true });
  return res.data;
};
