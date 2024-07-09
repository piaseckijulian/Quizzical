import Blob from "@/components/Blob"
import Question from "@/components/Question"
import QuizInfo from "@/components/QuizInfo"
import { getQuiz } from "@/lib/queries"
import { redirect } from "next/navigation"

type Props = {
  searchParams: {
    category: string
  }
}

const QuizPage = async ({ searchParams }: Props) => {
  const category = Number.parseInt(searchParams.category)
  if (Number.isNaN(category)) {
    redirect("/")
  }

  const { quiz, error } = await getQuiz(category)

  if (error || !quiz) {
    redirect("/")
  }

  const allCorrectAnswers = quiz.map((data) => data.correct_answer)

  return (
    <div className="quiz__wrapper">
      <main className="quiz">
        <Blob side="left" quiz />
        <Blob side="right" quiz />

        {quiz.map((data, index) => (
          <Question
            key={data.question}
            id={index}
            question={data.question}
            answers={data.all_answers}
            correctAnswer={data.correct_answer}
          />
        ))}

        <QuizInfo allCorrectAnswers={allCorrectAnswers} />
      </main>
    </div>
  )
}

export default QuizPage
