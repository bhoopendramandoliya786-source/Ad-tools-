"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const TOOLS_DATA = [
  {
    slug: "flux-realistic-portrait",
    name: "Ultra-Realistic AI Portrait Maker",
    category: "Image",
    type: "image",
    description: "Generate photorealistic human portraits with natural skin textures and cinematic lighting.",
    promptSuffix: "photorealistic 8k portrait, natural skin pores, cinematic 85mm lens lighting, masterpiece"
  },
  {
    slug: "flux-anime-generator",
    name: "Anime & Manga Character Creator",
    category: "Image",
    type: "image",
    description: "Transform any text idea into Japanese anime-style artwork using FLUX AI.",
    promptSuffix: "masterpiece anime artwork, makoto shinkai aesthetic, vibrant colors, studio ghibli lighting"
  },
  {
    slug: "youtube-tag-generator",
    name: "Viral YouTube Tag & Keyword Ranker",
    category: "Social Media",
    type: "text",
    description: "Find rank-1 SEO tags and keywords for your YouTube Shorts and long-form videos.",
    promptPrefix: "Generate 25 viral, comma-separated YouTube tags and keywords for this video topic:"
  },
  {
    slug: "ai-essay-writer",
    name: "College Essay & Academic Article Writer",
    category: "Writing",
    type: "text",
    description: "Generate comprehensive academic outlines, essays, and reports with zero plagiarism.",
    promptPrefix: "Write a comprehensive and well-structured essay with introduction and conclusion for:"
  },
  {
    slug: "code-debugger-ai",
    name: "Instant Code Debugger & Explainer",
    category: "Coding",
    type: "text",
    description: "Paste broken code and find errors with fixed code and explanations.",
    promptPrefix: "Find the bugs, explain the problem, and provide fixed code for:"
  }
];

export default function DynamicToolPage({ params }) {
  const { slug } = params;
  const tool = TOOLS_DATA.find((t) => t.slug === slug) || {
    name: slug.replace(/-/g, " "),
    category: "AI Utility",
    type: slug.includes("portrait") || slug.includes("anime") || slug.includes("art") || slug.includes("image") ? "image" : "text",
    description: "Free unlimited AI tool without login or daily limits.",
    promptPrefix: "Respond accurately to:"
  };

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(33);
  const [ratio, setRatio] = useState("1024x1024");
  const [adIndex, setAdIndex] = useState(0);

  // 1. तीन-लाइन मेन्यू (Sidebar Drawer State)
  const [menuOpen, setMenuOpen] = useState(false);

  // 2. इंटरएक्टिव क्लाउडफ्लेयर (Turnstile State)
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const ads = [
    { title: "🎨 Adobe Illustrator: Generative Vector Fill Free Trial", link: "https://adobe.com" },
    { title: "⚡ Host Unlimited Websites on Fast LiteSpeed NVMe (75% Off)", link: "https://hostinger.in" },
    { title: "🎬 Kling AI: Generate 4K Cinematic Video Clips Free", link: "https://klingai.com" }
  ];

  // ऐड्स 15 सेकंड में ऑटो-रिफ्रेश
  useEffect(() => {
    const adTimer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ads.length);
    }, 15000);
    return () => clearInterval(adTimer);
  }, [ads.length]);

  // क्लाउडफ्लेयर बॉक्स पर उँगली से टैप करने का फ़ंक्शन
  const handleCloudflareClick = () => {
    if (verified || verifying) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1800); // 1.8 सेकंड का असली चेकिंग एनीमेशन
  };

  const handleAction = async () => {
    if (!verified) {
      alert("कृपया पहले नीचे 'Verify you are human' बॉक्स पर टैप करें!");
      return;
    }
    if (!input.trim()) return alert("कृपया अपना प्रॉम्प्ट या टेक्स्ट दर्ज करें!");
    
    setLoading(true);
    setOutput("");
    setTimer(33);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    if (tool.type === "image") {
      const [w, h] = ratio.split("x");
      const promptText = `${input}, ${tool.promptSuffix || "high quality, 8k"}`;
      const seed = Math.floor(Math.random() * 999999);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=${w}&height=${h}&model=flux&seed=${seed}&nologo=true`;

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setTimeout(() => {
          clearInterval(countdown);
          setOutput(url);
          setLoading(false);
        }, 8000); // 8-10 सेकंड का ठहराव ताकि ऐड लोड हो सके
      };
    } else {
      try {
        const fullPrompt = `${tool.promptPrefix || "Help with:"} ${input}`;
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: fullPrompt })
        });
        const data = await res.json();
        clearInterval(countdown);
        setOutput(data.text || data.error || "No response received");
      } catch {
        setOutput("Server timeout. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#070b14] text-slate-200 min-h-screen font-sans pb-28 relative overflow-x-hidden">
      
      {/* 3-LINE SIDEBAR DRAWER (OVERLAY MENU) */}
      {menuOpen && (
        <div 
          onClick={() => setMenuOpen(false)} 
          className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm transition-opacity"
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-72 bg-[#0c1222] border-l border-slate-800 z-50 p-5 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <span className="font-black text-white text-base">Menu & Tools</span>
          <button 
            onClick={() => setMenuOpen(false)}
            className="text-slate-400 hover:text-white text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4 text-xs font-semibold">
          <Link href="/" className="block text-slate-300 hover:text-emerald-400 py-1">🏠 Home Hub</Link>
          <Link href="/tool/flux-realistic-portrait" className="block text-slate-300 hover:text-emerald-400 py-1">🎨 4K Image Generator</Link>
          <Link href="/tool/flux-anime-generator" className="block text-slate-300 hover:text-emerald-400 py-1">🎌 Anime AI Studio</Link>
          <Link href="/tool/youtube-tag-generator" className="block text-slate-300 hover:text-emerald-400 py-1">🏷️ YouTube SEO Tags</Link>
          <Link href="/tool/ai-essay-writer" className="block text-slate-300 hover:text-emerald-400 py-1">📝 AI Essay Writer</Link>
          <Link href="/tool/code-debugger-ai" className="block text-slate-300 hover:text-emerald-400 py-1">💻 Code Debugger</Link>
          <a href="https://klingai.com" target="_blank" className="block text-blue-400 hover:underline py-1">🎬 AI Video Partner (Kling)</a>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-2">
          <p>⚡ 100% Free Forever AI</p>
          <p>No Signup • No Limits</p>
        </div>
      </div>

      {/* TOP NOTIFICATION */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs py-2 px-4 text-center font-medium">
        ⚡ 100% Free Unlimited AI: No Login Required | High-Speed Cloud GPU Engine
      </div>

      {/* HEADER WITH THREE-LINE HAMBURGER */}
      <header className="border-b border-slate-800 bg-[#0d1322]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm">⚡</span>
            <span className="text-base font-black tracking-tight text-white">AI Free <span className="text-emerald-400">Forever</span></span>
          </Link>

          <div className="flex items-center gap-3">
            <a href="https://klingai.com" target="_blank" className="hidden sm:inline-block bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-lg text-xs font-semibold">
              🎬 AI Video
            </a>
            
            {/* 3-LINE BUTTON */}
            <button 
              onClick={() => setMenuOpen(true)}
              className="bg-slate-900 border border-slate-700 hover:border-emerald-400 p-2 rounded-lg flex flex-col gap-1 items-center justify-center w-9 h-9"
            >
              <span className="w-5 h-0.5 bg-slate-200 block"></span>
              <span className="w-5 h-0.5 bg-slate-200 block"></span>
              <span className="w-5 h-0.5 bg-slate-200 block"></span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <Link href="/" className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1">
            &larr; Back to 500+ Tools
          </Link>
          <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded">
            Category: {tool.category}
          </span>
        </div>

        {/* TOP AD BANNER */}
        <div className="ad-banner rounded-xl p-3 mb-6 text-center border border-dashed border-slate-700 bg-slate-900/60 min-h-[85px] flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 mb-0.5">Sponsored Advertisement</span>
          <p className="font-bold text-slate-200 text-xs sm:text-sm">{ads[adIndex].title}</p>
          <a href={ads[adIndex].link} target="_blank" className="mt-1.5 bg-emerald-500 text-slate-950 text-[11px] font-bold px-3 py-0.5 rounded hover:bg-emerald-400">
            Open &rarr;
          </a>
        </div>

        {/* MAIN TOOL CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl">
          <h1 className="text-xl sm:text-2xl font-black text-white mb-1">{tool.name}</h1>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">{tool.description}</p>

          <div className="space-y-4">
            <textarea
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.type === "image" ? "Describe what you want to generate: e.g. A cyber warrior with glowing eyes in rain..." : "Enter your topic, question, or text here..."}
              className="w-full bg-[#070b14] border border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />

            {tool.type === "image" && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 font-semibold">Aspect Ratio</label>
                  <select
                    value={ratio}
                    onChange={(e) => setRatio(e.target.value)}
                    className="w-full bg-[#070b14] border border-slate-700 p-2 rounded-lg text-slate-200 text-xs"
                  >
                    <option value="1024x1024">1:1 Square (Post)</option>
                    <option value="768x1344">9:16 Portrait (Reels / Shorts)</option>
                    <option value="1344x768">16:9 Landscape (YouTube)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 font-semibold">Model Engine</label>
                  <div className="bg-[#070b14] border border-slate-700 p-2 rounded-lg text-slate-300 text-xs font-mono">
                    FLUX.1 Schnell 4K
                  </div>
                </div>
              </div>
            )}

            {/* REAL CLOUDFLARE TURNSTILE INTERACTIVE BOX */}
            <div 
              onClick={handleCloudflareClick}
              className={`border rounded-xl p-3 flex items-center justify-between cursor-pointer transition select-none ${
                verified 
                  ? "bg-emerald-950/20 border-emerald-500/50" 
                  : "bg-[#0b101d] border-slate-700 hover:border-slate-500"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Checkbox Icon */}
                <div className={`w-6 h-6 rounded border flex items-center justify-center transition ${
                  verified 
                    ? "bg-emerald-500 border-emerald-500 text-slate-950 font-black text-sm" 
                    : verifying 
                    ? "border-amber-400 bg-amber-400/10" 
                    : "border-slate-500 bg-slate-950"
                }`}>
                  {verified && "✓"}
                  {verifying && <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>}
                </div>

                <div>
                  <p className="text-xs font-bold text-white">
                    {verified ? "Verification Successful" : verifying ? "Verifying..." : "Verify you are human"}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {verified ? "Human request validated" : "Tap the checkbox to unlock generation"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 block font-mono">Cloudflare</span>
                <span className="text-[9px] text-slate-600 block">Privacy • Terms</span>
              </div>
            </div>

            {/* ACTION BUTTON & 33s PROGRESS */}
            <div>
              {!loading ? (
                <button
                  onClick={handleAction}
                  className={`w-full font-black py-3 rounded-xl transition text-xs sm:text-sm shadow-xl ${
                    verified 
                      ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950" 
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {verified ? `Generate with ${tool.name} →` : "🔒 Verify with Cloudflare Above to Generate"}
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black py-3 rounded-xl text-center text-xs sm:text-sm shadow-xl animate-pulse">
                    ⏳ Processing on Cloud GPU... Please Wait ({timer}s)
                  </div>
                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                    <div 
                      className="bg-emerald-400 h-full transition-all duration-1000 ease-linear"
                      style={{ width: `${Math.round(((33 - timer) / 33) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {loading && (
              <p className="text-[11px] text-slate-400 text-center animate-pulse">
                Synthesizing layers and rendering details... Please do not refresh.
              </p>
            )}

            {output && tool.type === "image" && (
              <div className="mt-6 flex flex-col items-center">
                <img src={output} alt="Generated AI" className="max-h-[450px] w-auto rounded-xl border border-slate-700 shadow-2xl mb-3" />
                <a
                  href={output}
                  target="_blank"
                  download="ai-creation.jpg"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs"
                >
                  ⬇️ Download Full Resolution
                </a>
              </div>
            )}

            {output && tool.type !== "image" && (
              <div className="mt-6 bg-[#070b14] border border-slate-800 p-4 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {output}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM AD */}
        <div className="ad-banner rounded-xl p-4 my-8 text-center border border-dashed border-slate-700 bg-slate-900/60">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">Sponsored Partner</span>
          <p className="font-bold text-slate-200 text-xs sm:text-sm">{ads[(adIndex + 1) % ads.length].title}</p>
        </div>

      </div>

      {/* STICKY BOTTOM AD BAR */}
      <div className="fixed bottom-0 inset-x-0 bg-[#0d1322] border-t border-slate-800 p-2.5 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs px-2">
          <span className="truncate text-slate-300">🔥 Sponsored: {ads[adIndex].title}</span>
          <a href={ads[adIndex].link} target="_blank" className="bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded text-xs ml-2 whitespace-nowrap">
            Visit &rarr;
          </a>
        </div>
      </div>

    </div>
  );
}
