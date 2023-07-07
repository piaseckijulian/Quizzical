import './styles/App.css';
import './styles/Welcome.css';
import './styles/Trivia.css';
import './styles/Queries.css';

import type { Metadata } from 'next';
import { childrenType } from './types';

import { CategoryContextProvider } from './contexts/CategoryContextProvider';

export const metadata: Metadata = {
	title: 'Quizzical',
	description:
		'Test your knowledge with our engaging Trivia Quiz App. Challenge yourself with a wide range of categories. Start playing now and become a trivia master!'
};

export default function RootLayout({ children }: childrenType) {
	return (
		<html lang="en">
			<body>
				<CategoryContextProvider>{children}</CategoryContextProvider>
			</body>
		</html>
	);
}
