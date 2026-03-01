from ai.base import AIModel
from pathlib import Path
import google.genai as genai

SYSTEM_PROMPT_PATH = Path(__file__).parent / "system_prompt.md"


class GeminiFlash(AIModel):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.system_prompt_template = SYSTEM_PROMPT_PATH.read_text(encoding="utf-8")
        self.client = genai.Client(api_key=self.api_key)

    def chat(self, prompt_title: str, prompt_type: str) -> str:
        prompt = self.system_prompt_template.format(
            titulo=prompt_title, tipo=prompt_type
        )
        response = self.client.models.generate_content(
            model="gemini-3-flash-preview", contents=prompt
        )
        return response.text
