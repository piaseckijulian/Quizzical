import React, { useId } from 'react';
import Answer from '../components/Answer';

const Question = ({
	question,
	answers,
	questionId,
	setFormData,
	formData,
	showResults
}) => {
	const name = useId();

	const answersEl = answers.map((answer, index) => (
		<Answer
			key={index}
			answer={answer}
			formData={formData}
			setFormData={setFormData}
			questionId={questionId}
			showResults={showResults}
			name={name}
		/>
	));

	return (
		<div className='question'>
			<h2 className='question--text'>{question}</h2>
			<div className='answers'>{answersEl}</div>
			<hr className='line' />
		</div>
	);
};

export default Question;
