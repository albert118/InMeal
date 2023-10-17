class FakeModel:
    def __init__(self):
        pass

    def generate(self, prompt: str):
        return f'generated - {prompt}!'


class ModelProvider:
    def __init__(self):
        self.model = FakeModel()

    def get_model(self):
        return self.model
