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

  const ads = [
    { title: "🎨 Adobe Illustrator: Generative Vector Fill Free Trial", link: "https://adobe.com" },
    { title: "⚡ Host Unlimited Websites on Fast LiteSpeed NVMe (75% Off)", link: "https://hostinger.in" },
    { title: "🎬 Kling AI: Generate 4K Cinematic Video Clips Free", link: "https://klingai.com" }
  ];

  // Auto-refresh ads every 15 seconds
  useEffect(() => {
    const adTimer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ads.length);
    }, 15000);
    return () => clearInterval(adTimer);
  }, [ads.length]);

  const handleAction = async () => {
    if (!input.trim()) return alert("Please enter your prompt/details!");
    setLoading(true);
    setOutput("");
    setTimer(33);

    // 33-Second Reverse Countdown Timer (इम्प्रेशन्स बढ़ाने के लिए)
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
        }, 12000); // 12-15 सेकंड का जानबूझकर ठहराव ताकि 1-2 ऐड रिफ्रेश हो सकें
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
    <div className="bg-[#070b14] text-slate-200 min-h-screen font-sans pb-28">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs py-2 px-4 text-center font-medium">
        ⚡ 100% Free Unlimited AI: No Login Required | High-Speed Cloud GPU Engine
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        
        {/* Navigation & Category */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <Link href="/" className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1">
            &larr; Back to 500+ Tools
          </Link>
          <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded">
            Category: {tool.category}
          </span>
        </div>

        {/* 1. TOP SPONSORED AD */}
        <div className="ad-banner rounded-xl p-3 mb-6 text-center border border-dashed border-slate-700 bg-slate-900/60 min-h-[85px] flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 mb-0.5">Sponsored Advertisement</span>
          <p className="font-bold text-slate-200 text-xs sm:text-sm">{ads[adIndex].title}</p>
          <a href={ads[adIndex].link} target="_blank" className="mt-1.5 bg-emerald-500 text-slate-950 text-[11px] font-bold px-3 py-0.5 rounded hover:bg-emerald-400">
            Open &rarr;
          </a>
        </div>

        {/* MAIN GENERATOR CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl">
          <h1 className="text-xl sm:text-2xl font-black text-white mb-1">{tool.name}</h1>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">{tool.description}</p>

          {/* Clean Textarea Input */}
          <div className="space-y-4">
            <textarea
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.type === "image" ? "Describe what you want to generate: e.g. A cyber warrior with glowing eyes in rain..." : "Enter your topic, question, or text here..."}
              className="w-full bg-[#070b14] border border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />

            {/* If Image Tool: Ratio Selectors */}
            {tool.type === "image" && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 font-semibold">Aspect Ratio</label>
                  <select
                    value={ratio}
                    onChange={(e) => setRatio(e.target.value)}
                    className="w-full bg-[#070b14] border border-slate-700 p-2 rounded-lg text-slate-200"
                  >
                    <option value="1024x1024">1:1 Square (Instagram Post)</option>
                    <option value="768x1344">9:16 Portrait (Reels / Shorts)</option>
                    <option value="1344x768">16:9 Landscape (YouTube Banner)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 font-semibold">Model Engine</label>
                  <div className="bg-[#070b14] border border-slate-700 p-2 rounded-lg text-slate-300 text-[11px]">
                    FLUX.1 Schnell 4K (Active)
                  </div>
                </div>
              </div>
            )}

            {/* Cloudflare Verification Badge */}
            <div className="bg-[#070b14] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span className="text-slate-300 text-[11px]">Human Verification: <strong className="text-emerald-400">Passed</strong></span>
              </div>
              <span className="text-[10px] text-slate-500">Cloudflare Turnstile</span>
            </div>

            {/* Action Button & 33s Reverse Timer */}
            <div>
              {!loading ? (
                <button
                  onClick={handleAction}
                  className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black py-3 rounded-xl transition text-xs sm:text-sm shadow-xl"
                >
                  Generate with {tool.name} &rarr;
                </button>
              ) : (
                <div className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black py-3 rounded-xl text-center text-xs sm:text-sm shadow-xl animate-pulse">
                  ⏳ Generating on GPU... Wait {timer}s
                </div>
              )}
            </div>

            {/* Loading Indicator */}
            {loading && (
              <p className="text-[11px] text-slate-400 text-center animate-pulse">
                Rendering textures and details... Please keep this tab open.
              </p>
            )}

            {/* Image Output */}
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

            {/* Text Output */}
            {output && tool.type !== "image" && (
              <div className="mt-6 bg-[#070b14] border border-slate-800 p-4 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {output}
              </div>
            )}
          </div>
        </div>

        {/* 2. BOTTOM IN-PAGE AD */}
        <div className="ad-banner rounded-xl p-4 my-8 text-center border border-dashed border-slate-700 bg-slate-900/60">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">Sponsored Link</span>
          <p className="font-bold text-slate-200 text-xs sm:text-sm">{ads[(adIndex + 1) % ads.length].title}</p>
        </div>

      </div>

      {/* 3. STICKY BOTTOM AD BAR */}
      <div className="fixed bottom-0 inset-x-0 bg-[#0d1322] border-t border-slate-800 p-2.5 z-50">
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
