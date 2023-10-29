import type { QuizState, quizInterface } from '@/types';
import { shuffle } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuizData = createAsyncThunk(
  'quiz/fetchQuizData',
  async (category: number, thunkAPI) => {
    const url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}`;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

const initialState = {
  isLoading: true,
  quiz: [],
  formData: [],
  answers: [],
  showResults: false,
  isCheckAnswersBtnDisabled: true,
  score: 0
} as QuizState;

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    enableCheckAnswersBtn: state => {
      state.isCheckAnswersBtnDisabled = false;
    },
    checkAnswers: state => {
      state.showResults = true;

      state.formData.map(data => {
        if (data.userAnswer === data.correctAnswer) {
          state.score++;
        }
      });
    },
    answerSelected: (state, action) => {
      state.formData = state.formData.map(data =>
        action.payload.questionId === data.id
          ? {
              ...data,
              userAnswer: action.payload.selected
            }
          : data
      );
    },
    resetQuiz: state => {
      state.isLoading = true;
      state.quiz = [];
      state.formData = [];
      state.answers = [];
      state.showResults = false;
      state.isCheckAnswersBtnDisabled = true;
      state.score = 0;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchQuizData.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchQuizData.fulfilled, (state, action) => {
      const results: quizInterface[] = action.payload.results;

      state.quiz = results;

      state.formData = results.map((result, index: number) => ({
        id: index,
        correctAnswer: result.correct_answer,
        userAnswer: ''
      }));

      state.answers = results.map(result =>
        shuffle([
          result.correct_answer,
          result.incorrect_answers[0],
          result.incorrect_answers[1],
          result.incorrect_answers[2]
        ])
      );

      state.isLoading = false;
    });
    builder.addCase(fetchQuizData.rejected, (state, action) => {
      state.isLoading = false;
      console.error(action.payload);
    });
  }
});

export const { enableCheckAnswersBtn, checkAnswers, answerSelected, resetQuiz } =
  quizSlice.actions;

export default quizSlice.reducer;
