from .ModelProvider import ModelProvider
from pydantic import BaseModel, HttpUrl


class ImageResult(BaseModel):
    url: str
    name: str


class ModelOrchestrator:
    def __init__(self):
        self.model = ModelProvider().get_model()

    def orchestrate_response(self, prompt: str) -> ImageResult:
        return ImageResult(url=f"static/{self.model.generate(prompt)}", name='test image')
