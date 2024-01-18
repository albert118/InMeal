from fastapi import APIRouter

router = APIRouter(
    prefix="/test",
    responses={404: {"description": "Not found"}},
    tags=['test']
)

@router.get('/ping')
def ping_pong():
    return 'pong'