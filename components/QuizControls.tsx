import { useQuizStore } from '@/state/quizStore';
import { Button } from '@/components';

const QuizControls = () => {
  const { score, showResults } = useQuizStore(state => ({
    score: state.score,
    showResults: state.showResults
  }));

  return (
    <div className="quiz__controls">
      {showResults && <p className="quiz__score">You scored {score}/5 correct answers</p>}

      <Button type="check" />
    </div>
  );
};

export default QuizControls;
