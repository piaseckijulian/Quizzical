'use server';

import axios from 'axios';
import { decode } from 'he';
import { shuffle } from './utils';

interface CategoriesRes {
  trivia_categories: {
    id: number;
    name: string;
  }[];
}

export const getCategories = async () => {
  const url = 'https://opentdb.com/api_category.php';

  try {
    const { data } = await axios.get<CategoriesRes>(url);

    const categories = data.trivia_categories;

    categories.unshift({ id: 0, name: 'Any Category' });

    return categories;
  } catch (error) {
    throw new Error(error as string);
  }
};

interface QuizRes {
  response_code: number;
  results: {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

export const getQuiz = async (category: number) => {
  const url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}`;

  try {
    const { data } = await axios.get<QuizRes>(url);

    if (data.response_code !== 0) {
      throw new Error('Something went wrong');
    }

    const quiz = data.results.map(result => ({
      ...result,
      question: decode(result.question),
      all_answers: shuffle([
        ...result.incorrect_answers.map(answer => decode(answer)),
        decode(result.correct_answer)
      ]),
      correct_answer: decode(result.correct_answer)
    }));

    return quiz;
  } catch (error) {
    throw new Error(error as string);
  }
};
