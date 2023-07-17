export type childrenType = {
	children: React.ReactNode;
};

export type formDataType = {
	id: number;
	correctAnswer: string;
	userAnswer: string;
};

export type answerProps = {
	answer: string;
	formData: formDataType[];
	setFormData: React.Dispatch<React.SetStateAction<formDataType[]>>;
	questionId: number;
	showResults: boolean;
	name: string;
};

export type categoriesType = {
	id: number;
	name: string;
};

export type questionProps = {
	question: string;
	answers: string[];
	questionId: number;
	setFormData: React.Dispatch<React.SetStateAction<formDataType[]>>;
	formData: formDataType[];
	showResults: boolean;
};

export type quizType = {
	question: string;
	correctAnswer: string;
	incorrectAnswers: string[];
};

export interface quizInterface {
	response_code: number;
	results: {
		category: string;
		type: string;
		difficulty: string;
		question: string;
		correct_answer: string;
		incorrect_answers: string[];
	}[];
}

export interface categoriesInterface {
	trivia_categories: { id: number; name: string }[];
}
