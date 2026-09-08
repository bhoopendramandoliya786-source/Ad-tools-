"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toolsData from "@/data/tools.json";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [adText, setAdText] = useState("🚀 Create 4K Hollywood Videos Free with Kling AI");

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

  const filteredTools = toolsData.filter((t) => {
    const matchesCat = selectedCategory === "All" || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

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

      {/* Top Banner Ad */}
      <div className="ad-banner rounded-xl p-3 my-6 text-center text-xs">
        <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">Sponsored Ad</span>
        <p className="font-bold text-slate-200">{adText}</p>
      </div>

      {/* Hero Search Section */}
      <div className="text-center py-6">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          Unlimited AI Tools. <span className="text-emerald-400">No Sign-up Needed.</span>
        </h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto mb-6">
          Access high-end FLUX image generators, essay writers, coding assistants, and social media tools 100% free forever.
        </p>

        {/* Live Search Bar */}
        <div className="max-w-md mx-auto relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search across 500+ AI tools (e.g. anime, tags, essay)..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 text-xs">
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

      {/* Tools Grid (Programmatic Hub) */}
      <div className="mt-8">
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
