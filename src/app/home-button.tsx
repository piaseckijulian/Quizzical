"use client"

import { Button } from "@/components/button"
import { useCategoryStore } from "@/stores/categoryStore"
import { useQuizStore } from "@/stores/quizStore"

export const HomeButton = () => {
  const { selectedCategory } = useCategoryStore()
  const { resetQuiz } = useQuizStore()

  return (
    <Button
      href={`/quiz?category=${selectedCategory || 0}`}
      onClick={resetQuiz}
    >
      Start quiz
    </Button>
  )
}
