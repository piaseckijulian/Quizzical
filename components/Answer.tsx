'use client';

import { ChangeEvent, useId } from 'react';

import { answerProps } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/redux/store';
import { answerSelected } from '../app/redux/Features/quiz/quizSlice';

const Answer = ({ answer, name, questionId }: answerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const id = useId();
  const { showResults, formData } = useSelector(
    (store: RootState) => store.quiz
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(answerSelected({ selected: e.target.value, questionId }));
  };

  const isCorrectAnswer = answer === formData[questionId].correctAnswer;

  let answerClass = '';
  if (showResults) {
    if (isCorrectAnswer) {
      answerClass = 'correct';
    } else if (!isCorrectAnswer && formData[questionId].userAnswer === answer) {
      answerClass = 'incorrect';
    } else {
      answerClass = 'other';
    }
  }

  return (
    <>
      <input
        type="radio"
        name={name}
        id={id}
        value={answer}
        onChange={e => handleChange(e)}
        checked={formData[questionId].userAnswer === answer}
        disabled={showResults}
      />

      <label htmlFor={id} className={answerClass}>
        {answer}
      </label>
    </>
  );
};

export default Answer;
