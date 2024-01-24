'use client';

import { Blob, Button, Question, Spinner } from '@/components';
import { useCategoryStore } from '@/state/categoryStore';
import { useQuizStore } from '@/state/quizStore';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const Quiz = () => {
  const { quizData, isLoading, score, fetchQuiz, showResults } = useQuizStore(state => ({
    quizData: state.quizData,
    isLoading: state.isLoading,
    score: state.score,
    fetchQuiz: state.fetchQuiz,
    showResults: state.showResults
  }));
  const selectedCategory = useCategoryStore(store => store.selectedCategory);

  if (selectedCategory === -1) redirect('/');

  useEffect(() => {
    fetchQuiz(selectedCategory);
  }, []);

  return (
    <main className="container">
      <div className="quiz">
        <Blob direction="left" isQuiz />
        <Blob direction="right" />

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {quizData.map(data => (
              <Question key={data.id} id={data.id} />
            ))}

            <div className="quiz__controls">
              {showResults && (
                <p className="quiz__score">You scored {score}/5 correct answers</p>
              )}

              <Button type="check" />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Quiz;
