import React, { useState } from 'react';
import Welcome from './Welcome';
import Trivia from './Trivia';

export default function App() {
	const [gameStatus, setGameStatus] = useState(false);

	function handleGame() {
		setGameStatus(true);
	}

	return <>{gameStatus ? <Trivia /> : <Welcome handleGame={handleGame} />}</>;
}
