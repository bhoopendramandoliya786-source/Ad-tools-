export default function robots() {
  const BASE_URL = "https://ad-tools-blue.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
