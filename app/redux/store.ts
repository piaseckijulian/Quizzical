'use client';

import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './Features/category/categorySlice';
import quizReducer from './Features/quiz/quizSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    quiz: quizReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
