"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    // पुराने ऐड को साफ़ करके नया इन्वोक करें
    bannerRef.current.innerHTML = "";

    const container = document.createElement("div");
    container.id = "container-41ed1e7c5d965345f47f0bf502ff0908";

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "https://pl31273171.profitableratecpmnetwork.com/41ed1e7c5d965345f47f0bf502ff0908/invoke.js";

    bannerRef.current.appendChild(container);
    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full flex justify-center items-center my-6 min-h-[100px] overflow-hidden">
      <div ref={bannerRef} className="w-full max-w-[728px] flex justify-center items-center" />
    </div>
  );
}
