'use client';

import Blob from '@/components/Blob';
import Question from '@/components/Question';
import QuizControls from '@/components/QuizControls';
import Spinner from '@/components/Spinner';
import { useCategoryStore } from '@/store/categoryStore';
import { useQuizStore } from '@/store/quizStore';
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
  }, [fetchQuiz, selectedCategory]);

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
