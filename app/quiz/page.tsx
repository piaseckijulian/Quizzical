'use client';

import { Blob, Button, Question, Spinner } from '@/components';
import { fetchQuizData } from '@/redux/features/quiz/quizSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
        <Blob direction="left" isQuiz={true} />
        <Blob direction="right" />

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
