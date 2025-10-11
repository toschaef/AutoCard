// components/CardListEditor.tsx

import { Card, CardSet } from '@/lib/types';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  cardSet: CardSet;
  setCardSet: Dispatch<SetStateAction<CardSet | null>>;
};

const CardListEditor = ({ cardSet, setCardSet }: Props) => {
  
  const handleCardChange = (cardId: number | string, updatedField: Partial<Card>) => {
    setCardSet((prev: CardSet | null) => {
      if (!prev) return null;
      const updatedCards = prev.cards.map((card: Card) => 
        card.id === cardId ? { ...card, ...updatedField } : card
      );
      return { ...prev, cards: updatedCards };
    });
  };

  const addCard = () => {
    const newCard: Card = {
      id: `new-${Date.now()}`, // Temporary ID, your backend should assign a real one
      question: '',
      correct_answer: '',
      incorrect_answers: [''],
    };
    setCardSet((prev: CardSet | null) => prev ? { ...prev, cards: [...prev.cards, newCard] } : null);
  };

  const deleteCard = (cardId: number | string) => {
    setCardSet((prev: CardSet | null) => {
      if (!prev) return null;
      const filteredCards = prev.cards.filter((card: Card) => card.id !== cardId);
      return { ...prev, cards: filteredCards };
    });
  };

  return (
    <div className="space-y-4">
      {cardSet.cards.map((card: Card, index: number) => (
        <div key={card.id} className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">Card #{index + 1}</h3>
            </div>
            <button 
              onClick={() => deleteCard(card.id)} 
              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors font-medium text-sm"
            >
              Delete
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Question
              </label>
              <textarea
                placeholder="Enter your question here..."
                value={card.question}
                onChange={(e) => handleCardChange(card.id, { question: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500 resize-none"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correct Answer
              </label>
              <input
                type="text"
                placeholder="Enter the correct answer..."
                value={card.correct_answer}
                onChange={(e) => handleCardChange(card.id, { correct_answer: e.target.value })}
                className="w-full px-4 py-3 border-2 border-green-300 bg-green-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 placeholder-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Incorrect Answers
              </label>
              <div className="space-y-2">
                {card.incorrect_answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Incorrect answer ${answerIndex + 1}...`}
                      value={answer}
                      onChange={(e) => {
                        const newAnswers = [...card.incorrect_answers];
                        newAnswers[answerIndex] = e.target.value;
                        handleCardChange(card.id, { incorrect_answers: newAnswers });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-gray-900 placeholder-gray-500"
                    />
                    {card.incorrect_answers.length > 1 && (
                      <button
                        onClick={() => {
                          const newAnswers = card.incorrect_answers.filter((_, idx) => idx !== answerIndex);
                          handleCardChange(card.id, { incorrect_answers: newAnswers });
                        }}
                        className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
                        title="Remove this incorrect answer"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newAnswers = [...card.incorrect_answers, ''];
                    handleCardChange(card.id, { incorrect_answers: newAnswers });
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  + Add another incorrect answer
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button 
        onClick={addCard} 
        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="font-semibold">Add New Card</span>
          <span className="text-sm">Click to create another flashcard</span>
        </div>
      </button>
    </div>
  );
};

export default CardListEditor;