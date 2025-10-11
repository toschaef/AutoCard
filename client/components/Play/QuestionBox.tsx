interface QuestionBoxProps {
  text: string;
}

export default function QuestionBox({ text }: QuestionBoxProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-slate-900">
        {text}
      </h1>
    </div>
  );
}
