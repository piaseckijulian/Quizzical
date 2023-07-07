'use client';

import { useEffect, useState } from 'react';
import useUpdateEffect from '../hooks/useUpdateEffect';
import Loading from '../components/Loading';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { decode } from 'he';
import { useCategoryContext } from '../contexts/CategoryContextProvider';
import { formDataType, triviaType, resultsType } from '../types';
import Question from '../components/Question';

const Trivia = () => {
	const { selectedCategory } = useCategoryContext();

	const [isLoading, setIsLoading] = useState(true);
	const [trivia, setTrivia]: [triviaType[], Function] = useState([]);
	const [formData, setFormData]: [formDataType[], Function] = useState([]);
	const [allAnswers, setAllAnswers]: [string[][], Function] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [disabledCheckAnswersBtn, setDisabledCheckAnswersBtn] = useState(true);
	const [score, setScore] = useState(0);

	const router = useRouter();

	const fetchData = async () => {
		const url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${selectedCategory}`;
		const res = await fetch(url);
		const data = await res.json();

		const results: triviaType[] = data.results.map((result: resultsType) => ({
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

		const shuffle = (array: any[]) => {
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
		setAllAnswers(answersArray);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useUpdateEffect(() => {
		formData.every(data => data.userAnswer !== '') &&
			setDisabledCheckAnswersBtn(false);
	}, [formData]);

	const QuestionsEl = trivia.map((trivia, index) => (
		<Question
			key={index}
			questionId={index}
			question={trivia.question}
			answers={allAnswers[index]}
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
		setIsLoading(true);
		setScore(0);
		router.push('/');
	};

	return (
		<div className="container">
			<div className="trivia--wrapper">
				<div className="blob--left">
					<Image
						src="/assets/blob-left.svg"
						alt=""
						className="blob blob--trivia"
						width={130}
						height={130}
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

				{isLoading ? (
					<Loading />
				) : (
					<>
						{QuestionsEl}

						<div className="trivia--controls">
							{showResults && (
								<p className="trivia--score">
									You scored {score}/5 correct answers
								</p>
							)}

							<button
								className="btn"
								disabled={disabledCheckAnswersBtn}
								onClick={showResults ? newGame : checkAnswers}>
								{showResults ? 'Play again' : 'Check answers'}
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Trivia;
