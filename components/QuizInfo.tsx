'use client';

import { useQuizStore } from '@/store/quizStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const QuizInfo = () => {
  const { quizData, isShowingAnswers, resetQuiz, showAnswers } = useQuizStore();

  const [isCheckAnswersBtnDisabled, setIsCheckAnswersBtnDisabled] =
    useState(true);
  const [score, setScore] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (quizData.length === 0) return;

    if (quizData.every(data => data.user_answer)) {
      setIsCheckAnswersBtnDisabled(false);
    }
  }, [quizData]);

  useEffect(() => {
    if (quizData.length === 0 || !isShowingAnswers) return;

    quizData.forEach(data => {
      if (data.correct_answer === data.user_answer) {
        setScore(prev => prev + 1);
      }
    });
  }, [quizData, isShowingAnswers]);

  const handleNewGame = () => {
    resetQuiz();
    setScore(0);
    setIsCheckAnswersBtnDisabled(true);
    router.push('/');
  };

  const handleShowAnswers = () => {
    showAnswers();
  };

  return (
    <div className="quiz__info">
      {isShowingAnswers && (
        <p className="quiz__score">You scored {score}/5 correct answers</p>
      )}

      <button
        className="btn"
        disabled={isCheckAnswersBtnDisabled}
        onClick={isShowingAnswers ? handleNewGame : handleShowAnswers}
      >
        {isShowingAnswers ? 'Play again' : 'Check answers'}
      </button>
    </div>
  );
};

export default QuizInfo;
