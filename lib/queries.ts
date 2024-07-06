"use server"

import axios from "axios"
import { decode } from "he"
import { cache } from "react"
import { shuffle } from "./utils"

type CategoriesRes = {
  trivia_categories: {
    id: number
    name: string
  }[]
}

export const getCategories = cache(async () => {
  const url = "https://opentdb.com/api_category.php"

  try {
    const { data } = await axios.get<CategoriesRes>(url)

    const categories = data.trivia_categories

    categories.unshift({ id: 0, name: "Any Category" })

    return categories
    // biome-ignore lint/suspicious/noExplicitAny: Error
  } catch (error: any) {
    throw new Error(error)
  }
})

type QuizRes = {
  response_code: number
  results: {
    type: "multiple" | "boolean"
    difficulty: "easy" | "medium" | "hard"
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }[]
}

export const getQuiz = async (category: number) => {
  const url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}`

  try {
    const { data } = await axios.get<QuizRes>(url)

    if (data.response_code !== 0) {
      console.error(`Something went wrong! Error code: ${data.response_code}`)

      return { error: true }
    }

    const quiz = data.results.map(result => ({
      ...result,
      question: decode(result.question),
      all_answers: shuffle([
        ...result.incorrect_answers.map(answer => decode(answer)),
        decode(result.correct_answer)
      ]),
      correct_answer: decode(result.correct_answer)
    }))

    return { quiz }
    // biome-ignore lint/suspicious/noExplicitAny: Error
  } catch (error: any) {
    throw new Error(error)
  }
}
