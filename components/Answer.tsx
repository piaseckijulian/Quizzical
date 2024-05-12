'use client';

import { useQuizStore } from '@/store/quizStore';

interface Props {
  answer: string;
  name: string;
  id: number;
}

const Answer = ({ answer, name, id }: Props) => {
  const { quizData, answerSelect, isShowingAnswers } = useQuizStore();

  const correctAnswer = quizData[id].correct_answer;

  const handleChange = () => {
    answerSelect(id, answer);
  };

  const isCorrectAnswer = answer === correctAnswer;

  let answerClass = '';

  if (isShowingAnswers) {
    if (isCorrectAnswer) {
      answerClass = 'quiz__answers-label-correct';
    } else if (!isCorrectAnswer && answer === quizData[id].user_answer) {
      answerClass = 'quiz__answers-label-incorrect';
    } else {
      answerClass = 'quiz__answers-label-other';
    }
  }

  return (
    <label className={`${answerClass} quiz__answers-label`}>
      <input
        type="radio"
        name={name}
        value={answer}
        className="quiz__answers-radio"
        onChange={handleChange}
        checked={quizData[id].user_answer === answer}
        disabled={isShowingAnswers}
      />
      {answer}
    </label>
  );
};

export default Answer;
