// app/set/[setId]/edit/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardSet, Prompt } from '@/types/types';
import SetDetailsForm from '@/components/SetDetailsForm';
import CardListEditor from '@/components/CardListEditor';
import ConfirmDialog from '@/components/ConfirmDialog';
import GenerateQuestionsModal from '@/components/GenerateQuestionsModal';
import { createBatchOfCards, createCard, deleteCard, getCardsFromSet, getSetById, updateCard, updateSet } from '@/api/api';

export default function EditSetPage() {
  const [cardSet, setCardSet] = useState<CardSet | null>(null);
  const [originalCards, setOriginalCards] = useState<Card[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [AIGeneratedCards, setAIGeneratedCards] = useState<Card[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState(true);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showPlayDialog, setShowPlayDialog] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const params = useParams();
  const router = useRouter();
  
  // Fetch set data
  useEffect(() => {
    const setId = params.setId;
    if (typeof setId === 'string' && setId) {
      getSetById(setId).then(data => {
        console.log("data", data);
        setCardSet(data);
        setIsSaved(true);
      });
      getCardsFromSet(setId).then(data => {
        setCards(data.cards || []);
        setOriginalCards(data.cards || []);
      });
    }

  }, [params.setId]);

  const handleSetSaveChanges = async () => {
    // Save set details 
    if (!cardSet) return;
    updateSet(cardSet._id, cardSet).then(() => {
      setIsSaved(true);
    });

    // Save each card if changed
    cards.forEach(card => {
      const originalCard = originalCards.find(c => c._id === card._id);
      if (originalCard) {
        // If any field has changed, update the card
        if (card.question !== originalCard.question ||
            card.correctAnswer !== originalCard.correctAnswer ||
            JSON.stringify(card.incorrectAnswers) !== JSON.stringify(originalCard.incorrectAnswers) ||
            card.difficulty !== originalCard.difficulty) {
          updateCard(card._id, card).then(() => {
            // Update originalCards state
            setOriginalCards(prevOriginals => prevOriginals.map(c => c._id === card._id ? card : c));
          });
        }
      } 
    });
  };

  const handleGoToDashboard = () => {
    if (!isSaved) {
      setShowExitDialog(true);
    } else {
      router.push('/dashboard');
    }
  };

  const handleConfirmExit = () => {
    handleSetSaveChanges();
    setShowExitDialog(false);
    setTimeout(() => router.push('/dashboard'), 100);
  };

  const handleCancelExit = () => {
    setShowExitDialog(false);
    router.push('/dashboard');
  };

  const handlePlaySet = () => {
    if (!isSaved) {
      setShowPlayDialog(true);
    } else {
      router.push(`/play/${cardSet?._id}`);
    }
  };

  const handleConfirmPlay = () => {
    handleSetSaveChanges();
    setShowPlayDialog(false);
    setTimeout(() => router.push(`/play/${cardSet?._id}`), 100);
  };

  const handleCancelPlay = () => {
    setShowPlayDialog(false);
    router.push(`/play/${cardSet?._id}`);
  };

  // Card management functions
  const handleAddCard = async (newCard: Partial<Card>) => {
    // Create card
    createCard(newCard).then((createdCard) => {
      setCards((prevCards) => [...prevCards, createdCard]);
      // Also update the cardSet's cards array
      if (cardSet) {
        setCardSet({
          ...cardSet,
          cards: [...cardSet.cards, createdCard._id],
        });
      }

      // Add to originalCards for change tracking
      setOriginalCards((prevOriginals) => [...prevOriginals, createdCard]);
    });

    // Add card to current set
    updateSet(cardSet!._id, {
      ...cardSet!,
      cards: [...cardSet!.cards, newCard._id!],
    });
  };

  const handleDeleteCard = async (cardId: string) => {
    // Delete card
    deleteCard(cardId).then(() => {
      setCards((prevCards) => prevCards.filter(card => card._id !== cardId));
    });

    // Also update the cardSet's cards array
    if (cardSet) {
      setCardSet({
        ...cardSet,
        cards: cardSet.cards.filter(id => id !== cardId),
      });
    }

    // Remove from originalCards for change tracking
    setOriginalCards((prevOriginals) => prevOriginals.filter(card => card._id !== cardId));
  };

  const handleUpdateCard = async (updatedCard: Partial<Card>) => {
    // Update card 
    setCards((prevCards) => prevCards.map(card => card._id === updatedCard._id ? { ...card, ...updatedCard } : card));
    setIsSaved(false);
  };

  const handleGenerateQuestions = async (prompt: Partial<Prompt>) => {
    setIsGenerating(true);
    createBatchOfCards(prompt).then((generatedCards) => {
      console.log("Generated Cards:", generatedCards);
      // sort cards by genre
      generatedCards.cards.sort((a: Card, b: Card) => {
        if (a.genre < b.genre) return -1;
        if (a.genre > b.genre) return 1;
        return 0;
      });
      setAIGeneratedCards(generatedCards.cards);
      setIsGenerating(false);
    });
  };

  const addAICardToSet = async (aiCard: Partial<Card>) => {
    // Create card in DB
    createCard(aiCard).then((createdCard) => {
      // Add to current cards
      setCards((prevCards) => [...prevCards, createdCard]);

      // Remove from AIGeneratedCards
      setAIGeneratedCards((prevAICards) => prevAICards.filter(card => card.question !== aiCard.question));

      // Also update the cardSet's cards array
      if (cardSet) {
        setCardSet({
          ...cardSet,
          cards: [...cardSet.cards, createdCard._id],
        });
      }

      // Add to originalCards for change tracking
      setOriginalCards((prevOriginals) => [...prevOriginals, createdCard]);

      // Set unsaved changes
      setIsSaved(false);
    });
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

  async function handleAddAllAICardsToSet(event: React.FormEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();

    if (AIGeneratedCards.length === 0) return;
    setIsGenerating(true);

    try {
      // Create all AI cards in parallel
      const createdCards = await Promise.all(
        AIGeneratedCards.map((aiCard) => createCard(aiCard))
      );

      // Add created cards to current cards and originalCards (for change tracking)
      setCards((prev) => [...prev, ...createdCards]);
      setOriginalCards((prev) => [...prev, ...createdCards]);

      // Update cardSet locally and persist updated card IDs
      if (cardSet) {
        const newCardIds = createdCards.map((c) => c._id);
        const updatedSet = { ...cardSet, cards: [...cardSet.cards, ...newCardIds] };
        setCardSet(updatedSet);

        // Persist the set update
        try {
          await updateSet(updatedSet._id, updatedSet);
        } catch (err) {
          console.error('Failed to update set with new AI cards', err);
        }
      }

      // Clear AI generated pool and mark as unsaved
      setAIGeneratedCards([]);
      setIsSaved(false);
    } catch (err) {
      console.error('Error adding AI generated cards to set', err);
    } finally {
      setIsGenerating(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - sticky */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root{
                --green:#283618; --olive:#606c38; --cream:#fefae0; --amber:#dda15e; --burnt:#bc6c25;
              }
            `,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: AutoCard branding (clickable with save prompt) */}
            <button
              onClick={handleGoToDashboard}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div
                className="h-10 w-6 rounded-md shadow"
                style={{ backgroundColor: "var(--green)" }}
                aria-label="AutoCard logo"
              />
              <span className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--green)" }}>
                AutoCard
              </span>
            </button>
            
            {/* Right: Save status indicator */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${isSaved ? 'text-green-600' : 'text-red-600'}`}>
                {isSaved ? 'All changes saved' : 'Unsaved changes'}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-8xl p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Card Set</h1>
          <p className="text-gray-600">Manage your flashcard set details and content</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          {/* Left Column - Set Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Set Information</h2>
              <SetDetailsForm cardSet={cardSet} setCardSet={setCardSet} setIsSaved={setIsSaved} />
            </div>

            
            {/* Save Button */}
            <div className="mt-6">
              <button
                onClick={handleSetSaveChanges}
                disabled={isSaved}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaved ? 'All Changes Saved' : 'Save All Changes'}
              </button>
            </div>

            {/* Generate Questions Button */}
            <div className="mt-3">
              {/* Make it out of focus when generating */}
              <button
                onClick={() => setShowGenerateModal(true)}
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isGenerating}
              >
                Generate Questions with AI
              </button>
            </div>

            {/* Play Button */}
            <div className="mt-3">
              <button
                onClick={handlePlaySet}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Play This Set
              </button>
            </div>

            {/* AI Generated Cards */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-yellow-900 mb-3">AI Generated Cards</h2>
              {AIGeneratedCards.length === 0 ? (
                <p className="text-yellow-800">No AI generated cards yet. Use the button above to generate some!</p>
              ) : (
                <ul className="space-y-2 max-h-96 overflow-y-auto">
                  <li className="text-sm text-gray-500">
                    <button onClick={handleAddAllAICardsToSet} className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-1 px-3 rounded-lg transition-colors duration-200">Add all cards to set</button>
                  </li>
                  {AIGeneratedCards.map((card, idx) => (
                    // Add a genre header for each unique genre and group cards under it
                    <li key={card._id}>
                      {idx === 0 || (idx !== 0 && card.genre !== AIGeneratedCards[idx - 1].genre) ? (
                        <li key={card.genre} className="mt-4 mb-2">
                          <h3 className="text-4xl font-bold text-yellow-900 border-b border-yellow-300 pb-1 text-center">{card.genre}</h3>
                        </li>
                      ) : null}
                      <li key={idx} className="bg-yellow-100 border border-yellow-300 rounded-md p-3">
                        <p className="font-medium text-yellow-900">Q: {card.question}</p>
                        <p className="text-yellow-800 mt-1">✓ A: {card.correctAnswer}</p>
                        <button
                          onClick={() => addAICardToSet(card)}
                          className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-1 px-3 rounded-lg transition-colors duration-200"
                        >
                          Add to Set
                        </button>
                      </li>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Cards ({cardSet && cardSet.cards ? cardSet.cards.length : ''})</h2>
                <p className="text-gray-600 mt-1">Add and edit flashcards for this set</p>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto p-6">
                <CardListEditor 
                  cards={cards}
                  onAddCard={handleAddCard}
                  onDeleteCard={handleDeleteCard}
                  onCardChange={handleUpdateCard}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showExitDialog}
        title="Save changes before leaving?"
        message="You have unsaved changes. Would you like to save them before going to the dashboard?"
        confirmLabel="Yes, Save"
        cancelLabel="No, Discard"
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />

      {/* Play Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showPlayDialog}
        title="Save changes before playing?"
        message="You have unsaved changes. Would you like to save them before playing this set?"
        confirmLabel="Yes, Save"
        cancelLabel="No, Play Anyway"
        onConfirm={handleConfirmPlay}
        onCancel={handleCancelPlay}
      />

      {/* Generate Questions Modal */}
      <GenerateQuestionsModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onGenerate={handleGenerateQuestions}
      />
    </div>
  );
}