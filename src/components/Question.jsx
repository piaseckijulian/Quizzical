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

	const answerID = [nanoid(), nanoid(), nanoid(), nanoid()];

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
					id={answerID[index]}
					value={answer}
					onChange={e => handleChange(e)}
					checked={formData[id].userAnswer === answer}
					disabled={showResults}
				/>
				<label htmlFor={answerID[index]} className={answerClass}>
					{answer}
				</label>
			</React.Fragment>
		);
	});

	return (
		<div className='question'>
			<h2 className='question--text'>{question}</h2>
			<div className='answers'>{answersEl}</div>
			<hr className='line' />
		</div>
	);
}
