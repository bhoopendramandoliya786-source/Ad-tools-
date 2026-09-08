"use client";

import { useState, useEffect } from "react";

const TOOLS_LIST = [
  { slug: "youtube-tag-generator", title: "YouTube Tag Generator", desc: "Find ranking SEO tags for Shorts" },
  { slug: "ai-essay-writer", title: "AI Essay Writer", desc: "Write college outlines in 5 seconds" },
  { slug: "instagram-caption-generator", title: "Instagram Captions", desc: "Generate viral hooks & hashtags" },
  { slug: "b-and-w-photo-colorizer", title: "B&W Photo Colorizer", desc: "Restore vintage images to 4K" },
  { slug: "ai-sticker-maker", title: "AI Sticker Maker", desc: "Make transparent PNG stickers" },
  { slug: "resume-bullet-points", title: "Resume Bullet Points", desc: "Professional corporate bullets" },
  { slug: "email-reply-generator", title: "Professional Email Replier", desc: "Instant polite work emails" },
  { slug: "script-outline-maker", title: "Reel Script Generator", desc: "Complete 30-sec viral scripts" }
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState("1024x1024");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [timer, setTimer] = useState(15);
  const [adText, setAdText] = useState("🚀 Create 4K Hollywood Videos Free with Kling AI");

  // Auto-refresh ads engine every 15s
  useEffect(() => {
    const ads = [
      "🚀 Create 4K Hollywood Videos Free with Kling AI",
      "⚡ Host Unlimited Sites on Fast Cloud GPUs - 75% Off",
      "🎨 Adobe Firefly: Next-Gen Vector Illustration Tool"
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % ads.length;
      setAdText(ads[i]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = () => {
    if (!prompt) return alert("Please enter a prompt!");
    setLoading(true);
    setImageUrl("");
    setTimer(15);

    const [width, height] = ratio.split("x");
    const seed = Math.floor(Math.random() * 999999);
    const finalUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&model=flux&seed=${seed}&nologo=true`;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const img = new Image();
    img.src = finalUrl;
    img.onload = () => {
      setTimeout(() => {
        setImageUrl(finalUrl);
        setLoading(false);
      }, 1000);
    };
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <header className="flex justify-between items-center pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 text-slate-950 p-2 rounded-lg font-black">⚡</div>
          <span className="text-xl font-bold text-white">FreeAI<span className="text-emerald-400">Hub</span></span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <a href="https://klingai.com" target="_blank" className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg font-semibold">
            🎥 AI Video Partner
          </a>
          <button className="bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-lg font-bold">100% Free</button>
        </div>
      </header>

      {/* Top Auto-Refresh Ad Banner */}
      <div className="ad-banner rounded-xl p-3 my-6 text-center text-xs">
        <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">Sponsored Ad</span>
        <p className="font-bold text-slate-200">{adText}</p>
      </div>

      {/* Main Generator Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <h1 className="text-2xl font-bold mb-1">Free FLUX AI Image Studio</h1>
        <p className="text-xs text-slate-400 mb-4">Fast high-resolution generation. No login or signup required.</p>

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your scene: e.g. An Indian cyberpunk samurai in rainfall, 8k realistic cinematic lighting..."
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm focus:outline-none focus:border-emerald-400 mb-4"
        />

        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Aspect Ratio:</span>
            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              className="bg-slate-950 border border-slate-700 p-2 rounded-lg text-slate-200"
            >
              <option value="1024x1024">1:1 Square</option>
              <option value="768x1344">9:16 Reel / Shorts</option>
              <option value="1344x768">16:9 YouTube Banner</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-2"
          >
            {loading ? `Generating on GPU (${timer}s)...` : "✨ Generate Free"}
          </button>
        </div>

        {/* Output */}
        {loading && (
          <div className="mt-8 text-center text-xs text-emerald-400 animate-pulse">
            Processing image textures and lighting...
          </div>
        )}

        {imageUrl && (
          <div className="mt-8 flex flex-col items-center">
            <img src={imageUrl} alt="AI Generated" className="max-h-[450px] rounded-xl border border-slate-700 shadow-xl mb-3" />
            <a
              href={imageUrl}
              target="_blank"
              download="ai-image.jpg"
              className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-emerald-400 font-bold px-4 py-2 rounded-lg text-xs"
            >
              ⬇️ Download Full Resolution
            </a>
          </div>
        )}
      </div>

      {/* 50+ Tools Grid (Programmatic SEO Landing) */}
      <div className="mt-12">
        <h2 className="text-lg font-bold mb-4">Browse Specialized AI Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TOOLS_LIST.map((tool) => (
            <a
              key={tool.slug}
              href={`/tool/${tool.slug}`}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-3.5 rounded-xl transition block"
            >
              <h3 className="font-bold text-xs text-slate-200">{tool.title}</h3>
              <p className="text-[10px] text-slate-500 mt-1">{tool.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Ad */}
      <div className="fixed bottom-0 inset-x-0 bg-slate-900 border-t border-slate-800 p-2.5 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs px-2">
          <span className="truncate text-slate-300">🔥 Sponsored: {adText}</span>
          <a href="https://klingai.com" target="_blank" className="bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded text-xs ml-2 whitespace-nowrap">
            Visit &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
