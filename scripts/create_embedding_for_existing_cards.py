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

# --- Process documents that don't have an embedding yet ---
for doc in collection.find({"card_embedding": {"$exists": False}}):
    try:
        # 1. Combine the text fields
        text_to_embed = (
            f"Genre: {doc.get('genre', '')}. "
            f"Question: {doc.get('question', '')}. "
            f"Answer: {doc.get('correctAnswer', '')}"
        )
        
        # 2. Generate the embedding using the Google model
        # Use 'RETRIEVAL_DOCUMENT' for the text you are storing
        response = genai.embed_content(
            model=EMBEDDING_MODEL,
            content=text_to_embed,
            task_type="RETRIEVAL_DOCUMENT" 
        )
        embedding_vector = response['embedding']
        
        # 3. Add the new field and update the document
        collection.update_one(
            {"_id": doc["_id"]},
            {"$set": {"card_embedding": embedding_vector}}
        )
        print(f"Successfully embedded card with _id: {doc['_id']}")

    except Exception as e:
        print(f"Error processing document {doc['_id']}: {e}")

print("Embedding generation complete.")