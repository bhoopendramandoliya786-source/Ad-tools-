import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ 
        text: "Error: GEMINI_API_KEY missing in Vercel Environment Variables. Please add it and Redeploy." 
      });
    }

    // Official Google Gemini 1.5 Flash endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7
        }
      })
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ text: `Gemini API Error: ${data.error.message}` });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json({ text: "AI was unable to formulate a response. Please refine your prompt." });
    }

    return NextResponse.json({ text: reply });
  } catch (err) {
    return NextResponse.json({ text: `System Error: ${err.message}` }, { status: 500 });
  }
}
