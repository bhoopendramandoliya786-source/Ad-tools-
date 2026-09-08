"use client";

import { useState } from "react";
import Link from "next/link";

export default function DynamicToolPage({ params }) {
  const { slug } = params;
  const toolName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!input) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(`Act as an expert in ${toolName}. For this input: ${input}, provide a top-notch response:`)}`);
      const data = await res.text();
      setOutput(data);
    } catch {
      setOutput("Error processing request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="text-xs text-emerald-400 hover:underline mb-4 inline-block">&larr; Back to All Tools</Link>
      
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2">{toolName} Free</h1>
        <p className="text-xs text-slate-400 mb-6">Use this free AI generator without any limits, signups or subscription fees.</p>

        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter details for ${toolName}...`}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm focus:outline-none focus:border-emerald-400 mb-4"
        />

        <button
          onClick={handleRun}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition"
        >
          {loading ? "Generating..." : `Generate with ${toolName}`}
        </button>

        {output && (
          <div className="mt-6 bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}
