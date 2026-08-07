from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter(
    prefix="/feedback",
    tags=["Feedback"]
)

# Supabase credentials from .env
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

print("SUPABASE URL:", repr(SUPABASE_URL))

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise RuntimeError("Supabase environment variables are missing")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY
)


class FeedbackRequest(BaseModel):
    rating: int
    feedback: str
    topic: str
    language: str


@router.post("/")
def save_feedback(data: FeedbackRequest):
    try:

        feedback_data = {
            "rating": data.rating,
            "feedback": data.feedback,
            "topic": data.topic,
            "language": data.language
        }

        response = (
            supabase
            .table("feedback")
            .insert(feedback_data)
            .execute()
        )

        return {
            "success": True,
            "message": "Feedback saved successfully",
            "data": response.data
        }

    except Exception as e:
        print("Supabase feedback error:", e)

        raise HTTPException(
            status_code=500,
            detail="Could not save feedback"
        )