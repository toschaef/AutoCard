interface AnswerButtonProps {
  label: string;
  disabled?: boolean;
  state?: "idle" | "selected" | "correct" | "wrong" | "reveal-correct";
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
  const baseClasses =
    "w-full p-8 text-center font-bold text-black rounded-2xl border-2 bg-white shadow-md transition-all duration-200 focus:outline-none min-h-[120px] flex items-center justify-center text-xl";

  const stateClasses: Record<
    NonNullable<AnswerButtonProps["state"]>,
    string
  > = {
    idle: "hover:bg-slate-100 hover:border-slate-400 hover:shadow-lg",
    selected: "bg-slate-100 border-blue-400 shadow-lg ring-2 ring-blue-200",
    correct:
      "border-green-500 bg-green-100 ring-4 ring-green-200 shadow-lg",
    wrong: "border-red-500 bg-red-100 ring-4 ring-red-200 shadow-lg",
    "reveal-correct":
      "border-green-500 bg-green-50 ring-4 ring-green-200 shadow-lg",
  };

  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed"
    : "cursor-pointer";

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
