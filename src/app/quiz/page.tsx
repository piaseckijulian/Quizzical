import { Blob } from "@/components/blob"
import { getQuiz } from "@/lib/queries"
import { redirect } from "next/navigation"
import { Question } from "./question"
import { QuizInfo } from "./quiz-info"

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const QuizPage = async ({ searchParams }: Props) => {
  const category = (await searchParams).category

  if (!category || Number.isNaN(category) || Array.isArray(category)) {
    redirect("/")
  }

  const categoryAsNumber = Number.parseInt(category)

  const { quiz, error } = await getQuiz(categoryAsNumber)

  if (error || !quiz) {
    redirect("/")
  }

  const allCorrectAnswers = quiz.map((data) => data.correct_answer)

  return (
    <div className="quiz__wrapper">
      <main className="quiz">
        <Blob side="left" isQuiz />
        <Blob side="right" isQuiz />

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
