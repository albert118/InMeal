from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from .routers import images, test
from .configuration import app_settings


settings = app_settings.AppSettings()

app = FastAPI(
    title=settings.title,
    description=settings.description,
    version=settings.version,
    contact=settings.contact_details,
    license_info=settings.license_info,
    redoc_url=None,
    debug=settings.is_development
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(images.router)
app.include_router(test.router)
