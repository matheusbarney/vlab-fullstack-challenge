from abc import ABC, abstractmethod


class AIModel(ABC):
    @abstractmethod
    def chat(self, prompt: str) -> str:
        # Prompt IA -> Resposta IA
        pass
