'use client';

import { createContext, useContext, useState } from 'react';
import { childrenType } from '../types';

interface CategoryContextType {
	selectedCategory: number;
	setSelectedCategory: Function;
}

const CategoryContext = createContext<CategoryContextType>({
	selectedCategory: 0,
	setSelectedCategory: Function
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
