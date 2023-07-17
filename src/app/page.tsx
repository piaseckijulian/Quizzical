'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCategoryContext } from './contexts/CategoryContextProvider';
import { categoriesType, categoriesInterface } from './types';

const Home = () => {
	const [categories, setCategories] = useState<categoriesType[]>([]);
	const { selectedCategory, setSelectedCategory } = useCategoryContext();

	const fetchCategories = async () => {
		const url = 'https://opentdb.com/api_category.php';
		const res = await fetch(url);
		const data: categoriesInterface = await res.json();

		data.trivia_categories.unshift({ id: 0, name: 'Any Category' });

		setCategories(data.trivia_categories);
	};

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) =>
		setSelectedCategory(parseInt(e.target.value));

	useEffect(() => {
		fetchCategories();
	}, []);

	const categoriesEl = categories.map((category, index) => (
		<option key={index} value={category.id}>
			{category.name}
		</option>
	));

	return (
		<div className="welcome--wrapper">
			<div className="blob--left">
				<Image
					src="/assets/blob-left.svg"
					alt=""
					className="blob"
					width={210}
					height={210}
					priority
				/>
			</div>
			<div className="blob--right">
				<Image
					src="/assets/blob-right.svg"
					alt=""
					className="blob"
					width={210}
					height={210}
				/>
			</div>

			<h1 className="welcome--heading">Quizzical</h1>
			<p className="welcome--description">Test your knowledge!</p>

			<select
				className="welcome--category"
				value={selectedCategory}
				onChange={e => handleSelect(e)}>
				{categoriesEl}
			</select>

			<Link href="/quiz" className="btn">
				Start quiz
			</Link>
		</div>
	);
};

export default Home;
