"use client";

import React from "react";
import Link from "next/link";

// In-file AdBanner component to avoid module not found errors
function AdBanner() {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            min-height: 100px;
          }
        </style>
      </head>
      <body>
        <div id="container-41ed1e7c5d965345f47f0bf502ff0908"></div>
        <script async="async" data-cfasync="false" src="https://pl31273171.profitableratecpmnetwork.com/41ed1e7c5d965345f47f0bf502ff0908/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="w-full flex justify-center items-center my-6 overflow-hidden">
      <iframe
        title="Sponsored Ad"
        srcDoc={adHtml}
        style={{
          width: "100%",
          maxWidth: "728px",
          height: "120px",
          border: "none",
          overflow: "hidden",
        }}
        scrolling="no"
      />
    </div>
  );
}

const TOOLS = [
  {
    slug: "flux-image-generator",
    title: "FLUX 1.1 Pro AI Image Generator",
    desc: "Generate ultra-realistic 4K AI images with cinematic lighting and fine textures without any watermark.",
    badge: "MOST POPULAR",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    btnText: "Generate Image Free →",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "ai-video-generator",
    title: "Cinematic AI Video Generator (4K)",
    desc: "Turn textual prompts into dynamic video sequences with realistic motion and studio camera control.",
    badge: "TRENDING",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    btnText: "Try AI Video Studio →",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "background-remover",
    title: "Free AI Background Remover (HD)",
    desc: "Instant 1-click background eraser for portraits, ecommerce products, and logos in transparent PNG.",
    badge: "100% FREE",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    btnText: "Remove Background →",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "flux-anime-generator",
    title: "Anime & Manga Character Creator",
    desc: "Turn imagination into Makoto Shinkai & Ghibli aesthetic illustrations powered by FLUX Anime.",
    badge: "VIRAL ON REELS",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    btnText: "Create Anime Art →",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "youtube-tag-generator",
    title: "Viral YouTube Tag & Keyword Ranker",
    desc: "Find rank-1 SEO tags and keywords for your YouTube Shorts and long-form videos to blow up reach.",
    badge: "CREATOR TOOL",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    btnText: "Get Viral Tags →",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    slug: "ai-essay-writer",
    title: "College Essay & Academic Article Writer",
    desc: "Generate comprehensive academic outlines, essays, and reports with zero plagiarism.",
    badge: "ACADEMIC",
    badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    btnText: "Write Free Essay →",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
  }
];

const QUICK_LINKS = [
  { name: "Free AI Chat No Signup", slug: "flux-image-generator" },
  { name: "FLUX AI Image Studio", slug: "flux-image-generator" },
  { name: "YouTube Tag Generator", slug: "youtube-tag-generator" },
  { name: "College Essay Outline Maker", slug: "ai-essay-writer" },
  { name: "Instagram Caption Hooks", slug: "instagram-caption-generator" },
  { name: "Anime Art Generator", slug: "flux-anime-generator" },
  { name: "Resume Bullet Optimizer", slug: "resume-bullet-points" },
  { name: "Professional Email Writer", slug: "email-reply-generator" },
  { name: "AI Code Debugger", slug: "code-debugger-ai" },
  { name: "AI Background Eraser", slug: "background-remover" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col items-center">
      {/* Top Header */}
      <header className="w-full max-w-4xl px-4 py-4 flex items-center justify-between border-b border-slate-800/60">
        <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          ⚡ AI Free Forever
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/tool/ai-video-generator"
            className="text-xs bg-blue-600/30 border border-blue-500/40 text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-600/50"
          >
            🎬 AI Video
          </Link>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-400"
          >
            ☕ Coffee $1
          </a>
        </div>
      </header>

      {/* Top Native Banner Slot */}
      <div className="w-full max-w-3xl px-4">
        <AdBanner />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-2xl px-4 text-center mt-2 mb-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Free AI for chat, image generation & text to speech,{" "}
          <span className="text-emerald-400">no account needed</span>
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
          AIFreeForever is the best free AI platform for generating unlimited AI images, text content, and AI chat for free.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {["Free AI", "No login AI", "No Sign up AI", "Free Forever AI"].map((tag) => (
            <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full border border-slate-700 bg-slate-900/60 text-slate-300">
              ✓ {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Input Box */}
      <section className="w-full max-w-xl px-4 mb-4">
        <div className="bg-[#0f172a] border border-slate-700/70 rounded-2xl p-4 shadow-xl">
          <textarea
            rows={3}
            placeholder="Ask anything, solve homework, write essay, or brainstorm prompts..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex gap-3">
              <span className="cursor-pointer hover:text-slate-200">📎 Attach</span>
              <span className="cursor-pointer hover:text-slate-200">🎨 Image</span>
              <span className="cursor-pointer hover:text-slate-200">🗣️ Voice</span>
            </div>
            <Link
              href="/tool/flux-image-generator"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition"
            >
              Ask Free AI →
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="bg-[#e50914] hover:bg-red-600 text-white font-semibold text-xs px-4 py-2 rounded-full flex items-center gap-2"
          >
            ▶ Follow on YouTube <span className="bg-red-800 text-[10px] px-1.5 py-0.5 rounded-full">779</span>
          </a>
        </div>
      </section>

      {/* Tools List with Banners Between Cards */}
      <section className="w-full max-w-2xl px-4 mt-6">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-slate-100">Best Free AI tools on AIFreeForever</h2>
          <p className="text-xs text-slate-400">Direct access to industry-standard AI engines with zero paywalls.</p>
        </div>

        <div className="flex flex-col gap-6">
          {TOOLS.map((t) => (
            <React.Fragment key={t.slug}>
              <div className="bg-[#0d1424] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-44 w-full bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md border backdrop-blur-md ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-white">{t.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.desc}</p>
                  <Link
                    href={`/tool/${t.slug}`}
                    className="mt-4 inline-block bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                  >
                    {t.btnText}
                  </Link>
                </div>
              </div>

              {/* Native Banner Slot between cards */}
              <div className="w-full">
                <AdBanner />
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Popular AI Utilities Tags */}
      <section className="w-full max-w-2xl px-4 mt-8 mb-16">
        <h3 className="text-sm font-bold text-slate-300 mb-3">Popular AI Utilities</h3>
        <div className="flex flex-wrap gap-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.name}
              href={`/tool/${link.slug}`}
              className="text-xs bg-[#0f172a] border border-slate-800 hover:border-slate-600 text-slate-300 px-3 py-1.5 rounded-lg transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
