// app/set/[setId]/edit/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CardSet } from '@/types';
import SetDetailsForm from '@/components/SetDetailsForm';
import CardListEditor from '@/components/CardListEditor';

// Mock function to simulate fetching data from an API
const fetchSetById = async (id: string): Promise<CardSet> => {
  console.log(`Fetching data for set: ${id}`);
  return {
    id: 'history-101',
    title: 'American Revolution',
    topic: 'Key events and figures from 1765 to 1783.',
    created: new Date(),
    cards: [
      { id: 'c1', question: 'What year did the Boston Tea Party happen?', correct_answer: '1773', incorrect_answers: ['1770', '1775'] },
      { id: 'c2', question: 'Who was the primary author of the Declaration of Independence?', correct_answer: 'Thomas Jefferson', incorrect_answers: ['George Washington', 'John Adams'] },
    ],
  };
};

export default function EditSetPage() {
  const [cardSet, setCardSet] = useState<CardSet | null>(null);
  const params = useParams();

  useEffect(() => {
    const setId = params.setId;
    if (typeof setId === 'string' && setId) {
      fetchSetById(setId).then(data => {
        setCardSet(data);
      });
    }
  }, [params.setId]);

  const handleSaveChanges = () => {
    // Here you would send the 'cardSet' object to your API to save all changes
    console.log('Saving all changes:', cardSet);
    alert('Set and all cards saved to the console!');
  };

  if (!cardSet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading set...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-6xl p-6 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Card Set</h1>
          <p className="text-gray-600">Manage your flashcard set details and content</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Left Column - Set Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Set Information</h2>
              <SetDetailsForm cardSet={cardSet} setCardSet={setCardSet} />
            </div>
            
            {/* Save Button */}
            <div className="mt-6">
              <button
                onClick={handleSaveChanges}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Save All Changes
              </button>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Cards ({cardSet.cards.length})</h2>
                <p className="text-gray-600 mt-1">Add and edit flashcards for this set</p>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto p-6">
                  <CardListEditor cardSet={cardSet} setCardSet={setCardSet} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}