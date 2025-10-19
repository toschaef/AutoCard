import { Request, Response } from 'express';
import { questionsFromCustomPrompt, questionsFromCustomPromptAndDocument } from '../middleware/final';

// Get all cards from a specific set
export const createBatchOfCards = async (req: Request, res: Response) => {
  try {
    const { prompt, genre, numProblemsPerGenre, difficulty } = req.body;
    const response = await questionsFromCustomPrompt(prompt, genre, numProblemsPerGenre, difficulty);
    res.status(200).json(response);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createBatchOfCardsFromFile = async (req: Request, res: Response) => {
  try {
    // Text fields are still in req.body
    const { prompt, numProblemsPerGenre, difficulty } = req.body;
    
    // The file is now available on req.file, thanks to multer
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // 1. Convert the file's buffer to a Base64 string
    const base64Data = req.file.buffer.toString('base64');

    // 2. Get the file's MIME type (e.g., 'application/pdf')
    const mimeType = req.file.mimetype;

    // 3. Create the file payload object that your service function expects
    const filePayload = {
      data: base64Data,
      mimeType: mimeType
    };

    // Pass the prompt details and the newly created file payload
    const response = await questionsFromCustomPromptAndDocument(
      prompt,
      numProblemsPerGenre,
      difficulty,
      filePayload
    );
    res.status(200).json(response);

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
}