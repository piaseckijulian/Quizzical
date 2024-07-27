"use client"

import { Button } from "@/components/button"
import { useQuizStore } from "@/stores/quizStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  allCorrectAnswers: string[]
}

export const QuizInfo = ({ allCorrectAnswers }: Props) => {
  const { userAnswers, isShowingAnswers, resetQuiz, showAnswers } =
    useQuizStore()

  const router = useRouter()
  const [score, setScore] = useState(0)

  // Disabled if some questions are still not answered
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

      <Button
        type="button"
        onClick={isShowingAnswers ? handleNewGame : showAnswers}
        disabled={isCheckAnswersBtnDisabled}
      >
        {isShowingAnswers ? "Play again" : "Check answers"}
      </Button>
    </div>
  )
}
