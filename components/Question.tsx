import { QuizData } from '@/types';
import { decode } from 'he';
import { useId } from 'react';
import Answer from './Answer';

interface Props {
  id: number;
  data: QuizData;
}

const Question = ({ id, data }: Props) => {
  const name = useId();

  return (
    <>
      <h2 className="quiz__question">{decode(data.question)}</h2>

      <div className="quiz__answers">
        {data.all_answers.map((answer, index) => (
          <Answer key={index} name={name} id={id} answer={decode(answer)} />
        ))}
      </div>

      <hr className="quiz__separator" />
    </>
  );
};

export default Question;
