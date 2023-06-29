import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Welcome = lazy(() => import('./routes/Welcome'));
const Trivia = lazy(() => import('./routes/Trivia'));

const App = () => {
	const [selectedCategory, setSelectedCategory] = useState(0);

	return (
		<Suspense>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<Welcome
								setSelectedCategory={setSelectedCategory}
								selectedCategory={selectedCategory}
							/>
						}
					/>
					<Route
						path='/trivia'
						element={<Trivia selectedCategory={selectedCategory} />}
					/>
				</Routes>
			</Router>
		</Suspense>
	);
};

export default App;
