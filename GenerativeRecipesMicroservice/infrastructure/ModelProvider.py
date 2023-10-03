class ModelProvider:
    def __init__(self):
        self._load_model()
        self._load_config()

    def do_thing(self) -> str:
        return 'did thing'

    def _load_model(self):
        pass

    def _load_config(self):
        pass
