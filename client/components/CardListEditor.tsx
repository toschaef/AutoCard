// components/CardListEditor.tsx

import { Card } from '../lib/types';

type Props = {
  cards: Card[]; 
  onAddCard: (newCard: Card) => void;
  onDeleteCard: (cardId: string) => void;
  onCardChange: (updatedCard: Card) => void;
};

const CardListEditor = ({ cards, onAddCard, onDeleteCard, onCardChange }: Props) => {
  
  const handleCardChange = (cardId: string, updatedField: Partial<Card>) => {
    const originalCard = cards.find(c => c.id === cardId);
    if (originalCard) {
      onCardChange({ ...originalCard, ...updatedField });
    }
  };

  const addNewCard = () => {
    const newCard: Card = {
      id: `new-${Date.now()}`,
      question: '',
      correct_answer: '',
      incorrect_answers: ['', '', ''],
      difficulty: 'medium'
    };
    onAddCard(newCard);
  };
  
  return (
    <div className="space-y-4">
      {/* ✅ This map will now work correctly */}
      {cards.map((card, index) => (
        <div key={card.id} className="rounded-lg border bg-gray-50 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-black">Card #{index + 1}</h3>
            <button onClick={() => onDeleteCard(card.id)} className="text-red-500 font-semibold">Delete</button>
          </div>
          <div className="space-y-3">
            {/* Question */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Question
              </label>
              <textarea
                placeholder="Enter your question here..."
                value={card.question}
                onChange={(e) => handleCardChange(card.id, { question: e.target.value })}
                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black placeholder:text-gray-500"
                rows={2}
              />
            </div>

            {/* Correct Answer */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                ✓ Correct Answer
              </label>
              <input
                type="text"
                placeholder="Enter the correct answer..."
                value={card.correct_answer}
                onChange={(e) => handleCardChange(card.id, { correct_answer: e.target.value })}
                className="w-full rounded-md border border-green-300 bg-green-50 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder:text-gray-500"
              />
            </div>

            {/* Incorrect Answers */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                ✗ Incorrect Answers
              </label>
              <div className="space-y-2">
                {card.incorrect_answers.map((answer, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Incorrect answer #${idx + 1}...`}
                    value={answer}
                    onChange={(e) => {
                      const newIncorrect = [...card.incorrect_answers];
                      newIncorrect[idx] = e.target.value;
                      handleCardChange(card.id, { incorrect_answers: newIncorrect });
                    }}
                    className="w-full rounded-md border border-red-300 bg-red-50 p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent text-black placeholder:text-gray-500"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={addNewCard} className="w-full cursor-pointer rounded-md border-2 border-dashed p-3 text-black hover:bg-gray-50 transition-colors">
        + Add New Card
      </button>
    </div>
  );
};

export default CardListEditor;