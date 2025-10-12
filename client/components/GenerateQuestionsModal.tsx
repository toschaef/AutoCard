'use client';

import { useState } from 'react';

interface GenerateQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (settings: { topic: string; description: string; count: number }) => void;
}

export default function GenerateQuestionsModal({ isOpen, onClose, onGenerate }: GenerateQuestionsModalProps) {
  const [settings, setSettings] = useState({
    topic: '',
    description: '',
    count: 10
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!settings.topic.trim()) {
      alert('Topic is required');
      return;
    }

    onGenerate(settings);
    
    // Reset form
    setSettings({
      topic: '',
      description: '',
      count: 10
    });
    onClose();
  };

  const handleClose = () => {
    setSettings({
      topic: '',
      description: '',
      count: 10
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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Generate Questions with AI</h2>
        <p className="text-slate-600 mb-6">Describe what you want and we'll generate flashcards for you</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Topic *
            </label>
            <input
              type="text"
              value={settings.topic}
              onChange={(e) => setSettings({ ...settings, topic: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Python Functions, World War II"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Short Description
            </label>
            <textarea
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[80px]"
              placeholder="Brief context about what the questions should cover..."
            />
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Number of Questions
            </label>
            <select
              value={settings.count}
              onChange={(e) => setSettings({ ...settings, count: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value={5}>5 questions</option>
              <option value={10}>10 questions</option>
              <option value={20}>20 questions</option>
            </select>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> AI will generate {settings.count} questions about "{settings.topic || 'your topic'}". API integration coming soon!
            </p>
          </div>

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
