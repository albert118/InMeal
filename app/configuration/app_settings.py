import os
from dotenv import load_dotenv


default_desc = """
Generative recipe images microservce 🤖

A simple REST Microservice abstracting the consumption of a 
generative model for images of a recipe. This provides stylistic 
representations of the recipe prompt and implements some 
prod-ready features.
"""


class AppSettings:
    def __init__(self):
        load_dotenv()
        self.title = 'Generative images microservce'
        self.description = str(os.environ.get('DESCRIPTION', default_desc))
        self.version = str(os.environ.get('APP_VERSION', '0.0.1'))

        self.api_port = int(os.environ.get('API_PORT', 7002))
        self.environment = bool(os.environ.get('ENVIRONMENT', 'development'))

        self.contact_details = {
            'name': 'Albert Ferguson 🤙',
            'email': 'albertferguson118@gmail.com'
        }

        self.license_info = {
            'name': 'MIT',
            "identifier": "MIT",
            'url': 'https://github.com/albert118/GenerativeRecipes/blob/master/LICENSE'
        }


    def is_development(self):
        return self.environment == 'development'