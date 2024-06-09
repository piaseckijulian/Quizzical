'use client';

import { cn } from '@/lib/utils';
import { useQuizStore } from '@/store/quizStore';

interface Props {
  questionId: number;
  answer: string;
  correctAnswer: string;
}

const Answer = ({ questionId, answer, correctAnswer }: Props) => {
  const { userAnswers, answerSelect, isShowingAnswers } = useQuizStore();

  const handleChange = () => {
    answerSelect(questionId, answer);
  };

  let answerClass = '';

  if (isShowingAnswers) {
    const isCorrectAnswer = answer === correctAnswer;

    if (isCorrectAnswer) {
      answerClass = 'quiz__answers-label-correct';
    } else if (!isCorrectAnswer && answer === userAnswers[questionId]) {
      answerClass = 'quiz__answers-label-incorrect';
    } else {
      answerClass = 'quiz__answers-label-other';
    }
  }

  return (
    <label className={cn('quiz__answers-label', answerClass)}>
      <input
        type="radio"
        value={answer}
        name={questionId.toString()}
        onChange={handleChange}
        className="quiz__answers-radio"
        checked={answer === userAnswers[questionId]}
        disabled={isShowingAnswers}
      />
      {answer}
    </label>
  );
};

export default Answer;
