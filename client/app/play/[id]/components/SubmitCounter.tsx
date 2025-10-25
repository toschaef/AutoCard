interface SubmitCounterProps {
  count: number;
}

export default function SubmitCounter({ count }: SubmitCounterProps) {
  return (
    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold">
      {count}
    </div>
  );
}
