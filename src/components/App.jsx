import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from '../routes/Welcome';
import Trivia from '../routes/Trivia';

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
