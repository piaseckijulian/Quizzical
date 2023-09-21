'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { selectCategory } from '@/redux/Features/category/categorySlice';
import { checkAnswers, enableCheckAnswersBtn, resetQuiz } from '@/redux/Features/quiz/quizSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  type: 'start' | 'check';
}

const Button = ({ type }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCategory } = useSelector((store: RootState) => store.category);
  const { formData, showResults, isCheckAnswersBtnDisabled } = useSelector(
    (store: RootState) => store.quiz
  );

  const onSwitchToQuiz = () => {
    if (selectedCategory === -1) {
      dispatch(selectCategory(0));
    }
  };

  const handleCheckAnswers = () => {
    dispatch(checkAnswers());
  };

  const newGame = () => {
    router.push('/');
    dispatch(resetQuiz());
  };

  useEffect(() => {
    if (Object.keys(formData).length === 0) return;

    formData.every(({ userAnswer }) => userAnswer !== '') &&
      dispatch(enableCheckAnswersBtn());
  }, [formData]);

  if (type === 'start') {
    return (
      <Link href="/quiz" className="btn" onClick={onSwitchToQuiz}>
        Start quiz
      </Link>
    );
  } else if (type === 'check') {
    return (
      <button
        className="btn"
        disabled={isCheckAnswersBtnDisabled}
        onClick={showResults ? newGame : handleCheckAnswers}
      >
        {showResults ? 'Play again' : 'Check answers'}
      </button>
    );
  }
};

export default Button;
