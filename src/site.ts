// Everything a visitor or a link preview sees about you, in one place.
// The URL resolves automatically on Vercel; set SITE_URL to pin a custom domain.
const url =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  url,
  name: "Azfar Suhail",
  title: "Azfar Suhail | Python Backend & Applied AI Developer",
  description:
    "Azfar Suhail is a software engineer in Karachi building Python APIs, AI applications and automation workflows with FastAPI, Docker and AWS.",
  ogDescription:
    "Software engineer in Karachi building Python APIs, AI applications and automation workflows.",
  availability: "Open to work — Jan 2027",
  email: "azfarsuhail2011@gmail.com",
  github: "https://github.com/azfarsuhail",
  linkedin: "https://www.linkedin.com/in/azfarsuhail",
  resume: "/resume.pdf",
  location: "Karachi, Pakistan — UTC+5",
} as const;
