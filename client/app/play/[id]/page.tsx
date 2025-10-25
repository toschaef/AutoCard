'use client';
import { getCardsFromSet } from '@/api/api';
import { Card } from '@/types/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import shuffle from 'shuffle-array';

export default function PlayPage() {
  const params = useParams();
  const setId = params.id as string;

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    getCardsFromSet(setId).then((data) => {
      setCards(shuffle(data.cards) || []);
    });
  }, [setId]);

  const handleGenerateCSV = () => {
    let csvContent = "\"Blooket" + '\n' + 
    "Import Template\",,,,,,,,,,,,,,,,,,,,,,,,," + '\n' +
    "Question #,Question Text,Answer 1,Answer 2,\"Answer 3" + '\n' +
    "(Optional)\",\"Answer 4" + '\n' +
    "(Optional)\",\"Time Limit (sec)" + '\n' +
    "(Max: 300 seconds)\",\"Correct Answer(s)" + '\n' +
    "(Only include Answer #)\",,,,,,,,,,,,,,,,,," + '\n';
    csvContent += cards.map((card, idx) => {
      let incorrectAnswersString = card.incorrectAnswers.map(ans => `${ans.replace(/,/g, '-')}`).join(',');
      console.log("Generating CSV - incorrectAnswersString before padding:", incorrectAnswersString);
      if (incorrectAnswersString.split(',').length < 4) {
        incorrectAnswersString += ','.repeat(4 - incorrectAnswersString.split(',').length);
      }

      if (incorrectAnswersString[incorrectAnswersString.length - 1] !== ',') {
        incorrectAnswersString += ',';
      }

      // replace all commas in question and answers with hyphens to avoid CSV issues
      return `${idx+1},"${card.question.replace(/,/g, '-').replace(/"/g, '\'').replace(/\n/g, ' ')}",${card.correctAnswer.replace(/,/g, '-').replace(/"/g, '\'').replace(/\n/g, ' ')},${incorrectAnswersString.replace(/"/g, '\'').replace(/\n/g, ' ')}20,1,,${card.incorrectAnswers.length === 0 || card.incorrectAnswers[0].length === 0 ? "typing" : ""},,,,,,,,,,,,,,,,` + '\n';
    }).join('');

    // replace all < with &lt; and > with &gt; to avoid CSV issues
    csvContent = csvContent.replace(/</g, '❮').replace(/>/g, '❯');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `blooket_set_${setId}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
 
  return (
    <div className='text-black'> 
      <h1 className="text-3xl font-bold mb-6">Play Set: {setId}</h1>
      <button onClick={handleGenerateCSV} className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>Generate Blooket CSV</button>
    </div>
  )
}
