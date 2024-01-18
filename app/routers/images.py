from ..infrastructure.ModelOrchestrator import ModelOrchestrator, ImageResult
from fastapi import APIRouter

router = APIRouter(
    prefix="/images",
    responses={404: {"description": "Not found"}},
    tags=['images']
)


@router.post('/')
def generate_image(prompt: str) -> ImageResult:
    '''Get a new image'''
    orchestrator = ModelOrchestrator()
    return orchestrator.orchestrate_response(prompt)
