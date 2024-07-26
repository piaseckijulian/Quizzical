"use client"

import { useQuizStore } from "@/store/quizStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  allCorrectAnswers: string[]
}

const QuizInfo = ({ allCorrectAnswers }: Props) => {
  const { userAnswers, isShowingAnswers, resetQuiz, showAnswers } =
    useQuizStore()

  const router = useRouter()
  const [score, setScore] = useState(0)

  // Disabled if some questions still not answered
  const isCheckAnswersBtnDisabled = userAnswers.some((answer) => !answer)

  useEffect(() => {
    if (isShowingAnswers) {
      userAnswers.forEach((answer, index) => {
        if (answer === allCorrectAnswers[index]) setScore((prev) => prev + 1)
      })
    }
  }, [isShowingAnswers, allCorrectAnswers, userAnswers])

  const handleNewGame = () => {
    resetQuiz()
    setScore(0)

    router.push("/")
  }

  return (
    <div className="quiz__info">
      {isShowingAnswers && <p>You scored {score}/5 correct answers</p>}

      <button
        type="button"
        className="btn"
        onClick={isShowingAnswers ? handleNewGame : showAnswers}
        disabled={isCheckAnswersBtnDisabled}
      >
        {isShowingAnswers ? "Play again" : "Check answers"}
      </button>
    </div>
  )
}

export default QuizInfo
