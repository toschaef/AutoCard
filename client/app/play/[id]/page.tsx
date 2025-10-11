'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { buildAnswers} from '../../../lib/game';
import { yourSets, recentSets, draftSets } from '../../../lib/mockData';
import AnswerGrid from '../../../components/Play/AnswerGrid';

export default function PlayPage() {
  const params = useParams();
  const setId = params.id as string;

  // combine all sets
  const allSets = [...yourSets, ...recentSets, ...draftSets];
  const cardSet =
    allSets.find(set => set.id === setId) ||
    allSets.find(set => set.id === 'cpp-basics') ||
    allSets[0];

  // state
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFeedback, setIsFeedback] = useState(false);

  const currentCard = qIndex >= 0 && qIndex < cardSet.cards.length
  ? cardSet.cards[qIndex]
  : null;

  const answers = useMemo(
    () => (currentCard ? buildAnswers(currentCard) : []),
    [currentCard]
  );


  // reset selection on new question
  useEffect(() => {
    setSelectedIndex(null);
    setIsFeedback(false);
  }, [qIndex]);

  const handleChoose = (index: number) => {
    if (isFeedback) return; // ignore input during feedback

    setSelectedIndex(index);
    setIsFeedback(true);

    const chosen = answers[index];
    if (chosen.isCorrect) {
      setScore(prev => prev + 100);
    }

    // feedback delay then advance
    setTimeout(() => {
      setIsFeedback(false);
      if (qIndex < cardSet.cards.length - 1) {
        setQIndex(prev => prev + 1);
      } else {
        setQIndex(-1); // end of game
      }
    }, 1000);
  };

  const handlePlayAgain = () => {
    setQIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setIsFeedback(false);
  };

  // end screen
  if (qIndex === -1) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl font-bold text-slate-900 mb-8">{score}</div>
          <p className="text-2xl text-slate-600 mb-12">Final Score</p>
          <div className="flex gap-6 justify-center">
            <button
              onClick={handlePlayAgain}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-8 py-4 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Play Again
            </button>
            <Link
              href="/dashboard"
              className="bg-slate-600 hover:bg-slate-700 text-white font-bold text-xl px-8 py-4 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Question */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            {currentCard?.question}
          </h1>
        </div>

        {/* Answers */}
        <div className="w-full max-w-4xl">
          <AnswerGrid
            answers={answers}
            selectedIndex={selectedIndex}
            isChecked={isFeedback} // same flag for feedback
            isFeedback={isFeedback}
            onChoose={handleChoose}
          />
        </div>
      </div>

      {/* screen reader feedback */}
      {isFeedback && (
        <div className="sr-only" aria-live="polite">
          {selectedIndex !== null && answers[selectedIndex].isCorrect
            ? 'Correct.'
            : `Incorrect, correct answer: ${
                answers.find(a => a.isCorrect)?.text || 'Unknown'
              }`}
        </div>
      )}
    </div>
  );
}
