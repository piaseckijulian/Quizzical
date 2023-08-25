import Answer from './Answer';

import { useId } from 'react';
import { decode } from 'he';

import { questionProps } from '@/types';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

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
    <>
      <h2 className="quiz__question">{decode(quiz[questionId].question)}</h2>
      <div className="quiz__answers">{answersEl}</div>
      <hr className="quiz__line" />
    </>
  );
};

export default Question;
