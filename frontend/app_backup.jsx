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





    if (data.error) {
      alert(data.message);
      return;
    }


    setResult(data);

  } catch (err) {
    console.error(err);
    alert("Backend Error");

  } finally {
    setLoading(false);
  }
};

  const copyAll = () => {
    if (!result) return;

    const text = `
🧠 AI RESEARCH REPORT

📈 Trending Angle
${result.research?.trendingAngle}

😨 Audience Pain
${result.research?.audiencePain?.join("\n")}

🎯 Competitor Strategy
${result.research?.competitorStrategy?.join("\n")}

🚀 Content Gap
${result.research?.contentGap?.join("\n")}

💰 Viral Opportunity
${result.research?.viralOpportunity?.join("\n")}

================================

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
${result.script
  ?.map(
    s => `
${s.type}

Dialogue:
${s.dialogue}

Visuals:
${s.visuals}

Key Points:
${s.key_points}
`
  )
  .join("\n")}

🎬 SHOT LIST
${result.shotList
  ?.map(
    s => `
${s.time}

Visual:
${s.visual}

Voice:
${s.voiceover}
`
  )
  .join("\n")}

🖼 THUMBNAIL PROMPT
${result.thumbnailPrompt}

🎥 VIDEO PROMPT
${result.videoPrompt}
`;

    navigator.clipboard.writeText(text);
    alert("✅ Complete Content Pack Copied");
  };
  const downloadReport = () => {
  if (!result) return;

  const text = `
SMARTWORK AI CONTENT REPORT

Topic: ${topic}

Titles:
${result.titles.join("\n")}

Hooks:
${result.hooks.join("\n")}

Video Idea:
${result.videoIdea}

Thumbnail:
${result.thumbnail}

Keywords:
${result.keywords.join(", ")}

First Comment:
${result.firstComment}

CTA:
${result.cta}
`;

  const blob = new Blob([text], { type: "text/plain" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "SmartworkAI-Report.txt";

  a.click();

  URL.revokeObjectURL(url);
};

  return (
  <div className="min-h-screen bg-slate-950 text-white">

    {/* Header */}
   <div className="border-b border-slate-800">
  <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

    <div>
      <h1 className="text-4xl font-bold">
        🤖 Smartwork AI
      </h1>

      <p className="text-slate-400 mt-2">
        Generate Viral YouTube Content in Minutes with AI
      </p>
    </div>

    <button
      className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition"
    >
      ⭐ Try Free
    </button>

  </div>
</div>

    {/* Body */}
    <div className="max-w-5xl mx-auto px-6 mt-12">



     {loading && (
  <div className="mt-6 bg-slate-900 border border-indigo-500 rounded-xl p-5 text-center animate-pulse">
    <h3 className="text-xl font-bold text-indigo-400">
      🤖 AI is generating your content...
    </h3>

    <p className="text-slate-300 mt-2">
      Please wait while Smartwork AI prepares your research,
      titles, hooks, scripts and SEO.
    </p>

    <p className="text-slate-500 text-sm mt-3">
      ⏳ Usually takes 20–30 seconds.
    </p>
  </div>
)}
      {/* AI Powered Badge */}
<div className="mt-10 text-center">
  <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
    ✨ AI Powered
  </span>

  <h2 className="text-4xl font-bold text-white mt-5">
    Create Viral YouTube Content in Minutes
  </h2>

  <p className="text-slate-400 mt-4 max-w-3xl mx-auto">
    Stop spending hours planning YouTube videos.
    Generate Research, Viral Titles, Hooks, Scripts,
    Shot Lists, Thumbnail Prompts and SEO in one click.
  </p>
</div>

{/* Features */}
<div className="grid md:grid-cols-4 gap-5 mt-12">

  <div className="bg-slate-900 rounded-xl p-6 text-center">
    <div className="text-4xl mb-3">🧠</div>
    <h3 className="font-bold text-lg">AI Research</h3>
    <p className="text-slate-400 text-sm mt-2">
      Trending angles, audience pain and competitor research.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center">
    <div className="text-4xl mb-3">🔥</div>
    <h3 className="font-bold text-lg">Viral Titles</h3>
    <p className="text-slate-400 text-sm mt-2">
      AI generates high CTR YouTube titles.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center">
    <div className="text-4xl mb-3">🎣</div>
    <h3 className="font-bold text-lg">Hooks & Script</h3>
    <p className="text-slate-400 text-sm mt-2">
      Powerful hooks and complete AI scripts.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center">
    <div className="text-4xl mb-3">🎬</div>
    <h3 className="font-bold text-lg">Shot List</h3>
    <p className="text-slate-400 text-sm mt-2">
      Scene-by-scene video production plan.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center">
    <div className="text-4xl mb-3">🖼</div>
    <h3 className="font-bold text-lg">Thumbnail Prompt</h3>
    <p className="text-slate-400 text-sm mt-2">
      AI thumbnail ideas with prompts.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center">
    <div className="text-4xl mb-3">🎥</div>
    <h3 className="font-bold text-lg">Video Prompt</h3>
    <p className="text-slate-400 text-sm mt-2">
      Ready prompts for AI video generators.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center">
    <div className="text-4xl mb-3">🏷</div>
    <h3 className="font-bold text-lg">SEO Keywords</h3>
    <p className="text-slate-400 text-sm mt-2">
      Optimized keywords to improve discoverability.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center">
    <div className="text-4xl mb-3">🚀</div>
    <h3 className="font-bold text-lg">One Click</h3>
    <p className="text-slate-400 text-sm mt-2">
      Everything generated in a single click.
    </p>
  </div>

</div>

<div className="flex flex-wrap justify-center gap-3 mt-8">

  <span className="bg-slate-800 px-4 py-2 rounded-full">
    ✅ AI Research
  </span>

  <span className="bg-slate-800 px-4 py-2 rounded-full">
    ✅ Script
  </span>

  <span className="bg-slate-800 px-4 py-2 rounded-full">
    ✅ Thumbnail
  </span>
  <span className="bg-slate-800 px-4 py-2 rounded-full">
    ✅ SEO
  </span>

</div>

<div className="bg-slate-900 rounded-2xl p-8 mt-10 max-w-5xl mx-auto">

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
          placeholder="e.g. AI Automation, Tesla, Cricket, Motivation..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none"
        />

      <button
  onClick={handleGenerate}
  disabled={loading}
  className={`px-8 rounded-xl font-semibold transition ${
    loading
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-indigo-600 hover:bg-indigo-700"
  }`}
>
  {loading ? "⏳ Generating..." : "🚀 Generate Content"}
</button>






      </div>

 <p className="text-center text-slate-400 mt-4">
  ⚡ Average generation time: 20–30 seconds
</p>

</div> {/* Close Generator Card */}

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

            <button
  onClick={downloadReport}
  className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold ml-3"
>
  📄 Download Report
</button>
          </div>

{/*           <pre className="bg-black text-green-400 p-3 rounded mb-4 overflow-auto"> */}
{/* {JSON.stringify(result, null, 2)} */}
{/* </pre> */}

          <div className="space-y-8">

          {/* Titles */}
<div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">🔥 Viral Titles</h2>



{Array.isArray(result.titles) &&
  result.titles.map((title, i) => (
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

  {Array.isArray(result.hooks) &&
  result.hooks.map((hook, i) => (
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

 {Array.isArray(result.script) &&
  result.script.map((part, i) => (
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

{Array.isArray(result.shotList) &&
  result.shotList.map((shot, i) => (
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
    {Array.isArray(result.keywords) &&
  result.keywords.map((keyword, i) => (
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
{/* Footer */}
<footer className="mt-20 border-t border-slate-800 py-8 text-center">

  <h3 className="text-white font-bold text-xl">
    Smartwork AI
  </h3>

  <p className="text-slate-400 mt-2">
    Your AI YouTube Automation Employee
  </p>

  <div className="flex justify-center gap-6 mt-5">

    <a
      href="https://github.com/ishwargdr98-del"
      target="_blank"
      className="text-indigo-400 hover:text-indigo-300"
    >
      GitHub
    </a>

    <a
      href="ishwargdr98@email.com"
      className="text-indigo-400 hover:text-indigo-300"
    >
      Contact
    </a>

  </div>

  <p className="text-slate-500 text-sm mt-5">
    © 2026 Smartwork AI. All rights reserved.
  </p>

</footer>
</div>

</div>

);
}

export default App;