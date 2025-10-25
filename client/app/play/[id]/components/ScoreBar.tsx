interface ScoreBarProps {
  current: number;
  total: number;
  score: number;
}

export default function ScoreBar({ current, total, score }: ScoreBarProps) {
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">
          Question {current} of {total}
        </span>
        <span className="text-sm font-bold text-slate-900">
          Score: {score}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
