from fastapi import APIRouter
from app.schemas.hook import HookRequest, HookResponse
from app.services.hook_service import generate_hooks

router = APIRouter(
    prefix="/hooks",
    tags=["Hooks"]
)

@router.post("/", response_model=HookResponse)
def create_hooks(data: HookRequest):
    result = generate_hooks(
        data.topic,
        data.language
    )

    return HookResponse(
        research=result["research"],
        titles=result["titles"],
        hooks=result["hooks"],

        script=result["script"],

        shotList=result["shotList"],

        videoIdea=result["videoIdea"],

        thumbnail=result["thumbnail"],

        thumbnailPrompt=result["thumbnailPrompt"],

        videoPrompt=result["videoPrompt"],

        keywords=result["keywords"],

        firstComment=result["firstComment"],

        cta=result["cta"]
    )