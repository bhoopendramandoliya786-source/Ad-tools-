import "./globals.css";

export const metadata = {
  title: "Free AI Tools Hub - 100% Free Unlimited AI (No Sign-up)",
  description: "Generate AI Images, Chat, YouTube Tags and 50+ Free AI Tools with No Login Required.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-center py-2 text-xs font-semibold text-white px-2">
          ⚡ 100% Free Unlimited AI: No Login Required | FLUX & GPT Engine
        </div>
        {children}
      </body>
    </html>
  );
}
