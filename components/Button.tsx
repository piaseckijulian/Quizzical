'use client';

import { useCategoryStore } from '@/store/categoryStore';
import { useQuizStore } from '@/store/quizStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  type: 'start' | 'check';
}

const Button = ({ type }: Props) => {
  const router = useRouter();

  const {
    quizData,
    showResults,
    isCheckAnswersBtnDisabled,
    resetQuiz,
    enableCheckAnswersBtn,
    checkAnswers
  } = useQuizStore(state => ({
    quizData: state.quizData,
    showResults: state.showResults,
    isCheckAnswersBtnDisabled: state.isCheckAnswersBtnDisabled,
    resetQuiz: state.resetQuiz,
    enableCheckAnswersBtn: state.enableCheckAnswersBtn,
    checkAnswers: state.checkAnswers
  }));

  const { selectedCategory, setSelectedCategory } = useCategoryStore(state => ({
    selectedCategory: state.selectedCategory,
    setSelectedCategory: state.setSelectedCategory
  }));

  useEffect(() => {
    if (Object.keys(quizData).length === 0) return;

    quizData.every(({ userAnswer }) => userAnswer !== '') &&
      enableCheckAnswersBtn();
  }, [quizData, enableCheckAnswersBtn]);

  const handleCategory = () => {
    if (selectedCategory === null) setSelectedCategory(0);
  };

  const handleNewGame = () => {
    resetQuiz();
    router.push('/');
  };

  const handleCheckAnswers = () => {
    checkAnswers();
  };

  switch (type) {
    case 'start':
      return (
        <Link href="/quiz" className="btn" onClick={handleCategory}>
          Start quiz
        </Link>
      );
    case 'check':
      return (
        <button
          className="btn"
          disabled={isCheckAnswersBtnDisabled}
          onClick={showResults ? handleNewGame : handleCheckAnswers}
        >
          {showResults ? 'Play again' : 'Check answers'}
        </button>
      );
    default:
      break;
  }
};

export default Button;
