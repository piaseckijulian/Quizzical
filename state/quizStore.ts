import { shuffle } from '@/utils';
import axios from 'axios';
import { decode } from 'he';
import { create } from 'zustand';

interface QuizStore {
  isLoading: boolean;
  quizData: {
    id: number;
    question: string;
    correctAnswer: string;
    userAnswer: string;
    allAnswers: string[];
  }[];
  showResults: boolean;
  isCheckAnswersBtnDisabled: boolean;
  score: number;
  fetchQuiz: (category: number) => void;
  answerSelect: (id: number, userAnswer: string) => void;
  checkAnswers: () => void;
  enableCheckAnswersBtn: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set, _, state) => ({
  isLoading: true,
  quizData: [],
  score: 0,
  showResults: false,
  isCheckAnswersBtnDisabled: true,
  fetchQuiz: async category => {
    const url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}`;

    interface DataSchema {
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    }

    set({ isLoading: true });

    try {
      const res = await axios(url);
      const data: DataSchema[] = res.data.results;

      set({
        quizData: data.map(({ question, correct_answer, incorrect_answers }, index) => ({
          id: index,
          question,
          allAnswers: shuffle([correct_answer, ...incorrect_answers]),
          correctAnswer: decode(correct_answer),
          userAnswer: ''
        }))
      });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  answerSelect: (id, userAnswer) => {
    set(state => ({
      quizData: state.quizData.map(data =>
        id === data.id ? { ...data, userAnswer } : data
      )
    }));
  },
  checkAnswers: () => {
    set({ showResults: true });

    state.getState().quizData.forEach(data => {
      if (data.userAnswer === data.correctAnswer)
        set(state => ({ score: state.score + 1 }));
    });
  },
  enableCheckAnswersBtn: () => {
    set({ isCheckAnswersBtnDisabled: false });
  },
  resetQuiz: () => {
    set({
      isLoading: true,
      quizData: [],
      showResults: false,
      isCheckAnswersBtnDisabled: true,
      score: 0
    });
  }
}));
