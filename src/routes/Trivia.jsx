import React, { useEffect, useState } from 'react';
import useUpdateEffect from '../hooks/useUpdateEffect';
import { Link } from 'react-router-dom';
import Question from '../components/Question';
import { decode } from 'he';

const Trivia = ({ selectedCategory }) => {
	const [trivia, setTrivia] = useState([]);
	const [formData, setFormData] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [disabledCheckAnswersBtn, setDisabledCheckAnswersBtn] = useState(true);
	const [score, setScore] = useState(0);

	const fetchData = async () => {
		const url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${selectedCategory}`;
		const res = await fetch(url);
		const data = await res.json();

		const results = data.results.map(result => ({
			question: decode(result.question),
			correctAnswer: decode(result.correct_answer),
			incorrectAnswers: [
				decode(result.incorrect_answers[0]),
				decode(result.incorrect_answers[1]),
				decode(result.incorrect_answers[2])
			]
		}));

		const formDataArray = results.map((result, index) => ({
			id: index,
			correctAnswer: result.correctAnswer,
			userAnswer: ''
		}));

		const shuffle = array => {
			for (let i = array.length - 1; i >= 0; i--) {
				const randomIndex = Math.floor(Math.random() * (i + 1));
				array.push(array[randomIndex]);
				array.splice(randomIndex, 1);
			}
			return array;
		};

		const answersArray = results.map(result =>
			shuffle([
				result.correctAnswer,
				result.incorrectAnswers[0],
				result.incorrectAnswers[1],
				result.incorrectAnswers[2]
			])
		);

		setTrivia(results);
		setFormData(formDataArray);
		setAnswers(answersArray);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useUpdateEffect(() => {
		formData.every(data => data.userAnswer !== '') &&
			setDisabledCheckAnswersBtn(false),
			[formData];
	});

	const QuestionsEl = trivia.map((trivia, index) => (
		<Question
			key={index}
			questionId={index}
			question={trivia.question}
			answers={answers[index]}
			formData={formData}
			setFormData={setFormData}
			showResults={showResults}
		/>
	));

	const checkAnswers = () => {
		setShowResults(true);

		formData.map(data => {
			if (data.userAnswer === data.correctAnswer) {
				setScore(prevScore => prevScore + 1);
			}
		});
	};

	const newGame = () => {
		fetchData();
		setShowResults(false);
		setDisabledCheckAnswersBtn(true);
		setScore(0);
	};

	return (
		<div className='container'>
			<div className='trivia--wrapper'>
				<div className='blob--left'>
					<img
						src='/images/blob-left.svg'
						alt=''
						className='blob blob--trivia'
					/>
				</div>
				<div className='blob--right'>
					<img src='/images/blob-right.svg' alt='' className='blob' />
				</div>

				{QuestionsEl}

				<div className='trivia--controls'>
					{showResults && (
						<p className='trivia--score'>
							You scored {score}/5 correct answers
						</p>
					)}

					{!showResults && (
						<button
							className='btn'
							disabled={disabledCheckAnswersBtn}
							onClick={checkAnswers}>
							Check answers
						</button>
					)}

					{showResults && (
						<Link to='/'>
							<button
								className='btn'
								disabled={disabledCheckAnswersBtn}
								onClick={newGame}>
								Play again
							</button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Trivia;
