import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
const model = "gemini-2.5-flash"; // or "gemini-2.5-pro"
const examplePrompt = "Generate a set of flashcards to help me learn C++";
const exampleNumProblemsPerGenre = 5;
const exampleSpecificGenre = "std::set in C++";
const exampleDifficulty = "advanced"; // can be "novice", "intermediate", or "advanced", or null

export async function getGenresFromPrompt(prompt: string, numProblemsPerGenre: number | null) {
  const getGenresPrompt = `You are AutoCardAI, an AI assistant used to create multiple-choice problems to help students with their studies. Before generating those problems, you will generate a set of genres to help categorize the problems and then describe the problems you can create in every genre. For the following prompt, generate one line of text that describes the list of genres to help categorize the problems. After that, describe at least ${numProblemsPerGenre} problems you can create for every genre: ${prompt}`;
  const response = await ai.models.generateContent({
    model: model,
    contents: getGenresPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          listAndDescriptionOfGenres: {
            type: Type.STRING
          },
        }
      },
    },
  });
  // see how many tokens were used:
  console.log("Tokens used to generate genres and descriptions:", response.usageMetadata);
    return response;
}

export async function questionsFromCustomPrompt(prompt: string, specificGenre: string | null, numProblemsPerGenre: number | null, difficulty: string | null) {
  let genresDescription = '';
  if (!specificGenre) {
    await getGenresFromPrompt(prompt, numProblemsPerGenre).then((response) => {
      if (response.text) {
        genresDescription = JSON.parse(response.text).listAndDescriptionOfGenres;
        // console.log("Genres and descriptions generated:\n", genresDescription);
      }}).catch((error) => {
        console.error("Error generating genres and descriptions:", error);
      });
  }
  const customPrompt = `You are AutoCardAI, an AI assistant used to create multiple-choice problems to help students with their studies. You will generate problems that fall under 3 types: Multiple choice (1 right, 3 wrong), True/False (True or False), or Fill in the Blank. Every question will each have a difficulty rating [novice, intermediate, advance] (novice should be simple, intermediate should require a bit of background knowledge to know, advance should be challenging even for experienced individuals), a right answer, and three incorrect answers that are similar in length to the correct answer. The True/False questions will have a statement and the student must choose whether it is true or false (incorrect answers will only have one entry). The Fill in the Blank questions will have a sentence with a missing word or phrase, shown as _______ and incorrect answers will be empty, and the student must provide the correct answer and the answer should be very easy to type and simple. The following is the prompt from the student: ${prompt}. ${specificGenre ? `A previous AI model has generated the following genre and description of problems you can create: ${specificGenre}.` : genresDescription} You should create ${numProblemsPerGenre} problems for every listed genre. ${difficulty ? `All problems should be of ${difficulty} difficulty.` : ''}.`;
  const response = await ai.models.generateContent({
    model: model,
    contents: customPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING
          },
          description: {
            type: Type.STRING
          },
          cards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                index: {
                  type: Type.INTEGER
                },
                genre: {
                  type: Type.STRING,
                  // if specificGenre is provided, set enum to [specificGenre], else leave it open
                  enum: specificGenre ? [specificGenre] : undefined
                },
                question: {
                  type: Type.STRING,
                },
                correctAnswer: {
                  type: Type.STRING,
                },
                incorrectAnswers: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                },
                difficulty: {
                  type: Type.STRING,
                  enum: difficulty ? difficulty : ["novice", "intermediate", "advanced"],
                },
              },
              propertyOrdering: ["index", "genre", "question", "correctAnswer", "incorrectAnswers"],
            },
          },
        },
        propertyOrdering: ["title", "description", "cards"],
      },
    },
  });
  // see how many tokens were used:
  console.log("Tokens used to generate questions:", response.usageMetadata);

  if (response.text) {
    // print out the response as a parsed JSON object including arrays:
    const jsonResponse = JSON.parse(response.text);
    // console.log(JSON.stringify(jsonResponse, null, 2));
    return jsonResponse;
  }
  return null;
}


export async function questionsFromCustomPromptAndDocument(prompt: string, numProblemsPerGenre: number | null, difficulty: string | null, file: { data: string; mimeType: string; }) {

  const customPrompt = `You are AutoCardAI, an AI assistant used to create multiple-choice problems to help students with their studies. You will generate problems that fall under 3 types: Multiple choice (1 right, 3 wrong), True/False (True or False), or Fill in the Blank. Every question will each have a difficulty rating [novice, intermediate, advance] (novice should be simple, intermediate should require a bit of background knowledge to know, advance should be challenging even for experienced individuals), a right answer, and three incorrect answers. The True/False questions will have a statement and the student must choose whether it is true or false (incorrect answers will only have one entry). The Fill in the Blank questions will have a sentence with a missing word or phrase (incorrect answers will be empty), and the student must provide the correct answer and the answer should be very easy to type and simple. The following is the prompt from the student: ${prompt}. You should create ${numProblemsPerGenre} problems. ${difficulty ? `All problems should be of ${difficulty} difficulty. Additionally, a file was uploaded by the student, base your response on the content of the file.` : ''}.`;

  const contentParts = [
    {"text": customPrompt}, 
    {
      "inlineData": {
        data: file.data,
        mimeType: file.mimeType,
      }
    }
  ];

  const response = await ai.models.generateContent({
    model: model,
    contents: contentParts,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING
          },
          description: {
            type: Type.STRING
          },
          cards: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                index: {
                  type: Type.INTEGER
                },
                genre: {
                  type: Type.STRING,
                },
                question: {
                  type: Type.STRING,
                },
                correctAnswer: {
                  type: Type.STRING,
                },
                incorrectAnswers: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                },
                difficulty: {
                  type: Type.STRING,
                  enum: difficulty ? difficulty : ["novice", "intermediate", "advanced"],
                },
              },
              propertyOrdering: ["index", "genre", "question", "correctAnswer", "incorrectAnswers"],
            },
          },
        },
        propertyOrdering: ["title", "description", "cards"],
      },
    },
  });
  if (response.text) {
    // print out the response as a parsed JSON object including arrays:
    const jsonResponse = JSON.parse(response.text);
    console.log(JSON.stringify(jsonResponse, null, 2));
    return jsonResponse;
  }
  return null;
}


// Example usage:
// questionsFromCustomPrompt(examplePrompt, exampleSpecificGenre, exampleNumProblemsPerGenre, exampleDifficulty);