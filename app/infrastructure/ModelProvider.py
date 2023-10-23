import random

class FakeModel:
    def __init__(self):
        self.image_sources = [
            'butter-chicken.jpg',
            'chole-recipe.jpg',
            'chorizo-mozarella-gnocchi-bake.jpg',
            'crepes.jpg',
            'homemade-pizza.jpg',
            'korean-bibimbap-flatlay.jpeg',
            'stir-fry.jpg'
        ]

    # returns a filename
    def generate(self, prompt: str) -> str:
        return random.choice(self.image_sources) 


class ModelProvider:
    def __init__(self):
        self.model = FakeModel()

    def get_model(self):
        return self.model
