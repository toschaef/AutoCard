// app/set/[setId]/edit/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CardSet } from '@/types';
import SetDetailsForm from '@/components/SetDetailsForm';
import CardListEditor from '@/components/CardListEditor';
import ConfirmDialog from '@/components/ConfirmDialog';
import GenerateQuestionsModal from '@/components/GenerateQuestionsModal';
import { yourSets, exampleSets } from '@/lib/exampleSets';
import { useAppContext } from '@/Context';

// Mock function to simulate fetching data from an API
const fetchSetById = async (id: string): Promise<CardSet> => {
  console.log(`Fetching data for set: ${id}`);
  
  // Check localStorage for temporary sets first
  const tempSet = localStorage.getItem(`temp-set-${id}`);
  if (tempSet) {
    try {
      const parsed = JSON.parse(tempSet);
      return {
        ...parsed,
        created: new Date(parsed.created)
      };
    } catch (error) {
      console.error('Error parsing temp set:', error);
    }
  }
  
  // Combine all sets
  const allSets = [...yourSets, ...exampleSets];
  
  // Find the set by ID
  //const foundSet = allSets.find(set => set.id === id);
  
  // if (foundSet) {
  //   return foundSet;
  // }
  
  // If not found, return a default set
  return {
    title: 'Unknown Set',
    userId: '1', // Default to user 1
    description: 'This set was not found in the mock data.',
    created: new Date(),
    cards: ["f"]
  };
};

const addCard = () => {

}
const deleteCard = () => {

}
const updateCard = () => {

}

export default function EditSetPage() {
  const [cardSet, setCardSet] = useState<CardSet | null>(null);
  const [originalCardSet, setOriginalCardSet] = useState<CardSet | null>(null);
  const [isSaved, setIsSaved] = useState(true);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showPlayDialog, setShowPlayDialog] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { user } = useAppContext();

  // Redirect to welcome page if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    const setId = params.setId;
    if (typeof setId === 'string' && setId) {
      fetchSetById(setId).then(data => {
        setCardSet(data);
        setOriginalCardSet(JSON.parse(JSON.stringify(data)));
        setIsSaved(true);
      });
    }
  }, [params.setId]);

  // Track if changes were made
  useEffect(() => {
    if (cardSet && originalCardSet) {
      const hasChanges = JSON.stringify(cardSet) !== JSON.stringify(originalCardSet);
      setIsSaved(!hasChanges);
    }
  }, [cardSet, originalCardSet]);

  const handleSaveChanges = () => {
    if (!cardSet) return;
    
    // Save to localStorage
    localStorage.setItem(`temp-set-${cardSet.id}`, JSON.stringify(cardSet));
    
    // Update original to match current (mark as saved)
    setOriginalCardSet(JSON.parse(JSON.stringify(cardSet)));
    setIsSaved(true);
    
    // TODO: Send cardSet to API to save all changes
    console.log('Saving all changes:', cardSet);
  };

  const handleGoToDashboard = () => {
    if (!isSaved) {
      setShowExitDialog(true);
    } else {
      router.push('/dashboard');
    }
  };

  const handleConfirmExit = () => {
    handleSaveChanges();
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
      router.push(`/play/${cardSet?.id}`);
    }
  };

  const handleConfirmPlay = () => {
    handleSaveChanges();
    setShowPlayDialog(false);
    setTimeout(() => router.push(`/play/${cardSet?.id}`), 100);
  };

  const handleCancelPlay = () => {
    setShowPlayDialog(false);
    router.push(`/play/${cardSet?.id}`);
  };

  const handleGenerateQuestions = (settings: { topic: string; description: string; count: number }) => {
    // TODO: Call API to generate cards based on settings
    console.log('AI Generation settings:', settings);
    
    // Placeholder - will integrate API later
    alert(`Generation request saved: ${settings.count} questions about "${settings.topic}". API integration coming soon!`);
    
    // TODO: When API is ready:
    // 1. Send settings to API
    // 2. Receive generated cards JSON
    // 3. Add cards to cardSet
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

      <div className="container mx-auto max-w-6xl p-6">
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
                disabled={isSaved}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaved ? 'All Changes Saved' : 'Save All Changes'}
              </button>
            </div>

            {/* Generate Questions Button */}
            <div className="mt-3">
              <button
                onClick={() => setShowGenerateModal(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
                <CardListEditor 
                  cards={cardSet}
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