'use client';

import { Blob, Question, QuizControls, Spinner } from '@/components';
import { useCategoryStore } from '@/state/categoryStore';
import { useQuizStore } from '@/state/quizStore';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const QuizPage = () => {
  const { quizData, isLoading, fetchQuiz } = useQuizStore(state => ({
    quizData: state.quizData,
    isLoading: state.isLoading,
    fetchQuiz: state.fetchQuiz
  }));
  const selectedCategory = useCategoryStore(store => store.selectedCategory);

  if (selectedCategory === null) redirect('/');

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

            <QuizControls />
          </>
        )}
      </div>
    </main>
  );
};

export default QuizPage;
