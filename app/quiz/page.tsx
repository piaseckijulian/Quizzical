'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import {
  enableCheckAnswersBtn,
  fetchQuizData,
  checkAnswers,
  resetQuiz
} from '@/redux/Features/quiz/quizSlice';
import { RootState, AppDispatch } from '@/redux/store';
import Loading from '@/components/Loading';
import Question from '@/components/Question';

const Quiz = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    isLoading,
    quiz,
    formData,
    showResults,
    isCheckAnswersBtnDisabled,
    score
  } = useSelector((store: RootState) => store.quiz);
  const { selectedCategory } = useSelector(
    (store: RootState) => store.category
  );

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchQuizData(selectedCategory));
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length === 0) return;

    formData.every(({ userAnswer }) => userAnswer !== '') &&
      dispatch(enableCheckAnswersBtn());
  }, [formData]);

  const QuestionsEl = quiz.map((_, index: number) => (
    <Question key={index} questionId={index} />
  ));

  const handleCheckAnswers = () => {
    dispatch(checkAnswers());
  };

  const newGame = () => {
    router.push('/');
    dispatch(resetQuiz());
  };

  return (
    <div className="container">
      <div className="quiz">
        <div className="blob__left">
          <Image
            src="/assets/blob-left.svg"
            alt=""
            className="blob blob__quiz"
            width={130}
            height={130}
          />
        </div>
        <div className="blob__right">
          <Image
            src="/assets/blob-right.svg"
            alt=""
            className="blob"
            width={210}
            height={210}
          />
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            {QuestionsEl}

            <div className="quiz__controls">
              {showResults && (
                <p className="quiz__score">
                  You scored {score}/5 correct answers
                </p>
              )}

              <button
                className="btn"
                disabled={isCheckAnswersBtnDisabled}
                onClick={showResults ? newGame : handleCheckAnswers}
              >
                {showResults ? 'Play again' : 'Check answers'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
