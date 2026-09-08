import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    const apiKey = (process.env.GEMINI_API_KEY || "").trim();

    // 1. अगर API Key नहीं है तो साफ़ बताओ
    if (!apiKey) {
      return NextResponse.json({
        text: "Error: GEMINI_API_KEY Vercel में नहीं मिली। कृपया Vercel Settings -> Environment Variables में GEMINI_API_KEY जोड़कर Redeploy करें।"
      });
    }

    // 2. Official Gemini 1.5 Flash Call
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

    // अगर Google की तरफ से कोई एरर आए (जैसे Invalid Key या Quota)
    if (data.error) {
      return NextResponse.json({
        text: `Google Gemini API Error: ${data.error.message || "Invalid Key / Quota"}`
      });
    }

    const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!outputText) {
      return NextResponse.json({
        text: "AI response empty. Please try a different topic."
      });
    }

    return NextResponse.json({ text: outputText });

  } catch (err) {
    return NextResponse.json({ text: `Server Fetch Error: ${err.message}` }, { status: 500 });
  }
}
