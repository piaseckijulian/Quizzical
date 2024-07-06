"use client"

import { useCategoryStore } from "@/store/categoryStore"
import Link from "next/link"

const HomeButton = () => {
  const { selectedCategory } = useCategoryStore()

  return (
    <Link href={`/quiz?category=${selectedCategory || 0}`} className="btn">
      Start quiz
    </Link>
  )
}

export default HomeButton
