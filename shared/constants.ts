export const siteConfig = {
  name: "AchieveLog",
  title: "AchieveLog – AI-Powered Work Achievement Tracker",
  tagline: "Document. Reflect. Grow.",
  description:
    "AchieveLog is a personal achievement tracker for professionals. Seamlessly document, organize, and leverage your work accomplishments across roles and companies. Analyze your growth, set career goals, and prepare for reviews—all powered by real-time AI insights.",
  email: "contact@achievelog.ai",
  url:
    process.env.NODE_ENV === "production"
      ? "https://achievelog.ai"
      : "http://localhost:8080",
};
