'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { buildAnswers } from '../../../lib/game';
import { yourSets, exampleSets } from '../../../lib/exampleSets';
import { useAuth } from '../../../lib/auth';
import AnswerGrid from '../../../components/Play/AnswerGrid';

export default function PlayPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const setId = params.id as string;
  
  // All hooks must be at the top level
  const [cardSet, setCardSet] = useState<any>(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFeedback, setIsFeedback] = useState(false);

  // Auto-login for testing (comment out later)
  useEffect(() => {
    if (!user) {
      const testUser = {
        id: '1',
        email: 'ali@example.com',
        name: 'Ali',
        createdAt: new Date()
      };
      localStorage.setItem('user', JSON.stringify(testUser));
      window.location.reload();
    }
  }, [user, router]);

  // Load the card set (check localStorage first, then static sets)
  useEffect(() => {
    // Check localStorage for temp sets first
    const tempSet = localStorage.getItem(`temp-set-${setId}`);
    if (tempSet) {
      try {
        const parsed = JSON.parse(tempSet);
        setCardSet({
          ...parsed,
          created: new Date(parsed.created)
        });
        return;
      } catch (error) {
        console.error('Error loading temp set:', error);
      }
    }

    // Fallback to static sets
    const allSets = [...yourSets, ...exampleSets];
    const foundSet =
      allSets.find(set => set.id === setId) ||
      allSets.find(set => set.id === 'cpp-basics') ||
      exampleSets[0];
    
    setCardSet(foundSet);
  }, [setId, user]);

  const currentCard = cardSet?.cards?.[qIndex];
  const answers = useMemo(() => currentCard ? buildAnswers(currentCard) : [], [currentCard]);

  // Reset state on new question
  useEffect(() => {
    if (qIndex >= 0 && cardSet) {
      setSelectedIndex(null);
      setIsFeedback(false);
    }
  }, [qIndex, cardSet]);

  const handleChoose = (index: number) => {
    if (isFeedback) return;
    
    setSelectedIndex(index);
    setIsFeedback(true);
    
    if (answers[index].isCorrect) {
      setScore(prev => prev + 100);
    }
    
    setTimeout(() => {
      setIsFeedback(false);
      if (qIndex < (cardSet?.cards?.length || 0) - 1) {
        setQIndex(prev => prev + 1);
      } else {
        setQIndex(-1);
      }
    }, 1000);
  };

  const handlePlayAgain = () => {
    setQIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setIsFeedback(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // No keyboard handling needed
  };

  // If still not found or cards missing, show a safe fallback
  if (!cardSet || !Array.isArray(cardSet.cards) || cardSet.cards.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Set not found</h1>
          <p className="text-slate-600 mb-6">Please pick a set from your dashboard.</p>
          <Link
            href="/dashboard"
            className="inline-block bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }


  // ---- end screen ----
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

  // ---- play screen ----
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar - sticky */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: AutoCard branding */}
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-6 rounded-md shadow"
                style={{ backgroundColor: "var(--green)" }}
                aria-label="AutoCard logo"
              />
              <span className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--green)" }}>
                AutoCard
              </span>
            </div>
            
            {/* Right: End Game button */}
            <button
              onClick={() => setQIndex(-1)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              End Game
            </button>
          </div>
        </div>
      </nav>

      {/* CSS variables for theme */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root{
              --green:#283618; --olive:#606c38; --cream:#fefae0; --amber:#dda15e; --burnt:#bc6c25;
            }
          `,
        }}
      />

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            {currentCard?.question}
          </h1>
        </div>

        <div className="w-full max-w-4xl">
          <AnswerGrid
            answers={answers}
            selectedIndex={selectedIndex}
            isChecked={isFeedback}
            isFeedback={isFeedback}
            onChoose={handleChoose}
          />
        </div>
      </div>

      {isFeedback && (
        <div className="sr-only" aria-live="polite">
          {selectedIndex !== null && answers[selectedIndex]?.isCorrect
            ? 'Correct.'
            : `Incorrect, correct answer: ${answers.find(a => a.isCorrect)?.text || 'Unknown'}`}
        </div>
      )}
    </div>
  );
}
