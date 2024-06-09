import Blob from '@/components/Blob';
import Question from '@/components/Question';
import QuizInfo from '@/components/QuizInfo';
import { getQuiz } from '@/lib/queries';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    category: string;
  };
}

const QuizPage = async ({ searchParams }: Props) => {
  const category = parseInt(searchParams.category);
  if (isNaN(category)) {
    redirect('/');
  }

  const quiz = await getQuiz(category);
  const allCorrectAnswers = quiz.map(data => data.correct_answer);

  return (
    <main className="container">
      <div className="quiz">
        <Blob side="left" quiz />
        <Blob side="right" />

        {quiz.map((data, index) => (
          <Question
            key={index}
            id={index}
            question={data.question}
            answers={data.all_answers}
            correctAnswer={data.correct_answer}
          />
        ))}

        <QuizInfo allCorrectAnswers={allCorrectAnswers} />
      </div>
    </main>
  );
};

export default QuizPage;
