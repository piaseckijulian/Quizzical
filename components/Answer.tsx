'use client';

import { answerSelected } from '@/redux/features/quiz/quizSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import type { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface answerProps {
  answer: string;
  name: string;
  questionId: number;
}

const Answer = ({ answer, name, questionId }: answerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showResults, formData } = useSelector((store: RootState) => store.quiz);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(answerSelected({ selected: e.target.value, questionId }));
  };

  const isCorrectAnswer = answer === formData[questionId].correctAnswer;

  let answerClass = '';
  if (showResults) {
    if (isCorrectAnswer) {
      answerClass = 'quiz__answers-label-correct';
    } else if (!isCorrectAnswer && formData[questionId].userAnswer === answer) {
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
        onChange={e => handleChange(e)}
        checked={formData[questionId].userAnswer === answer}
        disabled={showResults}
      />
      {answer}
    </label>
  );
};

export default Answer;
