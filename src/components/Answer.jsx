import React, { useId } from 'react';

const Answer = ({
	answer,
	formData,
	setFormData,
	formDataId,
	showResults,
	name
}) => {
	const id = useId();

	const handleChange = e =>
		setFormData(
			formData.map(data =>
				formDataId === data.id
					? {
							...data,
							userAnswer: e.target.value
					  }
					: data
			)
		);

	const isCorrectAnswer = answer === formData[formDataId].correctAnswer;

	let answerClass = '';
	if (showResults) {
		if (isCorrectAnswer) {
			answerClass = 'correct';
		} else if (!isCorrectAnswer && formData[formDataId].userAnswer === answer) {
			answerClass = 'incorrect';
		} else {
			answerClass = 'other';
		}
	}

	return (
		<>
			<input
				type='radio'
				name={name}
				id={id}
				value={answer}
				onChange={e => handleChange(e)}
				checked={formData[formDataId].userAnswer === answer}
				disabled={showResults}
			/>
			<label htmlFor={id} className={answerClass}>
				{answer}
			</label>
		</>
	);
};

export default Answer;
