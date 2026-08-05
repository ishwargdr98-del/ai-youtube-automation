from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
import csv
import os

router = APIRouter(
    prefix="/feedback",
    tags=["Feedback"]
)


class FeedbackRequest(BaseModel):
    rating: int
    feedback: str
    topic: str
    language: str


@router.post("/")
def save_feedback(data: FeedbackRequest):

    file_name = "feedback.csv"

    file_exists = os.path.isfile(file_name)

    with open(file_name, "a", newline="", encoding="utf-8") as file:

        writer = csv.writer(file)

        # Header only first time
        if not file_exists:
            writer.writerow([
                "timestamp",
                "rating",
                "feedback",
                "topic",
                "language"
            ])

        writer.writerow([
            datetime.now().isoformat(),
            data.rating,
            data.feedback,
            data.topic,
            data.language
        ])

    return {
        "success": True,
        "message": "Feedback saved successfully"
    }