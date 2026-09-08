"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const TOOLS_DATA = [
  {
    slug: "youtube-tag-generator",
    name: "YouTube Tag & Keyword Generator",
    category: "Social Media",
    type: "text",
    description: "Generate top-ranking viral tags and keywords for YouTube Shorts and Long videos.",
    promptPrefix: "Generate 20 high-ranking, comma-separated YouTube tags and keywords for this video topic:"
  },
  {
    slug: "instagram-caption-generator",
    name: "Instagram Viral Caption Maker",
    category: "Social Media",
    type: "text",
    description: "Create catchy captions with hooks and trending hashtags for Instagram reels.",
    promptPrefix: "Write 3 engaging Instagram captions with viral hooks and 15 relevant hashtags for:"
  },
  {
    slug: "ai-essay-writer",
    name: "AI Essay & Article Writer",
    category: "Writing",
    type: "text",
    description: "Write well-structured essays, outlines, and college papers with zero plagiarism.",
    promptPrefix: "Write a well-structured, comprehensive essay with an introduction, key arguments, and a conclusion on:"
  },
  {
    slug: "flux-cyberpunk-art",
    name: "Cyberpunk Neon Art Generator",
    category: "Image",
    type: "image",
    description: "Generate high-definition cyberpunk characters and futuristic cityscapes.",
    promptSuffix: "cyberpunk style, neon glow, futuristic city, highly detailed, 8k resolution, cinematic lighting"
  },
  {
    slug: "flux-anime-generator",
    name: "Anime Character Art Generator",
    category: "Image",
    type: "image",
    description: "Transform any text idea into Japanese anime-style artwork using FLUX AI.",
    promptSuffix: "masterpiece anime artwork, makoto shinkai style, vibrant colors, studio ghibli aesthetic, ultra high detail"
  },
  {
    slug: "flux-realistic-portrait",
    name: "Ultra-Realistic AI Portrait Maker",
    category: "Image",
    type: "image",
    description: "Generate photorealistic human portraits with natural skin textures and cinematic lighting.",
    promptSuffix: "photorealistic portrait, 85mm lens, natural lighting, sharp focus, skin pores, 8k uhd"
  },
  {
    slug: "email-reply-generator",
    name: "Professional Email Writer",
    category: "Career",
    type: "text",
    description: "Write polite, corporate-ready emails and replies in seconds.",
    promptPrefix: "Write a professional, polite, and clear corporate email response regarding:"
  },
  {
    slug: "resume-bullet-points",
    name: "Resume Bullet Points Enhancer",
    category: "Career",
    type: "text",
    description: "Turn your job duties into impactful, metrics-driven bullet points for resumes.",
    promptPrefix: "Rewrite these job responsibilities into 5 impactful, metric-driven resume bullet points starting with strong action verbs:"
  },
  {
    slug: "story-plot-generator",
    name: "Creative Story & Plot Generator",
    category: "Writing",
    type: "text",
    description: "Brainstorm compelling plot twists, movie concepts, and fictional stories.",
    promptPrefix: "Develop a captivating fiction story plot outline with character motivations and a surprise plot twist based on:"
  },
  {
    slug: "code-debugger-ai",
    name: "Instant Code Debugger & Explainer",
    category: "Coding",
    type: "text",
    description: "Paste broken code and find errors with fixed code and explanations.",
    promptPrefix: "Find the bugs in the following code, explain the issue simply, and provide the corrected version:"
  }
];

export default function DynamicToolPage({ params }) {
  const { slug } = params;
  const tool = TOOLS_DATA.find((t) => t.slug === slug) || {
    name: slug.replace(/-/g, " "),
    category: "General",
    type: "text",
    description: "Free unlimited AI utility tool without any signup.",
    promptPrefix: "Respond helpfully to:"
  };

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(15);
  const [adText, setAdText] = useState("⚡ Kling AI: Generate 4K Cinematic Clips Free");

  useEffect(() => {
    const ads = [
      "⚡ Kling AI: Generate 4K Cinematic Clips Free",
      "🔥 Host Unlimited Websites on Fast LiteSpeed NVMe (75% Off)",
      "🎨 Adobe Firefly Vector AI: Free Beta Trial"
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % ads.length;
      setAdText(ads[i]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async () => {
    if (!input.trim()) return alert("Please enter your prompt/details!");
    setLoading(true);
    setOutput("");
    setTimer(15);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    if (tool.type === "image") {
      const promptText = `${input}, ${tool.promptSuffix || "high quality, 8k"}`;
      const seed = Math.floor(Math.random() * 999999);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=1024&height=1024&model=flux&seed=${seed}&nologo=true`;
      
      const img = new Image();
      img.src = url;
      img.onload = () => {
        clearInterval(interval);
        setOutput(url);
        setLoading(false);
      };
    } else {
      try {
        const fullPrompt = `${tool.promptPrefix || "Help with:"} ${input}`;
        const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}`);
        const text = await res.text();
        clearInterval(interval);
        setOutput(text);
      } catch {
        setOutput("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <Link href="/" className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1">
          &larr; Back to 500+ Tools
        </Link>
        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">Category: {tool.category}</span>
      </div>

      <div className="ad-banner rounded-xl p-3 mb-6 text-center text-xs">
        <span className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1">Sponsored Ad</span>
        <p className="font-bold text-slate-200">{adText}</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <h1 className="text-2xl font-black text-white mb-1">{tool.name}</h1>
        <p className="text-xs text-slate-400 mb-6">{tool.description}</p>

        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={tool.type === "image" ? "Describe the image you want to generate..." : "Enter your topic, keywords, or text here..."}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm focus:outline-none focus:border-emerald-400 text-slate-100 mb-4"
        />

        <button
          onClick={handleAction}
          disabled={loading}
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition"
        >
          {loading ? `AI Processing (${timer}s)...` : `Generate with ${tool.name}`}
        </button>

        {loading && (
          <div className="mt-6 text-xs text-emerald-400 animate-pulse text-center">
            Communicating with GPU cluster... Please do not close the window.
          </div>
        )}

        {output && tool.type === "image" && (
          <div className="mt-6 flex flex-col items-center">
            <img src={output} alt="Generated AI Artwork" className="max-h-[450px] rounded-xl border border-slate-700 shadow-xl mb-3" />
            <a
              href={output}
              target="_blank"
              download="artwork.jpg"
              className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-emerald-400 font-bold px-4 py-2 rounded-lg text-xs"
            >
              ⬇️ Download Full Resolution
            </a>
          </div>
        )}

        {output && tool.type !== "image" && (
          <div className="mt-6 bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
            {output}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-slate-900 border-t border-slate-800 p-2.5 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs px-2">
          <span className="truncate text-slate-300">⚡ {adText}</span>
          <a href="https://klingai.com" target="_blank" className="bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded text-xs ml-2 whitespace-nowrap">
            Check Now &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
