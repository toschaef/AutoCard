interface TimerBadgeProps {
  seconds: number;
}

export default function TimerBadge({ seconds }: TimerBadgeProps) {
  const isLow = seconds <= 5;
  
  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
      isLow ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700'
    }`}>
      {seconds}
    </div>
  );
}
