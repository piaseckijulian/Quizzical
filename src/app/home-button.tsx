"use client"

import { Button } from "@/components/button"
import { useCategoryStore } from "@/stores/categoryStore"

export const HomeButton = () => {
  const { selectedCategory } = useCategoryStore()

  return (
    <Button href={`/quiz?category=${selectedCategory || 0}`}>Start quiz</Button>
  )
}
