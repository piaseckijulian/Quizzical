import React from 'react';
import { nanoid } from 'nanoid';

export default function Question({
	question,
	answers,
	id,
	setFormData,
	formData,
	showResults
}) {
	const name = nanoid();

	function handleChange(e) {
		const { value } = e.target;

		setFormData(
			formData.map(data => {
				if (id === data.id) {
					return {
						...data,
						userAnswer: value
					};
				} else {
					return data;
				}
			})
		);
	}

	const ids = [nanoid(), nanoid(), nanoid(), nanoid()];

	const answersEl = answers.map((answer, index) => {
		const isCorrectAnswer = answer === formData[id].correctAnswer;

		let answerClass = '';
		if (showResults) {
			if (isCorrectAnswer) {
				answerClass = 'correct';
			} else if (!isCorrectAnswer && formData[id].userAnswer === answer) {
				answerClass = 'incorrect';
			} else {
				answerClass = 'other';
			}
		}

		return (
			<React.Fragment key={index}>
				<input
					type='radio'
					name={name}
					id={ids[index]}
					value={answer}
					onChange={e => handleChange(e)}
					checked={formData[id].userAnswer === answer}
					disabled={showResults}
				/>
				<label htmlFor={ids[index]} className={answerClass}>
					{answer}
				</label>
			</React.Fragment>
		);
	});

	return (
		<>
			<h2 className='question--text'>{question}</h2>
			<div className='answers'>{answersEl}</div>
			<hr className='line' />
		</>
	);
}
