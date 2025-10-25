'use client';

import { Prompt } from '@/types/types';
import { useState } from 'react';

interface GenerateQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (settings: Partial<Prompt>) => void;
}

export default function GenerateQuestionsModal({ isOpen, onClose, onGenerate }: GenerateQuestionsModalProps) {
  const [settings, setSettings] = useState<Partial<Prompt>>({
    prompt: '',
    genre: '',
    numProblemsPerGenre: 10,
    difficulty: 'any',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!settings.prompt!.trim()) {
      alert('Topic is required');
      return;
    }

    onGenerate(settings);
    
    // Reset form
    setSettings({
      prompt: '',
      genre: '',
      numProblemsPerGenre: 10,
      difficulty: 'any',
    });
    onClose();
  };

  const handleClose = () => {
    setSettings({
      prompt: '',
      genre: '',
      numProblemsPerGenre: 10,
      difficulty: 'any',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white text-black placeholder:text-black rounded-2xl shadow-2xl max-w-lg w-full p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Generate Questions with AI</h2>
        <p className="text-slate-600 mb-6">Describe what you want and AI will generate problems/cards for you</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Short Description
            </label>
            <textarea
              value={settings.prompt}
              onChange={(e) => setSettings({ ...settings, prompt: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[80px]"
              placeholder="Brief context about what the questions should cover..."
              required
            />
          </div>

          {/* Specific Genre */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Specific Genre
            </label>
            <input
              type="text"
              value={settings.genre}
              onChange={(e) => setSettings({ ...settings, genre: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Minimax, Recursion, Dynamic Programming..."
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Difficulty Level
            </label>
            <select
              value={settings.difficulty}
              onChange={(e) => setSettings({ ...settings, difficulty: e.target.value as Prompt['difficulty'] })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value={'any'}>Any</option>
              <option value={'novice'}>Novice</option>
              <option value={'intermediate'}>Intermediate</option>
              <option value={'advanced'}>Advanced</option>
            </select>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Number of Questions Per Genre
            </label>
            <select
              value={settings.numProblemsPerGenre}
              onChange={(e) => setSettings({ ...settings, numProblemsPerGenre: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value={5}>5 questions</option>
              <option value={10}>10 questions</option>
              <option value={20}>20 questions</option>
            </select>
          </div>

          {/* Info Box */}
          {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> AI will generate {settings.count} questions about "{settings.topic || 'your topic'}". API integration coming soon!
            </p>
          </div> */}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Generate Questions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
