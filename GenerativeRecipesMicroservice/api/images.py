from flask_injector import inject
from infrastructure.ModelProvider import ModelProvider

@inject
def generate_image(payload):
    model_provider = ModelProvider()
    return model_provider.do_thing()