'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CardSet } from '../../../lib/types';
import { buildAnswers, TIMER_SECONDS } from '../../../lib/game';
import { yourSets, recentSets, draftSets } from '../../../lib/mockData';
import ScoreBar from '../../../components/Play/ScoreBar';
import AnswerGrid from '../../../components/Play/AnswerGrid';
import TimerBadge from '../../../components/Play/TimerBadge';
import SubmitCounter from '../../../components/Play/SubmitCounter';
import QuestionBox from '../../../components/Play/QuestionBox';

export default function PlayPage() {
  const params = useParams();
  const router = useRouter();
  const setId = params.id as string;
  
  // Find the card set by ID, fallback to cpp-basics
  const allSets = [...yourSets, ...recentSets, ...draftSets];
  const cardSet = allSets.find(set => set.id === setId) || 
    allSets.find(set => set.id === 'cpp-basics') || 
    allSets[0];
  
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [submitCount, setSubmitCount] = useState(0);
  
  const currentCard = cardSet.cards[qIndex];
  const answers = useMemo(() => buildAnswers(currentCard), [currentCard]);

  // Timer effect
  useEffect(() => {
    if (locked || qIndex === -1) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Timer expired - auto-lock as incorrect
          setLocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [locked, qIndex]);

  // Reset timer and submit count on new question
  useEffect(() => {
    if (qIndex >= 0) {
      setTimeLeft(TIMER_SECONDS);
      setSubmitCount(0);
      setLocked(false);
      setChosenIndex(null);
    }
  }, [qIndex]);
  
  const handleChoose = (index: number) => {
    if (locked) return;
    
    // If clicking the same answer, deselect it
    if (chosenIndex === index) {
      setChosenIndex(null);
      setSubmitCount(0);
      return;
    }
    
    // Otherwise, select the new answer
    setChosenIndex(index);
    setSubmitCount(1);
  };
  
  const handleNext = () => {
    if (chosenIndex === null && !locked) return; // Must have selected an answer or timer expired
    
    // Lock the question and show results
    setLocked(true);
    
    // Add score if correct
    if (chosenIndex !== null && answers[chosenIndex].isCorrect) {
      setScore(prev => prev + 100);
    }
    
    // Auto-advance after a short delay to show the correct answer
    setTimeout(() => {
      if (qIndex < cardSet.cards.length - 1) {
        setQIndex(prev => prev + 1);
      } else {
        // Show results
        setQIndex(-1);
      }
    }, 2000); // 2 second delay to show correct answer
  };

  const handlePlayAgain = () => {
    setQIndex(0);
    setScore(0);
    setLocked(false);
    setChosenIndex(null);
    setTimeLeft(TIMER_SECONDS);
    setSubmitCount(0);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && (locked || chosenIndex !== null) && qIndex >= 0) {
      handleNext();
    }
  };
  
  // Results screen
  if (qIndex === -1) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Quiz Complete!</h1>
          <div className="text-6xl font-bold text-slate-900 mb-6">{score}</div>
          <p className="text-lg text-slate-600 mb-8">Final Score</p>
          <div className="space-y-4">
            <button
              onClick={handlePlayAgain}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Play Again
            </button>
            <Link
              href="/dashboard"
              className="inline-block w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-6 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8" onKeyDown={handleKeyPress} tabIndex={0}>
      <div className="max-w-4xl mx-auto">
        <ScoreBar 
          current={qIndex + 1} 
          total={cardSet.cards.length} 
          score={score} 
        />
        
        {/* Question with side badges */}
        <div className="flex items-center justify-between mb-6">
          <TimerBadge seconds={timeLeft} />
          <div className="flex-1 mx-6">
            <QuestionBox text={currentCard.question} />
          </div>
          <SubmitCounter count={submitCount} />
        </div>
        
        <AnswerGrid
          answers={answers}
          locked={locked}
          chosenIndex={chosenIndex}
          onChoose={handleChoose}
        />
        
        <div className="mt-8 text-center space-y-6">
          {!locked && chosenIndex === null && (
            <p className="text-slate-500">Choose an answer...</p>
          )}
          {(locked || chosenIndex !== null) && (
            <button
              onClick={handleNext}
              className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-3 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              {qIndex < cardSet.cards.length - 1 ? 'Next' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
