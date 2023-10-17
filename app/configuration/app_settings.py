import os
from dotenv import load_dotenv

class AppSettings:
    def __init__(self):
        load_dotenv()
        self.api_port = int(os.environ.get('API_PORT', 7002))
        self.environment = bool(os.environ.get('ENVIRONMENT', 'development'))

    def is_development(self):
        return self.environment == 'development'