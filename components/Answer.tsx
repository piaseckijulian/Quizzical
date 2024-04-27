'use client';

import { useQuizStore } from '@/store/quizStore';

interface Props {
  answer: string;
  name: string;
  id: number;
}

const Answer = ({ answer, name, id }: Props) => {
  const { quizData, answerSelect, showResults } = useQuizStore(state => ({
    quizData: state.quizData,
    answerSelect: state.answerSelect,
    showResults: state.showResults
  }));

  const handleChange = () => {
    answerSelect(id, answer);
  };

  const isCorrectAnswer = answer === quizData[id].correctAnswer;

  let answerClass = '';
  if (showResults) {
    if (isCorrectAnswer) {
      answerClass = 'quiz__answers-label-correct';
    } else if (!isCorrectAnswer && answer === quizData[id].userAnswer) {
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
        checked={quizData[id].userAnswer === answer}
        disabled={showResults}
      />
      {answer}
    </label>
  );
};

export default Answer;
