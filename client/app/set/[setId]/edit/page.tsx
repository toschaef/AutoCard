// app/set/[setId]/edit/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CardSet, Card } from '@/types/types'; // Import Card type
import SetDetailsForm from '@/components/SetDetailsForm';
import CardListEditor from '@/components/CardListEditor';
import { yourSets, allCards } from '@/lib/mockData'; // Import allCards

// Mock function now returns both the set and its corresponding card objects
const fetchSetAndCards = async (id: string): Promise<{ set: CardSet; cards: Card[] }> => {
  console.log(`Fetching data for set: ${id}`);
  const foundSet = yourSets.find(set => set.id === id);

  if (foundSet) {
    // Find all card objects that match the IDs in the set
    const cardsForSet = allCards.filter(card => foundSet.cardIds.includes(card.id));
    return { set: foundSet, cards: cardsForSet };
  }

  // Fallback if the set is not found
  return {
    set: { id: id, title: 'Unknown Set', description: 'Set not found.', userId: '1', created: new Date(), cardIds: [] },
    cards: []
  };
};

export default function EditSetPage() {
  // ✅ Manage two separate states
  const [cardSet, setCardSet] = useState<CardSet | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const params = useParams();

  useEffect(() => {
    const setId = params.setId;
    if (typeof setId === 'string' && setId) {
      fetchSetAndCards(setId).then(data => {
        setCardSet(data.set);
        setCards(data.cards);
      });
    }
  }, [params.setId]);

  // ✅ Define the handler functions
  const addCard = (newCard: Card) => {
    setCards(prev => [...prev, newCard]);
    setCardSet(prev => prev ? { ...prev, cardIds: [...prev.cardIds, newCard.id] } : null);
  };

  const deleteCard = (cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    setCardSet(prev => prev ? { ...prev, cardIds: prev.cardIds.filter(id => id !== cardId) } : null);
  };
  
  const updateCard = (updatedCard: Card) => {
    setCards(prev => prev.map(c => c.id === updatedCard.id ? updatedCard : c));
  };

  const handleSaveChanges = () => {
    console.log('Saving Set:', cardSet);
    console.log('Saving Cards:', cards);
    alert('Changes saved to the console!');
  };

  if (!cardSet) {
    // Your loading spinner component is fine
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
      <div className="container mx-auto max-w-6xl p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Card Set</h1>
          <p className="text-gray-600">Manage your flashcard set details and content</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Set Information</h2>
              <SetDetailsForm cardSet={cardSet} setCardSet={setCardSet} />
            </div>
            <div className="mt-6">
              <button
                onClick={handleSaveChanges}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                Save All Changes
              </button>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                {/* ✅ Use cardIds.length for the count */}
                <h2 className="text-xl font-semibold text-gray-900">Cards ({cardSet.cardIds.length})</h2>
                <p className="text-gray-600 mt-1">Add and edit flashcards for this set</p>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {/* ✅ Pass the correct state and handler functions */}
                <CardListEditor 
                  cards={cards}
                  onAddCard={addCard}
                  onDeleteCard={deleteCard}
                  onCardChange={updateCard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}