'use server';

import axios from 'axios';

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
