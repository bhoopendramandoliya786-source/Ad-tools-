import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://education-platform1.vercel.app"),
  title: "AI Free Forever - 100% Free Unlimited AI Tools (No Sign-up)",
  description: "Free AI platform for FLUX 4K image generation, YouTube viral tags, AI essay writing, and background removal. No login or credit card required.",
  keywords: [
    "free ai generator",
    "flux ai free no login",
    "youtube tags generator free",
    "ai essay writer no signup",
    "free midjourney alternative",
    "unlimited ai tools"
  ],
  openGraph: {
    title: "AI Free Forever - Unlimited AI Suite",
    description: "Generate 4K images, viral YouTube tags, and essays for free with zero sign-up.",
    url: "https://education-platform1.vercel.app",
    siteName: "AI Free Forever",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://education-platform1.vercel.app" />
        {/* Google Schema Markup for Instant Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "AI Free Forever",
              "url": "https://education-platform1.vercel.app",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className="bg-[#070b14] text-slate-100 antialiased selection:bg-emerald-500 selection:text-black">
        {children}

        {/* Adsterra Official Social Bar Script */}
        <Script
          src="https://pl31272224.profitableratecpmnetwork.com/23/a4/81/23a481987c4cec3af51167586e84a09b.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
        }
