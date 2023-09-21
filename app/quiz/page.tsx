'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizData } from '@/redux/Features/quiz/quizSlice';
import { RootState, AppDispatch } from '@/redux/store';
import Spinner from '@/components/Spinner';
import Question from '@/components/Question';
import Button from '@/components/Button';

const Quiz = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, quiz, showResults, score } = useSelector(
    (store: RootState) => store.quiz
  );
  const { selectedCategory } = useSelector((store: RootState) => store.category);

  if (selectedCategory === -1) {
    redirect('/');
  }

  useEffect(() => {
    dispatch(fetchQuizData(selectedCategory));
  }, []);

  const QuestionsEl = quiz.map((_, index: number) => (
    <Question key={index} questionId={index} />
  ));

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
          <Spinner />
        ) : (
          <>
            {QuestionsEl}

            <div className="quiz__controls">
              {showResults && (
                <p className="quiz__score">You scored {score}/5 correct answers</p>
              )}

              <Button type="check" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
