from ai.base import AIModel
import google.genai as genai

class GeminiFlash(AIModel):
    def __init__(self, api_key: str, system_prompt: str = None):
        self.api_key = api_key
        self.system_prompt = system_prompt
        self.client = genai.Client(api_key=self.api_key)
    
    def chat(self, prompt: str) -> str:
        full_prompt = f"{self.system_prompt}\n{prompt}" if self.system_prompt else prompt
        response = self.client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=full_prompt
        )
        return response.text