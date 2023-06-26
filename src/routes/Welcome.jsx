import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Welcome = ({ setSelectedCategory, selectedCategory }) => {
	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		const url = 'https://opentdb.com/api_category.php';
		const res = await fetch(url);
		const data = await res.json();

		data.trivia_categories.unshift({ id: 0, name: 'Any Category' });

		setCategories(data.trivia_categories);
	};

	const handleSelect = e => setSelectedCategory(parseInt(e.target.value));

	useEffect(() => {
		fetchCategories();
	}, []);

	const categoriesEl = categories.map((category, index) => (
		<option key={index} value={category.id}>
			{category.name}
		</option>
	));

	return (
		<div className='welcome--wrapper'>
			<div className='blob--left'>
				<img
					src='../images/blob-left.svg'
					alt=''
					className='blob trivia--blob'
				/>
			</div>
			<div className='blob--right'>
				<img src='../images/blob-right.svg' alt='' className='blob' />
			</div>

			<h1 className='welcome--heading'>Quizzical</h1>
			<p className='welcome--description'>Test your knowledge!</p>

			<select
				className='welcome--category'
				value={selectedCategory}
				onChange={e => handleSelect(e)}>
				{categoriesEl}
			</select>

			<Link to='/trivia'>
				<button className='btn'>Start quiz</button>
			</Link>
		</div>
	);
};

export default Welcome;
