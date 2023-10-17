from .ModelProvider import ModelProvider

class ModelOrchestrator:
    def __init__(self):
        self.model = ModelProvider().get_model()

    def orchestrate_response(self, prompt: str):
        return self.model.generate(prompt)
