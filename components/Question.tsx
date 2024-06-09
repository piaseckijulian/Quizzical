import Answer from './Answer';

interface Props {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}

const Question = ({ id, question, answers, correctAnswer }: Props) => {
  return (
    <>
      <h2 className="quiz__question">{question}</h2>

      <div className="quiz__answers">
        {answers.map((answer, index) => (
          <Answer
            key={index}
            questionId={id}
            answer={answer}
            correctAnswer={correctAnswer}
          />
        ))}
      </div>

      <hr className="quiz__separator" />
    </>
  );
};

export default Question;
