import google.generativeai as genai
from langchain_core.language_models import BaseLLM
from langchain_core.outputs import Generation, LLMResult
from backend.core.config import settings

class GeminiLLM(BaseLLM):
    def __init__(self):
        super().__init__()
        if not settings.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        genai.configure(api_key=settings.GEMINI_API_KEY)

    def _call(self, prompt: str, stop=None, **kwargs):
        return self._generate([prompt], stop=stop, **kwargs).generations[0][0].text

    def _generate(self, prompts, stop=None, **kwargs):
        generations = []
        for prompt in prompts:
            try:
                model = genai.GenerativeModel('gemini-2.5-flash')
                response = model.generate_content(prompt)
                generations.append([Generation(text=response.text)])
            except Exception as e:
                print(f"Error in Gemini LLM call: {str(e)}")
                raise
                
        return LLMResult(generations=generations)

    @property
    def _llm_type(self) -> str:
        return "gemini-2.5-flash"
        
    @property
    def _identifying_params(self) -> dict:
        return {"model_name": "gemini-2.5-flash"}
