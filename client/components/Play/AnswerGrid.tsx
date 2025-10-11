import AnswerButton from './AnswerButton';

interface AnswerGridProps {
  answers: { text: string; isCorrect: boolean }[];
  selectedIndex: number | null;
  isChecked: boolean;
  isFeedback: boolean;
  onChoose: (idx: number) => void;
}

export default function AnswerGrid({ answers, selectedIndex, isChecked, isFeedback, onChoose }: AnswerGridProps) {
  const getButtonState = (index: number, isCorrect: boolean) => {
    if (!isChecked && !isFeedback) {
      return index === selectedIndex ? "selected" : "idle";
    }
    
    // During feedback
    if (isCorrect) return "correct";
    if (index === selectedIndex && !isCorrect) return "wrong";
    if (selectedIndex !== index && isCorrect) return "reveal-correct";
    
    return "idle";
  };

  // Layout patterns - Kahoot style
  if (answers.length === 4) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            label={answer.text}
            disabled={isChecked || isFeedback}
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
      <div className="space-y-6">
        {/* Top row - centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <AnswerButton
              label={answers[0].text}
              disabled={isChecked || isFeedback}
              state={getButtonState(0, answers[0].isCorrect)}
              onClick={() => onChoose(0)}
              data-testid="answer-0"
            />
          </div>
        </div>
        {/* Bottom row - 2 columns */}
        <div className="grid grid-cols-2 gap-6">
          <AnswerButton
            label={answers[1].text}
            disabled={isChecked || isFeedback}
            state={getButtonState(1, answers[1].isCorrect)}
            onClick={() => onChoose(1)}
            data-testid="answer-1"
          />
          <AnswerButton
            label={answers[2].text}
            disabled={isChecked || isFeedback}
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
      <div className="grid grid-cols-2 gap-6">
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            label={answer.text}
            disabled={isChecked || isFeedback}
            state={getButtonState(index, answer.isCorrect)}
            onClick={() => onChoose(index)}
            data-testid={`answer-${index}`}
          />
        ))}
      </div>
    );
  }

  // Single option - centered
  if (answers.length === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <AnswerButton
            label={answers[0].text}
            disabled={isChecked || isFeedback}
            state={getButtonState(0, answers[0].isCorrect)}
            onClick={() => onChoose(0)}
            data-testid="answer-0"
          />
        </div>
      </div>
    );
  }

  // Fallback for other lengths
  return (
    <div className="space-y-6">
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
