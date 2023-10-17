from fastapi import FastAPI

from .routers import images, test

description = """
Generative recipe images microservce 🤖

A simple REST Microservice abstracting the consumption of a 
generative model for images of a recipe. This provides stylistic 
representations of the recipe prompt and implements some 
prod-ready features.
"""

app = FastAPI(
    title='Generative images microservce',
    description=description,
    version='0.0.1',
    contact={
        'name': 'Albert Ferguson 🤙',
        'email': 'albertferguson118@gmail.com'
    },
    license_info={
        'name': 'MIT 📜',
        "identifier": "MIT",
        'url': 'https://github.com/albert118/GenerativeRecipes/blob/master/LICENSE'
    },
    redoc_url=None
)

app.include_router(images.router)
app.include_router(test.router)
