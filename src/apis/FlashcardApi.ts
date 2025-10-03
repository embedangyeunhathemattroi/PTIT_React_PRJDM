// src/apis/FlashcardAPI.ts
import axios from "axios";
import type { Vocab } from "../stores/slices/vocabSLice";
import type { Category } from "../types/category";


const VOCABS_URL = "http://localhost:8080/vocabs";
const CATEGORIES_URL = "http://localhost:8080/categories";

// Lấy vocabs và categories
export const fetchVocabsApi = async (): Promise<{ vocabs: Vocab[], categories: Category[] }> => {
  const [vocabsRes, categoriesRes] = await Promise.all([
    axios.get<Vocab[]>(VOCABS_URL),
    axios.get<Category[]>(CATEGORIES_URL),
  ]);
  return {
    vocabs: vocabsRes.data,
    categories: categoriesRes.data,
  };
};

// Cập nhật trạng thái học
export const markVocabAsLearnedApi = async (vocab: Vocab): Promise<Vocab> => {
  const res = await axios.patch<Vocab>(`${VOCABS_URL}/${vocab.id}`, { ...vocab, isLearned: true });
  return res.data;
};
