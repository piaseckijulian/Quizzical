import React, { useState, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Trivia = lazy(() => import('../routes/Trivia'));
const Welcome = lazy(() => import('../routes/Welcome'));

const App = () => {
	const [selectedCategory, setSelectedCategory] = useState(0);

	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
};

export default App;
