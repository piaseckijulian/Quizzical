import { create } from 'zustand';

interface QuizStore {
  userAnswers: string[];
  isShowingAnswers: boolean;
  answerSelect: (questionId: number, newAnswer: string) => void;
  showAnswers: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStore>(set => ({
  userAnswers: new Array(5).fill(null),
  isShowingAnswers: false,
  isCheckAnswersBtnDisabled: true,
  answerSelect: (questionId, newAnswer) => {
    set(state => ({
      userAnswers: state.userAnswers.map((answer, index) =>
        questionId === index ? newAnswer : answer
      )
    }));
  },
  showAnswers: () => {
    set({ isShowingAnswers: true });
  },
  resetQuiz: () => {
    set({
      userAnswers: new Array(5).fill(null),
      isShowingAnswers: false
    });
  }
}));
