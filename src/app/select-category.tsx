"use client"

import { useCategoryStore } from "@/store/categoryStore"
import type { ChangeEvent } from "react"

type Props = {
  categories: {
    id: number
    name: string
  }[]
}

export const SelectCategory = ({ categories }: Props) => {
  const { selectedCategory, setSelectedCategory } = useCategoryStore()

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = Number.parseInt(e.target.value)

    setSelectedCategory(category)
  }

  return (
    <select
      value={selectedCategory || 0}
      onChange={handleCategorySelect}
      aria-label="Select category"
    >
      {categories.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  )
}
