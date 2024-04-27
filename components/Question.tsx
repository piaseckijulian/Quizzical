import { useQuizStore } from '@/store/quizStore';
import { decode } from 'he';
import { useId } from 'react';
import Answer from './Answer';

interface Props {
  id: number;
}

const Question = ({ id }: Props) => {
  const quizData = useQuizStore(state => state.quizData);
  const name = useId();

  return (
    <>
      <h2 className="quiz__question">{decode(quizData[id].question)}</h2>
      <div className="quiz__answers">
        {quizData[id].allAnswers.map((answer, index) => (
          <Answer key={index} answer={decode(answer)} name={name} id={id} />
        ))}
      </div>
      <hr className="quiz__line" />
    </>
  );
};

export default Question;
