"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const TOOLS_DATA = [
  {
    slug: "youtube-tag-generator",
    name: "YouTube Tag & Keyword Generator",
    category: "Social Media",
    type: "text",
    description: "Generate top-ranking viral tags and keywords for YouTube Shorts and Long videos."
  },
  {
    slug: "instagram-caption-generator",
    name: "Instagram Viral Caption Maker",
    category: "Social Media",
    type: "text",
    description: "Create catchy captions with hooks and trending hashtags for Instagram reels."
  },
  {
    slug: "ai-essay-writer",
    name: "AI Essay & Article Writer",
    category: "Writing",
    type: "text",
    description: "Write well-structured essays, outlines, and college papers with zero plagiarism."
  },
  {
    slug: "flux-cyberpunk-art",
    name: "Cyberpunk Neon Art Generator",
    category: "Image",
    type: "image",
    description: "Generate high-definition cyberpunk characters and futuristic cityscapes."
  },
  {
    slug: "flux-anime-generator",
    name: "Anime Character Art Generator",
    category: "Image",
    type: "image",
    description: "Transform any text idea into Japanese anime-style artwork using FLUX AI."
  },
  {
    slug: "flux-realistic-portrait",
    name: "Ultra-Realistic AI Portrait Maker",
    category: "Image",
    type: "image",
    description: "Generate photorealistic human portraits with natural skin textures and cinematic lighting."
  },
  {
    slug: "email-reply-generator",
    name: "Professional Email Writer",
    category: "Career",
    type: "text",
    description: "Write polite, corporate-ready emails and replies in seconds."
  },
  {
    slug: "resume-bullet-points",
    name: "Resume Bullet Points Enhancer",
    category: "Career",
    type: "text",
    description: "Turn your job duties into impactful, metrics-driven bullet points for resumes."
  },
  {
    slug: "story-plot-generator",
    name: "Creative Story & Plot Generator",
    category: "Writing",
    type: "text",
    description: "Brainstorm compelling plot twists, movie concepts, and fictional stories."
  },
  {
    slug: "code-debugger-ai",
    name: "Instant Code Debugger & Explainer",
    category: "Coding",
    type: "text",
    description: "Paste broken code and find errors with fixed code and explanations."
  }
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState("1024x1024");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [timer, setTimer] = useState(15);
  const [adText, setAdText] = useState("🚀 Create 4K Hollywood Videos Free with Kling AI");

  // Auto-refreshing ads engine (हर 15 सेकंड में ऐड बदलेगा)
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

  const categories = ["All", "Social Media", "Image", "Writing", "Career", "Coding"];

  const filteredTools = TOOLS_DATA.filter((t) => {
    const matchesCat = selectedCategory === "All" || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleGenerate = () => {
    if (!prompt.trim()) return alert("Please enter a prompt!");
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
        clearInterval(countdown);
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
          <span className="text-xl font-bold text-white">FreeAI<span className="text-emerald-400">Forever</span></span>
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

      {/* Main FLUX Studio Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-12">
        <h1 className="text-2xl font-bold mb-1">Free FLUX AI Image Studio</h1>
        <p className="text-xs text-slate-400 mb-4">Fast high-resolution generation. No login or signup required.</p>

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your scene: e.g. An Indian cyberpunk samurai in rainfall, 8k realistic cinematic lighting..."
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm focus:outline-none focus:border-emerald-400 mb-4 text-slate-100"
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

      {/* Programmatic Tools Search & Filter Section */}
      <div className="text-center py-4">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Specialized AI Tools. <span className="text-emerald-400">Direct Access.</span>
        </h2>
        <p className="text-xs text-slate-400 max-w-lg mx-auto mb-6">
          Access high-end generators, essay writers, coding debuggers, and tags finders.
        </p>

        {/* Live Search */}
        <div className="max-w-md mx-auto relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tools (e.g. anime, tags, essay, email)..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 text-xs mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition font-semibold ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tool/${tool.slug}`}
            className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl transition block group"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono">
                {tool.category}
              </span>
              <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition">&rarr;</span>
            </div>
            <h3 className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition">
              {tool.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {tool.description}
            </p>
          </Link>
        ))}
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
