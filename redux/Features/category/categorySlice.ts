'use client';

import { CategoriesState } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://opentdb.com/api_category.php';

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

const anyCategory = {
  id: 0,
  name: 'Any Category'
};

const initialState = {
  categories: [anyCategory],
  selectedCategory: -1
} as CategoriesState;

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = [anyCategory, ...action.payload.trivia_categories];
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      console.error(action.payload);
    });
  }
});

export const { selectCategory } = categorySlice.actions;

export default categorySlice.reducer;
