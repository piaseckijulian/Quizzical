export interface childrenInterface {
  children: React.ReactNode;
}

export interface CategoriesState {
  categories: {
    id: number;
    name: string;
  }[];
  selectedCategory: number;
}

export interface QuizState {
  isLoading: boolean;
  quiz: quizInterface[];
  formData: {
    userAnswer: string;
    correctAnswer: string;
    id: number;
  }[];
  answers: string[][];
  showResults: boolean;
  isCheckAnswersBtnDisabled: boolean;
  score: number;
}

export interface quizInterface {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface questionProps {
  questionId: number;
}

export interface answerProps {
  answer: string;
  name: string;
  questionId: number;
}
