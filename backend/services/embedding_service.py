import cohere
from langchain_core.embeddings import Embeddings
from backend.core.config import settings

class CohereEmbeddings(Embeddings):
    def __init__(self, model_name="embed-english-v3.0"):
        if not settings.COHERE_API_KEY:
            raise ValueError("COHERE_API_KEY not found in environment variables")
        self.client = cohere.Client(settings.COHERE_API_KEY)
        self.model_name = model_name
        
    def embed_documents(self, texts):
        try:
            if not texts:
                return []
                
            response = self.client.embed(
                texts=texts,
                model=self.model_name,
                input_type="search_document"
            )
            return response.embeddings
        except Exception as e:
            print(f"Error generating embeddings: {str(e)}")
            raise

    def embed_query(self, text):
        try:
            response = self.client.embed(
                texts=[text],
                model=self.model_name,
                input_type="search_query"
            )
            return response.embeddings[0]
        except Exception as e:
            print(f"Error generating query embedding: {str(e)}")
            raise
