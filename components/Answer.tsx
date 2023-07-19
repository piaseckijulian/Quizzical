'use client';

import { ChangeEvent, useId } from 'react';

import { answerProps } from '../types';

const Answer = ({
	answer,
	formData,
	setFormData,
	questionId,
	showResults,
	name
}: answerProps) => {
	const id = useId();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setFormData(
			formData.map(data =>
				questionId === data.id
					? {
							...data,
							userAnswer: e.target.value
					  }
					: data
			)
		);

	const isCorrectAnswer = answer === formData[questionId].correctAnswer;

	let answerClass = '';
	if (showResults) {
		if (isCorrectAnswer) {
			answerClass = 'correct';
		} else if (!isCorrectAnswer && formData[questionId].userAnswer === answer) {
			answerClass = 'incorrect';
		} else {
			answerClass = 'other';
		}
	}

	return (
		<>
			<input
				type="radio"
				name={name}
				id={id}
				value={answer}
				onChange={e => handleChange(e)}
				checked={formData[questionId].userAnswer === answer}
				disabled={showResults}
			/>
			<label htmlFor={id} className={answerClass}>
				{answer}
			</label>
		</>
	);
};

export default Answer;
