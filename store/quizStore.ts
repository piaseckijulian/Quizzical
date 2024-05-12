import { shuffle } from '@/lib/utils';
import { QuizData } from '@/types';
import axios from 'axios';
import { decode } from 'he';
import { create } from 'zustand';

interface QuizStore {
  quizData: QuizData[];
  isShowingAnswers: boolean;
  getQuiz: (category: number) => void;
  answerSelect: (id: number, userAnswer: string) => void;
  showAnswers: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>(set => ({
  quizData: [],
  isShowingAnswers: false,
  isCheckAnswersBtnDisabled: true,
  getQuiz: async category => {
    const url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}`;

    try {
      interface QuizRes {
        response_code: number;
        results: {
          type: string;
          difficulty: string;
          category: string;
          question: string;
          correct_answer: string;
          incorrect_answers: string[];
        }[];
      }

      const { data } = await axios.get<QuizRes>(url);

      if (data.response_code !== 0) {
        throw new Error('Something went wrong');
      }

      const quiz = data.results.map(result => ({
        ...result,
        all_answers: shuffle([
          ...result.incorrect_answers,
          result.correct_answer
        ]),
        user_answer: null,
        correct_answer: decode(result.correct_answer)
      }));

      set({ quizData: quiz });
    } catch (error) {
      throw new Error(error as string);
    }
  },
  answerSelect: (id, newAnswer) => {
    set(state => ({
      quizData: state.quizData.map((data, index) => ({
        ...data,
        user_answer: id === index ? newAnswer : data.user_answer
      }))
    }));
  },
  showAnswers: () => {
    set({ isShowingAnswers: true });
  },
  resetQuiz: () => {
    set({
      quizData: [],
      isShowingAnswers: false
    });
  }
}));
