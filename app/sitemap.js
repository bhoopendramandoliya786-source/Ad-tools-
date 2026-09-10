const BASE_URL = "https://ad-tools-blue.vercel.app";

const ALL_SLUGS = [
  "flux-image-generator",
  "flux-realistic-portrait",
  "flux-anime-generator",
  "flux-cyberpunk-art",
  "youtube-tag-generator",
  "youtube-title-generator",
  "instagram-caption-generator",
  "ai-essay-writer",
  "email-reply-generator",
  "resume-bullet-points",
  "story-plot-generator",
  "code-debugger-ai",
  "background-remover",
  "ai-video-generator",
  "text-to-speech-ai",
  "ai-homework-solver",
  "blog-outline-generator",
  "meta-description-generator"
];

export default function sitemap() {
  const currentDate = new Date().toISOString();

  const routes = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const toolRoutes = ALL_SLUGS.map((slug) => ({
    url: `${BASE_URL}/tool/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...toolRoutes];
}
