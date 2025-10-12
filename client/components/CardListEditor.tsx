// components/CardListEditor.tsx

import { Card } from '@/types/types';

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
      correctAnswer: '',
      incorrectAnswers: [''],
      genre: 'General', // Add defaults for new properties
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
            <h3 className="font-bold text-lg">Card #{index + 1}</h3>
            <button onClick={() => onDeleteCard(card.id)} className="text-red-500 font-semibold">Delete</button>
          </div>
          <div className="space-y-2">
            <textarea
              placeholder="Question"
              value={card.question}
              onChange={(e) => handleCardChange(card.id, { question: e.target.value })}
              className="w-full rounded-md border p-2"
            />
            {/* ... other input fields ... */}
          </div>
        </div>
      ))}
      <button onClick={addNewCard} className="w-full cursor-pointer rounded-md border-2 border-dashed p-3 text-gray-500">
        + Add New Card
      </button>
    </div>
  );
};

export default CardListEditor;