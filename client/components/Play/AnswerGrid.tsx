import AnswerButton from './AnswerButton';

interface AnswerGridProps {
  answers: { text: string; isCorrect: boolean }[];
  locked: boolean;
  chosenIndex: number | null;
  onChoose: (idx: number) => void;
}

export default function AnswerGrid({ answers, locked, chosenIndex, onChoose }: AnswerGridProps) {
  const getButtonState = (index: number, isCorrect: boolean) => {
    if (!locked) return "idle";
    
    if (isCorrect) return "correct";
    if (index === chosenIndex && !isCorrect) return "wrong";
    if (chosenIndex !== index && isCorrect) return "reveal-correct";
    
    return "idle";
  };

  // Layout patterns
  if (answers.length === 4) {
    return (
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            label={answer.text}
            disabled={locked}
            state={getButtonState(index, answer.isCorrect)}
            onClick={() => onChoose(index)}
            data-testid={`answer-${index}`}
          />
        ))}
      </div>
    );
  }

  if (answers.length === 3) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Top row - centered */}
        <div className="grid grid-cols-1 place-items-center">
          <div className="w-full max-w-md">
            <AnswerButton
              label={answers[0].text}
              disabled={locked}
              state={getButtonState(0, answers[0].isCorrect)}
              onClick={() => onChoose(0)}
              data-testid="answer-0"
            />
          </div>
        </div>
        {/* Bottom row - 2 columns */}
        <div className="grid grid-cols-2 gap-4">
          <AnswerButton
            label={answers[1].text}
            disabled={locked}
            state={getButtonState(1, answers[1].isCorrect)}
            onClick={() => onChoose(1)}
            data-testid="answer-1"
          />
          <AnswerButton
            label={answers[2].text}
            disabled={locked}
            state={getButtonState(2, answers[2].isCorrect)}
            onClick={() => onChoose(2)}
            data-testid="answer-2"
          />
        </div>
      </div>
    );
  }

  if (answers.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            label={answer.text}
            disabled={locked}
            state={getButtonState(index, answer.isCorrect)}
            onClick={() => onChoose(index)}
            data-testid={`answer-${index}`}
          />
        ))}
      </div>
    );
  }

  // Fallback for other lengths
  return (
    <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
      {answers.map((answer, index) => (
        <AnswerButton
          key={index}
          label={answer.text}
          disabled={locked}
          state={getButtonState(index, answer.isCorrect)}
          onClick={() => onChoose(index)}
          data-testid={`answer-${index}`}
        />
      ))}
    </div>
  );
}
