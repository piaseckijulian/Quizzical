import React, { useEffect, useState, useRef } from 'react';
import Question from '../components/Question';
import { decode } from 'he';

export default function Trivia() {
	const isMounted = useRef(false);
	const [trivia, setTrivia] = useState([]);
	const [formData, setFormData] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [checkAnswersBtn, setCheckAnswersBtn] = useState(true);
	const [score, setScore] = useState(0);

	async function fetchData() {
		const url = 'https://opentdb.com/api.php?amount=5&type=multiple';
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
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (isMounted.current) {
			if (formData.every(data => data.userAnswer !== '')) {
				setCheckAnswersBtn(false);
			}
		} else {
			isMounted.current = true;
		}
	}, [formData]);

	const triviaElements = trivia.map((trivia, index) => (
		<Question
			question={trivia.question}
			answers={answers[index]}
			id={index}
			setFormData={setFormData}
			formData={formData}
			showResults={showResults}
			setCheckAnswersBtn={setCheckAnswersBtn}
			key={index}
		/>
	));

	function checkAnswers() {
		setShowResults(true);

		formData.map(data => {
			if (data.userAnswer === data.correctAnswer) {
				setScore(prevScore => prevScore + 1);
			}
		});
	}

	async function newGame() {
		fetchData();
		setShowResults(false);
		setCheckAnswersBtn(true);
		setScore(0);
	}

	return (
		<div className='container'>
			<div className='trivia--wrapper'>
				<div className='blob--left'>
					<svg
						className='blob blob--trivia'
						viewBox='0 0 148 118'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z'
							fill='#DEEBF8'
						/>
					</svg>
				</div>
				<div className='blob--right'>
					<svg
						className='blob'
						viewBox='0 0 158 141'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z'
							fill='#FFFAD1'
						/>
					</svg>
				</div>

				{triviaElements}

				<div className='trivia--controls'>
					{showResults && (
						<p className='trivia--score'>
							You scored {score}/5 correct answers
						</p>
					)}
					<button
						className={`btn ${checkAnswersBtn && 'disabled--btn'}`}
						disabled={checkAnswersBtn}
						onClick={showResults ? newGame : checkAnswers}>
						{showResults ? 'Play again' : 'Check answers'}
					</button>
				</div>
			</div>
		</div>
	);
}
