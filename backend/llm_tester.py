import google.generativeai as genai
import os

# Set up API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY")) 

# Initialize Gemini model (1.5 Flash is free and fast)
model = genai.GenerativeModel("models/gemini-1.5-flash-latest")

response = model.generate_content(
    """You're a motorsport expert with deep appreciation for driving skill, longevity, and adaptability.
Answer this like a real fan who knows why Fernando Alonso is the greatest of all time in Formula 1.
User: Who's the GOAT of F1?
Assistant:"""
)

# Send the promprint(response.text)

# Print the result
print(response.text)