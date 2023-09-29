import { RootState } from '@/redux/store';
import { questionProps } from '@/types';
import { decode } from 'he';
import { useId } from 'react';
import { useSelector } from 'react-redux';
import Answer from './Answer';

const Question = ({ questionId }: questionProps) => {
  const { answers, quiz } = useSelector((store: RootState) => store.quiz);
  const name = useId();

  const answersEl = answers[questionId].map((answer, index) => (
    <Answer key={index} answer={decode(answer)} name={name} questionId={questionId} />
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
