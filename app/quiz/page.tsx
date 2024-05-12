'use client';

import Blob from '@/components/Blob';
import Question from '@/components/Question';
import QuizInfo from '@/components/QuizInfo';
import { useQuizStore } from '@/store/quizStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  searchParams: {
    category: string;
  };
}

const QuizPage = ({ searchParams }: Props) => {
  const router = useRouter();

  const category = parseInt(searchParams.category);
  if (isNaN(category)) router.push('/');

  const { quizData, getQuiz } = useQuizStore();

  useEffect(() => {
    getQuiz(category);
  }, [category, getQuiz]);

  return (
    <main className="container">
      <div className="quiz">
        <Blob side="left" quiz />
        <Blob side="right" />

        {quizData.map((data, index) => (
          <Question key={index} id={index} data={data} />
        ))}

        <QuizInfo />
      </div>
    </main>
  );
};

export default QuizPage;
