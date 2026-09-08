import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = (process.env.GEMINI_API_KEY || "").trim();

    if (!apiKey) {
      return NextResponse.json({
        text: "Error: GEMINI_API_KEY Vercel Environment Variables में नहीं मिली।"
      });
    }

    // Google Generative Language API Endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await res.json();

    // अगर Google कोई एरर लौटाए तो स्क्रीन पर साफ़ एरर दिखाएँ
    if (data.error) {
      return NextResponse.json({
        text: `Google API Error (${data.error.code}): ${data.error.message}`
      });
    }

    const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!outputText) {
      return NextResponse.json({
        text: "AI response empty. Please try a different prompt."
      });
    }

    return NextResponse.json({ text: outputText });

  } catch (err) {
    return NextResponse.json({ text: `Connection Error: ${err.message}` }, { status: 500 });
  }
}
