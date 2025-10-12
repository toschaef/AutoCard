import os
import google.generativeai as genai
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv() 

# --- Configuration ---
# It's best to use environment variables for keys
MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = "study_materials"
COLLECTION_NAME = "cards"
GOOGLE_API_KEY = os.getenv("GOOGLE_GEN_AI_API_KEY")

# --- Initialize Clients ---
mongo_client = MongoClient(MONGO_URI)
db = mongo_client[DB_NAME]
collection = db[COLLECTION_NAME]

# Configure the Google AI client
genai.configure(api_key=GOOGLE_API_KEY)

# Define the model to use
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")

# --- 1. Define the source card's text to search for ---
source_card_text = "Genre: Advanced C++. Question: In C++, which mechanism is often used... Answer: SFINAE"

# --- 2. Generate the query vector using 'RETRIEVAL_QUERY' ---
response = genai.embed_content(
  model=EMBEDDING_MODEL,
  content=source_card_text,
  task_type="RETRIEVAL_QUERY" # <-- Use the query type here
)
source_vector = response['embedding']

# --- 3. Build and run the $vectorSearch pipeline ---
pipeline = [
  {
    "$vectorSearch": {
      "index": "find_similar_cards",
      "path": "card_embedding",
      "queryVector": source_vector,
      "numCandidates": 5,
      "limit": 2
  }
},
{
  "$project": {
      "_id": 0, # Exclude the ID
      "score": {"$meta": "vectorSearchScore"},
      "question": 1,
      "genre": 1,
      "correctAnswer": 1
    }
  }
]

similar_cards = list(collection.aggregate(pipeline))

for card in similar_cards:
  print(card)