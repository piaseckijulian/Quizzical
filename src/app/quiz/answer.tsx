"use client"

import { cn } from "@/lib/utils"
import { useQuizStore } from "@/store/quizStore"

type Props = {
  questionId: number
  answer: string
  correctAnswer: string
}

export const Answer = ({ questionId, answer, correctAnswer }: Props) => {
  const { userAnswers, isShowingAnswers, answerSelect } = useQuizStore()

  const handleChange = () => {
    answerSelect(questionId, answer)
  }

  return (
    <label
      className={cn(
        isShowingAnswers && {
          correct: answer === correctAnswer,
          wrong: answer !== correctAnswer && answer === userAnswers[questionId],
          neutral:
            answer !== correctAnswer && answer !== userAnswers[questionId],
        },
      )}
    >
      <input
        type="radio"
        value={answer}
        name={questionId.toString()}
        onChange={handleChange}
        checked={answer === userAnswers[questionId]}
        disabled={isShowingAnswers}
      />
      {answer}
    </label>
  )
}
