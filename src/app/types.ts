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
	setFormData: Function;
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
	setFormData: Function;
	formData: formDataType[];
	showResults: boolean;
};

export type triviaType = {
	question: string;
	correctAnswer: string;
	incorrectAnswers: string[];
};

export type resultsType = {
	category: string;
	type: string;
	difficulty: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
};
