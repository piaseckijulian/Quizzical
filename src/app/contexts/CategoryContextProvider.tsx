'use client';

import { createContext, useContext, useState } from 'react';
import { childrenType } from '../types';

interface CategoryContextType {
	selectedCategory: number;
	setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
}

const CategoryContext = createContext<CategoryContextType>({
	selectedCategory: 0,
	setSelectedCategory: () => {}
});

export const CategoryContextProvider = ({ children }: childrenType) => {
	const [selectedCategory, setSelectedCategory] = useState(0);
	return (
		<CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
			{children}
		</CategoryContext.Provider>
	);
};

export const useCategoryContext = () => useContext(CategoryContext);
