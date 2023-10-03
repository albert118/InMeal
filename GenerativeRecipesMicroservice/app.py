import os
import connexion
from connexion.resolver import RestyResolver
from flask_injector import FlaskInjector
from dotenv import load_dotenv
from infrastructure.ModelProvider import ModelProvider

class AppSettings:
    def __init__(self):
        load_dotenv()
        self.api_port = int(os.environ.get('API_PORT', 7002))

def configure_modules(binder):
    binder.bind(
        ModelProvider
    )

def setup_swagger(app):
    app.add_api('images-service-docs.yaml', resolver=RestyResolver('api'))

if __name__ == '__main__':
    app_settings = AppSettings()
    
    app = connexion.App(__name__, specification_dir='swagger/')
    
    setup_swagger(app)
    
    FlaskInjector(app=app.app, modules=[configure_modules])
    
    app.run(port=app_settings.api_port)