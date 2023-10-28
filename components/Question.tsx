import type { RootState } from '@/redux/store';
import { decode } from 'he';
import { useId } from 'react';
import { useSelector } from 'react-redux';
import Answer from './Answer';

export interface questionProps {
  questionId: number;
}

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
