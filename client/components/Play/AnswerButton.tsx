interface AnswerButtonProps {
  label: string;
  disabled?: boolean;
  state?: "idle" | "correct" | "wrong" | "reveal-correct";
  onClick?: () => void;
  "data-testid"?: string;
}

export default function AnswerButton({ 
  label, 
  disabled = false, 
  state = "idle", 
  onClick,
  "data-testid": dataTestId 
}: AnswerButtonProps) {
  const baseClasses = "w-full p-4 text-left font-medium text-black rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[60px] flex items-center";
  
  const stateClasses = {
    idle: "hover:bg-slate-50",
    correct: "bg-green-600 text-white border-green-600",
    wrong: "bg-red-600 text-white border-red-600",
    "reveal-correct": "bg-white border-green-600 ring-2 ring-green-600"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      className={`${baseClasses} ${stateClasses[state]} ${disabledClasses}`}
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {label}
    </button>
  );
}
