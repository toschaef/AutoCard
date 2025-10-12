'use client';

import { useState } from 'react';

interface CreateSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSet: (setData: { topic: string; prompt: string; difficulty: 'novice' | 'intermediate' | 'advanced'; cardCount: number }) => void;
}

export default function CreateSetModal({ isOpen, onClose, onCreateSet }: CreateSetModalProps) {
  const [formData, setFormData] = useState({
    topic: '',
    prompt: '',
    difficulty: 'novice' as 'novice' | 'intermediate' | 'advanced',
    cardCount: 10,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDifficultyChange = (difficulty: 'novice' | 'intermediate' | 'advanced') => {
    setFormData((prev) => ({ ...prev, difficulty }));
  };

  const handleCardCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setFormData(prev => ({ ...prev, cardCount: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.topic.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onCreateSet({
        topic: formData.topic.trim(),
        prompt: formData.prompt.trim(),
        difficulty: formData.difficulty,
        cardCount: 10,
      });
      
      // Reset form
      setFormData({ topic: '', prompt: '', difficulty: 'novice', cardCount: 10 });
      onClose();
    } catch (error) {
      console.error('Error creating set:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ topic: '', prompt: '', difficulty: 'novice', cardCount: 10 });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                Create New Set
              </h3>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="text-white hover:text-gray-200 transition-colors disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
                  Set Topic *
                </label>
                <input 
                  type="text" 
                  id="title"
                  name="title" 
                  value={formData.topic} 
                  onChange={handleChange}
                  placeholder="Enter set topic..."
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                />
              </div>
              
              <div>
                <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea 
                  id="description"
                  name="description" 
                  value={formData.prompt} 
                  onChange={handleChange}
                  placeholder="Describe what this set covers..."
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed" 
                />
              </div>
              {/* Difficulty Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Difficulty
              </label>
              <div className="flex gap-3">
                {(['novice', 'intermediate', 'advanced'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleDifficultyChange(level)}
                    className={`flex-1 py-2 rounded-lg font-medium border transition-all ${
                      formData.difficulty === level
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                    disabled={isSubmitting}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
            <div>
                  <label htmlFor="cardCount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Cards
                  </label>
                  <input
                    type="number"
                    id="cardCount"
                    name="cardCount"
                    value={formData.cardCount}
                    onChange={handleCardCountChange}
                    min={1}
                    max={50}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
            </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.topic.trim()}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  'Create Set'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
