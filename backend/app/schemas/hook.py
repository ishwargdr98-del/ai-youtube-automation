from pydantic import BaseModel


class ScriptSection(BaseModel):
    type: str
    dialogue: str
    visuals: str
    key_points: str


class HookRequest(BaseModel):
    topic: str
    language: str


class Research(BaseModel):
    trendingAngle: str

    audiencePain: list[str]

    competitorStrategy: list[str]

    contentGap: list[str]

    viralOpportunity: list[str]


class Shot(BaseModel):
    time: str
    visual: str
    voiceover: str


class HookResponse(BaseModel):
    research: Research

    titles: list[str]

    hooks: list[str]

    script: list[ScriptSection]

    shotList: list[Shot]

    videoIdea: str

    thumbnail: str

    thumbnailPrompt: str

    videoPrompt: str

    keywords: list[str]

    firstComment: str

    cta: str