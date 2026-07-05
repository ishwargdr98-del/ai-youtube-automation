import { useState } from "react";
import { generateHooks } from "./api/ai";

function CopyButton({ text }) {
  const copy = () => {
    navigator.clipboard.writeText(text);
    alert("✅ Copied");
  };

  return (
    <button
      onClick={copy}
      className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg text-sm"
    >
      📋 Copy
    </button>
  );
}

function App() {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);

    try {
      const data = await generateHooks(topic, language);
      console.log(data);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Backend Error");
    }

    setLoading(false);
  };

  const copyAll = () => {
    if (!result) return;

    const text = `
🔥 TITLES
${result.titles.join("\n")}

🎣 HOOKS
${result.hooks.join("\n")}

📹 VIDEO IDEA
${result.videoIdea}

🖼 THUMBNAIL
${result.thumbnail}

🏷 KEYWORDS
${result.keywords.join(", ")}

💬 FIRST COMMENT
${result.firstComment}

🚀 CTA
${result.cta}

📝 SCRIPT
${result.script}

🎬 SHOT LIST
${result.shotList?.join("\n")}

🖼 THUMBNAIL PROMPT
${result.thumbnailPrompt}

🎥 VIDEO PROMPT
${result.videoPrompt}
`;

    navigator.clipboard.writeText(text);
    alert("✅ Complete Content Pack Copied");
  };

  return (
  <div className="min-h-screen bg-slate-950 text-white">

    {/* Header */}
    <div className="border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-5">

        <h1 className="text-4xl font-bold">
          🤖 Smartwork AI
        </h1>

        <p className="text-slate-400 mt-2">
          Your AI YouTube Automation Employee
        </p>

      </div>
    </div>

    {/* Body */}
    <div className="max-w-5xl mx-auto px-6 mt-12">

      {/* Language */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Language
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl p-3"
        >
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>

      {/* Search */}
      <div className="flex gap-4">

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none"
        />

        <button
          onClick={handleGenerate}
          className="bg-indigo-600 hover:bg-indigo-700 px-8 rounded-xl font-semibold"
        >
          Generate
        </button>

      </div>

      {loading && (
        <p className="mt-6 text-indigo-400">
          ⚡ Generating...
        </p>
      )}

      {result && (


        <>
           <div className="bg-slate-900 rounded-xl p-6 mb-8">

  <h2 className="text-2xl font-bold mb-6">
    🧠 AI Research Report
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="font-bold text-indigo-400 mb-2">
        📈 Trending Angle
      </h3>

      <p>{result.research?.trendingAngle}</p>
    </div>

    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="font-bold text-red-400 mb-2">
        😨 Audience Pain
      </h3>

      <ul className="list-disc pl-5">
        {result.research?.audiencePain?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>



    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="font-bold text-yellow-400 mb-2">
        🎯 Competitor Strategy
      </h3>

      <ul className="list-disc pl-5">
        {result.research?.competitorStrategy?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="font-bold text-green-400 mb-2">
        🚀 Content Gap
      </h3>

      <ul className="list-disc pl-5">
        {result.research?.contentGap?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    <div className="bg-slate-800 rounded-xl p-5 md:col-span-2">
      <h3 className="font-bold text-pink-400 mb-2">
        💰 Viral Opportunity
      </h3>

      <ul className="list-disc pl-5">
        {result.research?.viralOpportunity?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
 </div>

</div>
          <div className="flex justify-end mt-6 mb-6">
            <button
              onClick={copyAll}
              className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold"
            >
              📋 Copy Complete Content Pack
            </button>
          </div>

          <div className="space-y-8">

          {/* Titles */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🔥 Viral Titles</h2>

  {result.titles?.map((title, i) => (
    <div
      key={i}
      className="bg-slate-800 rounded-lg p-4 mb-3 flex justify-between items-center"
    >
      <span>{title}</span>
      <CopyButton text={title} />
    </div>
  ))}
</div>

{/* Hooks */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🎣 Viral Hooks</h2>

  {result.hooks?.map((hook, i) => (
    <div
      key={i}
      className="bg-slate-800 rounded-lg p-4 mb-3 flex justify-between items-center"
    >
      <span>{hook}</span>
      <CopyButton text={hook} />
    </div>
  ))}
</div>

{/* Script */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">📝 AI Script</h2>

  {result.script?.map((part, i) => (
    <div
      key={i}
      className="bg-slate-800 rounded-lg p-5 mb-4"
    >
      <h3 className="font-bold text-indigo-400 mb-2">
        {part.type}
      </h3>

      <p className="mb-3">
        <strong>Dialogue:</strong><br />
        {part.dialogue}
      </p>

      <p className="mb-3">
        <strong>Visuals:</strong><br />
        {part.visuals}
      </p>

      <p>
        <strong>Key Points:</strong><br />
        {part.key_points}
      </p>

      <div className="mt-4">
        <CopyButton
          text={`${part.type}

${part.dialogue}

${part.visuals}

${part.key_points}`}
        />
      </div>
    </div>
  ))}
</div>

{/* Shot List */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🎬 Shot List</h2>

 {/* Shot List */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🎬 Shot List</h2>

  {result.shotList?.map((shot, i) => (
    <div
      key={i}
      className="bg-slate-800 rounded-lg p-5 mb-4"
    >
      <p className="mb-2">
        <strong>⏱ Time:</strong> {shot.time}
      </p>

      <p className="mb-2">
        <strong>🎥 Visual:</strong><br />
        {shot.visual}
      </p>

      <p className="mb-3">
        <strong>🎙 Voiceover:</strong><br />
        {shot.voiceover}
      </p>

      <CopyButton
        text={`Time: ${shot.time}

Visual:
${shot.visual}

Voiceover:
${shot.voiceover}`}
      />
    </div>
  ))}
</div>
</div>

{/* Video Idea */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">📹 Video Idea</h2>

  <div className="bg-slate-800 rounded-lg p-4 flex justify-between items-center">
    <span>{result.videoIdea}</span>
    <CopyButton text={result.videoIdea} />
  </div>
</div>

{/* Thumbnail */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🖼 Thumbnail Text</h2>

  <div className="bg-slate-800 rounded-lg p-4 flex justify-between items-center">
    <span>{result.thumbnail}</span>
    <CopyButton text={result.thumbnail} />
  </div>
</div>

{/* Thumbnail Prompt */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🖼 Thumbnail Prompt</h2>

  <div className="bg-slate-800 rounded-lg p-4 flex justify-between items-center">
    <span>{result.thumbnailPrompt}</span>
    <CopyButton text={result.thumbnailPrompt} />
  </div>
</div>

{/* Video Prompt */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🎥 Video Prompt</h2>

  <div className="bg-slate-800 rounded-lg p-4 flex justify-between items-center">
    <span>{result.videoPrompt}</span>
    <CopyButton text={result.videoPrompt} />
  </div>
</div>

{/* Keywords */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🏷 SEO Keywords</h2>

  <div className="flex flex-wrap gap-2">
    {result.keywords?.map((keyword, i) => (
      <span
        key={i}
        className="bg-indigo-600 px-4 py-2 rounded-full"
      >
        {keyword}
      </span>
    ))}
  </div>
</div>

{/* First Comment */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">💬 First Comment</h2>

  <div className="bg-slate-800 rounded-lg p-4 flex justify-between items-center">
    <span>{result.firstComment}</span>
    <CopyButton text={result.firstComment} />
  </div>
</div>

{/* CTA */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🚀 CTA</h2>

  <div className="bg-slate-800 rounded-lg p-4 flex justify-between items-center">
    <span>{result.cta}</span>
    <CopyButton text={result.cta} />
  </div>
</div>

</div>

</>

)}

</div>

</div>

);
}

export default App;