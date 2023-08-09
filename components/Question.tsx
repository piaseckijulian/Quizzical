'use client';

import Answer from './Answer';

import { useId } from 'react';
import { decode } from 'he';

import { questionProps } from '../types';

import { useSelector } from 'react-redux';
import { RootState } from '../app/redux/store';

const Question = ({ questionId }: questionProps) => {
  const { answers, quiz } = useSelector((store: RootState) => store.quiz);
  const name = useId();

  const answersEl = answers[questionId].map((answer, index) => (
    <Answer
      key={index}
      answer={decode(answer)}
      name={name}
      questionId={questionId}
    />
  ));

  return (
    <div className="question">
      <h2 className="question--text">{decode(quiz[questionId].question)}</h2>
      <div className="answers">{answersEl}</div>
      <hr className="line" />
    </div>
  );
};

export default Question;
