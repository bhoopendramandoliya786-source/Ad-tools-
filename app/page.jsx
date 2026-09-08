"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FEATURED_TOOLS = [
  {
    slug: "flux-image-generator",
    title: "FLUX 1.1 Pro AI Image Generator",
    desc: "Generate ultra-realistic 4K AI images with cinematic lighting and fine textures without any watermark.",
    badge: "Most Popular",
    cta: "Generate Image Free",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    link: "/tool/flux-realistic-portrait"
  },
  {
    slug: "ai-video-generator",
    title: "Cinematic AI Video Generator (4K)",
    desc: "Transform text and photos into Hollywood-style 60fps video motions. Free credits daily.",
    badge: "Trending",
    cta: "Try AI Video Studio",
    img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&auto=format&fit=crop&q=80",
    link: "https://klingai.com",
    external: true
  },
  {
    slug: "background-remover",
    title: "Free AI Background Remover (HD)",
    desc: "Instant 1-click background eraser for portraits, ecommerce products, and logos in transparent PNG.",
    badge: "100% Free",
    cta: "Remove Background",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    link: "/tool/code-debugger-ai"
  },
  {
    slug: "anime-art-maker",
    title: "Anime & Manga Character Creator",
    desc: "Turn imagination into Makoto Shinkai & Ghibli aesthetic illustrations powered by FLUX Anime.",
    badge: "Viral on Reels",
    cta: "Create Anime Art",
    img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    link: "/tool/flux-anime-generator"
  },
  {
    slug: "youtube-tag-generator",
    title: "Viral YouTube Tag & Keyword Ranker",
    desc: "Find rank-1 SEO tags and keywords for your YouTube Shorts and long-form videos to blow up reach.",
    badge: "Creator Tool",
    cta: "Get Viral Tags",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80",
    link: "/tool/youtube-tag-generator"
  },
  {
    slug: "ai-essay-writer",
    title: "College Essay & Academic Article Writer",
    desc: "Generate comprehensive academic outlines, essays, and reports with zero plagiarism.",
    badge: "Academic",
    cta: "Write Free Essay",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    link: "/tool/ai-essay-writer"
  }
];

const SEO_FOOTER_LINKS = [
  "Free AI Chat No Signup", "FLUX AI Image Studio", "YouTube Tag Generator", 
  "College Essay Outline Maker", "Instagram Caption Hooks", "Anime Art Generator", 
  "Resume Bullet Optimizer", "Professional Email Writer", "AI Code Debugger", 
  "Story Twist Generator", "B&W Photo Colorizer", "AI Background Eraser",
  "Free Midjourney Alternative", "Free ChatGPT 4o Mini", "AI Voiceover Speech"
];

export default function HomePage() {
  const [chatInput, setChatInput] = useState("");
  const [chatOutput, setChatOutput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [adIndex, setAdIndex] = useState(0);

  const ads = [
    { title: "🎨 Adobe Illustrator: Generative Vector Fill & Text to Graphic", link: "https://adobe.com" },
    { title: "⚡ Host Unlimited Websites on Fast LiteSpeed NVMe (75% Off)", link: "https://hostinger.in" },
    { title: "🚀 Create 4K AI Cinematic Videos with Kling AI - Free Trial", link: "https://klingai.com" }
  ];

  // Auto-refresh ads every 15s
  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ads.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [ads.length]);

  const handleHeroChat = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    setChatOutput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: chatInput })
      });
      const data = await res.json();
      setChatOutput(data.text || data.error || "No response received");
    } catch {
      setChatOutput("Network error. Please try again.");
    }
    setChatLoading(false);
  };

  return (
    <div className="bg-[#070b14] text-slate-200 min-h-screen font-sans pb-28">
      
      {/* Top Green Notification */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs py-2 px-4 text-center font-medium">
        ⚡ Free AI for chat, image generation & text to speech. 100% Free Forever, No Signup Needed.
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0d1322]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-base">⚡</span>
            <span className="text-lg font-black tracking-tight text-white">AI Free <span className="text-emerald-400">Forever</span></span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a href="https://klingai.com" target="_blank" className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg font-semibold">
              🎬 AI Video
            </a>
            <a href="#support" className="bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg">
              ☕ Coffee $1
            </a>
          </div>
        </div>
      </header>

      {/* 1. TOP HEADER AUTO-REFRESH AD */}
      <div className="max-w-3xl mx-auto px-4 mt-4">
        <div className="ad-banner rounded-xl p-3 text-center min-h-[90px] flex flex-col items-center justify-center border border-dashed border-slate-700 bg-slate-900/60">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">Sponsored Advertisement</span>
          <p className="font-bold text-slate-200 text-xs sm:text-sm">{ads[adIndex].title}</p>
          <a href={ads[adIndex].link} target="_blank" className="mt-2 bg-emerald-500 text-slate-950 text-xs font-bold px-4 py-1 rounded hover:bg-emerald-400">
            Explore Now &rarr;
          </a>
        </div>
      </div>

      {/* HERO SECTION (Chat & Multi-tab box) */}
      <section className="max-w-3xl mx-auto px-4 pt-8 text-center">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
          Free AI for chat, image generation & text to speech, <span className="text-emerald-400">no account needed</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-5">
          AIFreeForever is the best free AI platform for generating unlimited AI images, text content, and AI chat for free.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs">
          <span className="bg-slate-900 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full font-medium">✓ Free AI</span>
          <span className="bg-slate-900 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full font-medium">✓ No login AI</span>
          <span className="bg-slate-900 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full font-medium">✓ No Sign up AI</span>
          <span className="bg-slate-900 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full font-medium">✓ Free Forever AI</span>
        </div>

        {/* Universal Hero Chat Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl text-left">
          <textarea
            rows={3}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask anything, solve homework, write essay, or brainstorm prompts..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="cursor-pointer hover:text-emerald-400">📎 Attach Homework</span>
              <span className="cursor-pointer hover:text-emerald-400">🎨 Create AI Image</span>
              <span className="cursor-pointer hover:text-emerald-400">🎙️ AI Voice</span>
            </div>
            <button
              onClick={handleHeroChat}
              disabled={chatLoading}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-5 py-2 rounded-xl text-xs transition"
            >
              {chatLoading ? "Thinking..." : "Ask Free AI &rarr;"}
            </button>
          </div>

          {chatOutput && (
            <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {chatOutput}
            </div>
          )}
        </div>

        {/* Social Proof / YouTube Bar */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://youtube.com" target="_blank" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2">
            ▶ Follow on YouTube <span className="bg-black/30 px-1.5 py-0.5 rounded text-[10px]">779</span>
          </a>
        </div>
      </section>

      {/* 2. MID-FEED AUTO-REFRESH AD */}
      <div className="max-w-3xl mx-auto px-4 my-8">
        <div className="ad-banner rounded-xl p-4 text-center border border-dashed border-slate-700 bg-slate-900/60">
          <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">Sponsored Ad</span>
          <p className="font-bold text-slate-200 text-xs sm:text-sm">{ads[(adIndex + 1) % ads.length].title}</p>
        </div>
      </div>

      {/* VERTICAL TOOL CARDS FEED (बिल्कुल स्क्रीनशॉट की तरह लंबा स्क्रॉल) */}
      <section className="max-w-3xl mx-auto px-4 space-y-8">
        <div className="text-center">
          <h2 className="text-xl font-black text-white">Best Free AI tools on AIFreeForever</h2>
          <p className="text-xs text-slate-400 mt-1">Direct access to industry-standard AI engines with zero paywalls.</p>
        </div>

        {FEATURED_TOOLS.map((tool, idx) => (
          <div key={tool.slug} className="space-y-6">
            
            {/* Tool Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition">
              <div className="h-48 sm:h-64 w-full overflow-hidden relative">
                <img src={tool.img} alt={tool.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {tool.badge}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{tool.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">{tool.desc}</p>
                <Link
                  href={tool.link}
                  target={tool.external ? "_blank" : "_self"}
                  className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg"
                >
                  {tool.cta} &rarr;
                </Link>
              </div>
            </div>

            {/* AD BANNER BETWEEN EVERY SINGLE TOOL CARD */}
            <div className="ad-banner rounded-xl p-3.5 text-center border border-dashed border-slate-700 bg-slate-900/40">
              <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-0.5">Sponsored Partner</span>
              <p className="font-semibold text-slate-300 text-xs">{ads[(adIndex + idx) % ads.length].title}</p>
            </div>

          </div>
        ))}
      </section>

      {/* BOTTOM DIRECTORY FOOTER (Programmatic SEO हज़ारों रैंकिंग्स के लिए) */}
      <footer className="max-w-3xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800">
        <h4 className="text-sm font-bold text-slate-300 mb-4">Popular AI Utilities</h4>
        <div className="flex flex-wrap gap-2 text-xs">
          {SEO_FOOTER_LINKS.map((linkText) => (
            <Link
              key={linkText}
              href="/tool/youtube-tag-generator"
              className="bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 px-3 py-1.5 rounded-lg transition"
            >
              {linkText}
            </Link>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mt-8 text-center">
          © 2026 AIFreeForever Clone Hub. All rights reserved. Free AI Utilities for everyone.
        </p>
      </footer>

      {/* 3. STICKY BOTTOM AD BAR (Fixed Everywhere) */}
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
