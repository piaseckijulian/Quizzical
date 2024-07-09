import Answer from "./Answer"

type Props = {
  id: number
  question: string
  answers: string[]
  correctAnswer: string
}

const Question = ({ id, question, answers, correctAnswer }: Props) => {
  return (
    <>
      <h2>{question}</h2>

      <div className="answers">
        {answers.map((answer) => (
          <Answer
            key={answer}
            questionId={id}
            answer={answer}
            correctAnswer={correctAnswer}
          />
        ))}
      </div>

      <hr />
    </>
  )
}

export default Question
