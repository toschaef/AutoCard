// components/SetDetailsForm.tsx

import { CardSet } from '@/types/types';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  cardSet: CardSet;
  setCardSet: Dispatch<SetStateAction<CardSet | null>>;
  setIsSaved: Dispatch<SetStateAction<boolean>>;
};

const SetDetailsForm = ({ cardSet, setCardSet, setIsSaved }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardSet(prev => prev ? { ...prev, [name]: value } : null);
    setIsSaved(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Set Name
        </label>
        <input 
          type="text" 
          name="title" 
          value={cardSet.title} 
          onChange={handleChange}
          placeholder="Enter set name..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500" 
        />
      </div>
      
      <div>
        <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea 
          name="description" 
          value={cardSet.description} 
          onChange={handleChange}
          placeholder="Describe what this set covers..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500 resize-none" 
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Cards:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
              {cardSet.cards.length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Created:</span>
            <span className="text-gray-500">
              {new Date(cardSet.created).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetDetailsForm;