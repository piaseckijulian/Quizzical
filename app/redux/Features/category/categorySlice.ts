'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesState } from '../../../../types';
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

const initialState = {
  categories: [
    {
      id: 0,
      name: 'Any Category'
    }
  ],
  selectedCategory: 0
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
      state.categories.push(...action.payload.trivia_categories);
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      console.error(action.payload);
    });
  }
});

export const { selectCategory } = categorySlice.actions;

export default categorySlice.reducer;
