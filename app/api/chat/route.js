import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // अगर API Key नहीं डाली है, तो फ्री फॉलबैक चलेगा
    if (!apiKey) {
      return NextResponse.json({
        text: `Free AI Preview: ${prompt}\n\n(Tip: Add GEMINI_API_KEY in Vercel settings for full intelligence)`
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate response. Please try again.";

    return NextResponse.json({ text: reply });
  } catch (err) {
    return NextResponse.json({ error: "Server error occurred" }, { status: 500 });
  }
                            }
