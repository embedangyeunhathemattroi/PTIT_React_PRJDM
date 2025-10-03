// src/stores/slices/categoriesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { addCategoryApi, deleteCategoryApi, fetchCategoriesApi, updateCategoryApi } from "../../apis/categoryApi";
import type { Category } from "../../types/category";


interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchCategories = createAsyncThunk("categories/fetch", async (_, { rejectWithValue }) => {
  try {
    return await fetchCategoriesApi();
  } catch (err: any) {
    return rejectWithValue(err.message || "Fetch failed");
  }
});

export const addCategory = createAsyncThunk("categories/add", async (category: { name: string; topic: string }, { rejectWithValue }) => {
  try {
    return await addCategoryApi(category);
  } catch (err: any) {
    return rejectWithValue(err.message || "Add failed");
  }
});

export const updateCategory = createAsyncThunk("categories/update", async (category: Category, { rejectWithValue }) => {
  try {
    return await updateCategoryApi(category);
  } catch (err: any) {
    return rejectWithValue(err.message || "Update failed");
  }
});

export const deleteCategory = createAsyncThunk("categories/delete", async (id: number, { rejectWithValue }) => {
  try {
    return await deleteCategoryApi(id);
  } catch (err: any) {
    return rejectWithValue(err.message || "Delete failed");
  }
});

// Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
      .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      .addCase(addCategory.fulfilled, (state, action) => { state.categories.push(action.payload); })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map(cat => cat.id === action.payload.id ? action.payload : cat);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
