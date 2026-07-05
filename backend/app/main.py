from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.hook import router as hook_router

app = FastAPI(
    title="Shorts Hook Engine",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hook_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Shorts Hook Engine 🚀"
    }