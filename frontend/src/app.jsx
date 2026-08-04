import { useEffect, useState } from "react";
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
  const [progress, setProgress] = useState(0);




const loadingMessages = [
  "🧠 Researching your topic...",
  "📊 Analyzing competitors...",
  "🎯 Finding audience pain...",
  "🔥 Creating viral titles...",
  "🎣 Writing irresistible hooks...",
  "✍️ Writing complete script...",
  "🖼 Designing thumbnail ideas...",
  "🚀 Optimizing SEO keywords...",
  "✅ Finalizing your content pack..."

];
const [loadingText, setLoadingText] = useState(loadingMessages[0]);

useEffect(() => {
  if (!loading) return;

  let index = 0;

  setProgress(0);
  setLoadingText(loadingMessages[0]);

  const interval = setInterval(() => {

    index++;

    if (index >= loadingMessages.length) {
      index = loadingMessages.length - 1;
    }

    setLoadingText(loadingMessages[index]);

    setProgress(((index + 1) / loadingMessages.length) * 100);

  }, 3000);

  return () => clearInterval(interval);

}, [loading]);
  const topics = [
  "AI Automation",
  "Stock Market",
  "Business",
  "Motivation",
  "Fitness",
  "Cricket",
  "History",
  "News"
];

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
setLoading(false);
  setTimeout(() => {
  document
    .getElementById("result-section")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}, 250);

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
  <div className="
    max-w-6xl mx-auto
    px-4 sm:px-6
    py-3 sm:py-5
    flex items-center justify-between
    gap-3
  ">

    {/* Logo + Brand */}
    <div className="flex items-center gap-3 sm:gap-4 min-w-0">

      <img
        src="/logo.png"
        alt="Smartwork AI Logo"
        className="
          w-14 h-14
          sm:w-24 sm:h-24
          rounded-xl
          object-contain
          flex-shrink-0
        "
      />

      <div className="min-w-0">
        <h1 className="
          text-xl
          sm:text-4xl
          font-bold
          whitespace-nowrap
        ">
          Smartwork AI
        </h1>

        <p className="
          hidden
          sm:block
          text-slate-400
          mt-2
        ">
          Get a Complete Viral YouTube Content Pack in Under 1 Minute.
        </p>

        {/* Mobile subtitle */}
        <p className="sm:hidden text-xs text-slate-400 mt-1">
          AI YouTube Content Tool
        </p>
      </div>

    </div>

    {/* Try Free */}
    <button
      onClick={() => {
        document.getElementById("topicInput")?.focus();
      }}
      className="
        flex-shrink-0
        bg-indigo-600
        hover:bg-indigo-700
        px-3 py-2
        sm:px-6 sm:py-3
        rounded-xl
        text-sm sm:text-base
        font-semibold
        transition
        whitespace-nowrap
      "
    >
      ⭐ <span className="hidden sm:inline">Try Free</span>
      <span className="sm:hidden">Try</span>
    </button>

  </div>
</div>

    {/* Body */}
    <div className="max-w-5xl mx-auto px-6 mt-12">




      {/* AI Powered Badge */}
<div className="mt-10 text-center">
  <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
    ✨ AI Powered
  </span>

  <h2 className="text-4xl font-bold text-white mt-5">
 Create a Complete Viral YouTube Content Pack in Under 1 Minute
  </h2>

  <p className="text-slate-400 mt-4 max-w-3xl mx-auto">
    Get research, viral titles, hooks, full scripts, thumbnail ideas and SEO — ready to publish.
  </p>
</div>

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
      <div className="flex flex-col sm:flex-row gap-4 w-full">

        <input
         id="topicInput"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter any topic... (e.g. AI Automation, IPL, Stock Market, Motivation)"
          className="w-full flex-1 bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none"
        />

<button
  onClick={handleGenerate}
  disabled={loading}
  className={`
    w-full
    sm:w-auto
    sm:min-w-[180px]
    px-6
    py-4
    rounded-xl
    font-semibold
    transition
    ${
      loading
        ? "bg-slate-700 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700"
    }
  `}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>Generating</span>
    </div>
  ) : (
    "🚀 Generate Now"
  )}
</button>






      </div>
            <h3 className="mt-6 mb-3 text-lg font-semibold text-white">
  🔥 Trending Topics
</h3>

      <div className="flex flex-wrap gap-3 mt-5">

  {topics.map((item) => (

    <button
      key={item}
      onClick={() => setTopic(item)}
   className="
bg-slate-800
hover:bg-indigo-600
hover:scale-105
hover:shadow-lg
hover:shadow-indigo-500/30
transition-all
duration-200
px-5
py-2
rounded-full
text-sm
font-medium
"
    >
      {item}
    </button>

  ))}

</div>

{loading && (
<div className="mt-10">


    {/* Spinner */}
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    {/* Dynamic Loading Text */}
    <h2 className="text-3xl font-bold text-indigo-400">
      {loadingText}
    </h2>

    <p className="text-slate-400 mt-3">
      Preparing your complete AI content pack...
    </p>

    {/* Animated Progress */}
    <div className="mt-8 h-2 bg-slate-800 rounded-full overflow-hidden">
    <div
  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700"
  style={{ width: `${progress}%` }}
></div>
    </div>

    <p className="text-sm text-slate-500 mt-4">
      ⚡ Usually takes 20–40 seconds depending on research complexity.
    </p>

  </div>
)}
      <div className="flex justify-center gap-6 mt-8 text-sm text-slate-400 flex-wrap">

  <span>✅ No Login Required</span>

  <span>🧠 Deep AI Research</span>

  <span>🤖 AI Powered</span>

</div>
{/* Example Output */}

<div className="mt-14 bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <div className="text-center mb-8">

    <span className="bg-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">
      🔥 Example Output
    </span>

    <h2 className="text-4xl f
    ont-bold mt-5">
      What You'll Get
    </h2>

    <p className="text-slate-400 mt-3">
      Complete AI-generated content pack from a single topic.
    </p>

  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="text-green-400 font-bold mb-3">
        📌 Topic
      </h3>

      <p>

Ashoka History</p>
    </div>

    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="text-yellow-400 font-bold mb-3">
        🔥 Viral Title
      </h3>

      <p>
        The Secret History Nobody Tells You About Ashoka
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="text-pink-400 font-bold mb-3">
        🎣 Hook
      </h3>

      <p>
        What if everything you learned about Ashoka was incomplete?
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="text-blue-400 font-bold mb-3">
        📝 Script
      </h3>

      <p>
        Complete YouTube script ready to record.
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="text-orange-400 font-bold mb-3">
        🖼 Thumbnail
      </h3>

      <p>
        THE DARK SECRET OF ASHOKA
      </p>
    </div>

    <div className="bg-slate-800 rounded-xl p-5">
      <h3 className="text-cyan-400 font-bold mb-3">
        📈 SEO Keywords
      </h3>

      <p>
        Ashoka History, Maurya Empire, Indian History
      </p>
    </div>

  </div>

</div>


{/*  <p className="text-center text-slate-400 mt-4"> */}
{/* ⚡ Average generation time: 20 sec • No signup required */}
{/* </p> */}

</div> {/* Close Generator Card */}

{/* Why Creators Choose Smartwork AI */}

<div className="mt-16 mb-10 text-center">
  <h2 className="text-4xl font-bold">
    Why Creators Choose Smartwork AI
  </h2>

  <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
    Everything you need to go from a simple idea to a publish-ready
    YouTube content pack in under one minute.
  </p>
</div>

<div className="grid md:grid-cols-4 gap-5">

  <div className="bg-slate-900 rounded-xl p-6 text-center hover:bg-slate-800 transition">
    <div className="text-4xl mb-3">🧠</div>
    <h3 className="font-bold text-lg">Deep AI Research</h3>
    <p className="text-slate-400 text-sm mt-2">
      Discover audience pain points, competitors and viral opportunities before creating content.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center hover:bg-slate-800 transition">
    <div className="text-4xl mb-3">⚡</div>
    <h3 className="font-bold text-lg">Save Hours</h3>
    <p className="text-slate-400 text-sm mt-2">
      Replace hours of research with a complete AI-generated content pack in under one minute.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center hover:bg-slate-800 transition">
    <div className="text-4xl mb-3">🎯</div>
    <h3 className="font-bold text-lg">Higher Viral Potential</h3>
    <p className="text-slate-400 text-sm mt-2">
      Titles, hooks and scripts optimized to improve click-through rate and audience retention.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center hover:bg-slate-800 transition">
    <div className="text-4xl mb-3">📦</div>
    <h3 className="font-bold text-lg">Ready To Publish</h3>
    <p className="text-slate-400 text-sm mt-2">
      Research, scripts, thumbnail ideas, SEO and publishing assets generated together.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center hover:bg-slate-800 transition">
    <div className="text-4xl mb-3">🌍</div>
    <h3 className="font-bold text-lg">Multi Language</h3>
    <p className="text-slate-400 text-sm mt-2">
      Generate high-quality content naturally in English, Hindi and more.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center hover:bg-slate-800 transition">
    <div className="text-4xl mb-3">🚀</div>
    <h3 className="font-bold text-lg">One-Click Workflow</h3>
    <p className="text-slate-400 text-sm mt-2">
      Enter one topic and instantly receive your complete YouTube content pack.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center hover:bg-slate-800 transition">
    <div className="text-4xl mb-3">🔒</div>
    <h3 className="font-bold text-lg">No Login Required</h3>
    <p className="text-slate-400 text-sm mt-2">
      Start generating immediately without creating an account.
    </p>
  </div>

  <div className="bg-slate-900 rounded-xl p-6 text-center hover:bg-slate-800 transition">
    <div className="text-4xl mb-3">💎</div>
    <h3 className="font-bold text-lg">Professional Quality</h3>
    <p className="text-slate-400 text-sm mt-2">
      AI-generated content ready to record, edit and publish.
    </p>
  </div>

</div>

<div className="flex flex-wrap justify-center gap-3 mt-8">

<span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full">
⚡ Under 1 Minute
</span>

<span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full">
🌍 Multi Language
</span>

<span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full">
🚀 Ready to Publish
</span>

</div>

<div className="bg-slate-900 rounded-2xl p-8 mt-10 max-w-5xl mx-auto">


{result && (
 <>

<div
  id="result-section"
  className={`bg-slate-900 rounded-xl p-6 mb-8 transition-all duration-700 ${
    result
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-6"
  }`}
>
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
<footer className="mt-6 border-t border-slate-800 py-6 text-center">

  <h3 className="text-xl font-bold text-white">
    🚀 Smartwork AI
  </h3>

  <p className="text-slate-400 text-sm mt-1">
    AI YouTube Content Automation Platform
  </p>

  <div className="flex justify-center items-center gap-5 mt-4 text-sm">

    <a
      href="https://github.com/ishwargdr98-del"
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-400 hover:text-indigo-300 transition"
    >
      GitHub
    </a>

    <span className="text-slate-600">•</span>

    <a
      href="mailto:ishwargdr98@email.com"
      className="text-indigo-400 hover:text-indigo-300 transition"
    >
      Contact
    </a>

  </div>

  <p className="text-slate-500 text-xs mt-4">
    © 2026 Smartwork AI • All rights reserved.
  </p>

</footer>
</div>

</div>

);
}

export default App;

