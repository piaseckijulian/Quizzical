import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from '../routes/Welcome';
import Trivia from '../routes/Trivia';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/trivia' element={<Trivia />} />
			</Routes>
		</BrowserRouter>
	);
}
