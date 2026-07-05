import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def normalize_response(data):
    # Research
    research = data.get("research", {})

    for key in [
        "audiencePain",
        "competitorStrategy",
        "contentGap",
        "viralOpportunity",
    ]:
        value = research.get(key, "")

        if isinstance(value, str):
            research[key] = [value]

        elif value is None:
            research[key] = []

    if "trendingAngle" not in research:
        research["trendingAngle"] = ""

    # Script
    script = data.get("script", "")

    if isinstance(script, dict):
        script = json.dumps(script, indent=2)

    # Shot List
    shot_list = []

    for shot in data.get("shotList", []):

        if isinstance(shot, str):
            shot_list.append({
                "time": "",
                "visual": shot,
                "voiceover": ""
            })

        elif isinstance(shot, dict):
            shot_list.append({
                "time": shot.get("time", ""),
                "visual": shot.get("visual", ""),
                "voiceover": shot.get("voiceover", "")
            })

    data["research"] = research
    data["script"] = script
    data["shotList"] = shot_list

    return data

schema = """
{
  "research": {
    "trendingAngle": "...",
    "audiencePain": [
      "...",
      "...",
      "..."
    ],
    "competitorStrategy": [
      "...",
      "...",
      "..."
    ],
    "contentGap": [
      "...",
      "...",
      "..."
    ],
    "viralOpportunity": [
      "...",
      "...",
      "..."
    ]
  },

  "titles": [
    "...",
    "...",
    "..."
  ],

  "hooks": [
    "...",
    "...",
    "..."
  ],

  "script": [
    {
      "type": "...",
      "dialogue": "...",
      "visuals": "...",
      "key_points": "..."
    }
  ],

  "shotList": [
    {
      "time": "...",
      "visual": "...",
      "voiceover": "..."
    }
  ],

  "videoIdea": "...",

  "thumbnail": "...",

  "thumbnailPrompt": "...",

  "videoPrompt": "...",

  "keywords": [
    "...",
    "...",
    "..."
  ],

  "firstComment": "...",

  "cta": "..."
}
"""


def generate_hooks(topic: str, language: str):
    prompt = f"""
    You are a world-class YouTube Researcher, YouTube Strategist and Viral Content Expert.

    Before writing anything, first research the topic deeply.

    Analyze:
    - Trending Angle
    - Audience Pain
    - Competitor Strategy
    - Content Gap
    - Viral Opportunity

    Then create the complete content package.

    Topic: {topic}

    Language: {language}

    Generate ALL output ONLY in the selected language.

    Return ONLY this exact JSON structure:

    {schema}

    Rules:
    - Return ONLY valid JSON.
    - Do not add extra fields.
    - Do not remove fields.
    - Do not use markdown.
    - Do not wrap the response inside ```json.
    """

    response = model.generate_content(prompt)

    text = response.text.strip()


    # Remove markdown if Gemini returns it
    text = text.replace("```json", "").replace("```", "").strip()
    print("=" * 80)
    print(text)
    print("=" * 80)

    data = json.loads(text)

    print(json.dumps(data, indent=2, ensure_ascii=False))

    return normalize_response(data)