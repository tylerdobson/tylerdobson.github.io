export type ProjectImageType =
  | "screenshot"
  | "dashboard"
  | "architecture"
  | "workflow"
  | "chart"
  | "placeholder";

export type ProjectImageStatus = "verified" | "placeholder" | "needs-replacement";

export interface ProjectImage {
  slug: string;
  src?: string;
  width?: number;
  height?: number;
  type: ProjectImageType;
  alt: string;
  caption: string;
  evidenceSource: string;
  status: ProjectImageStatus;
}

export const projectImages: ProjectImage[] = [
  {
    slug: "retail-kpi",
    src: "/images/projects/kpi-dashboard/hero.webp",
    width: 3200,
    height: 2000,
    type: "dashboard",
    alt: "Retail KPI and Forecasting Sandbox Streamlit dashboard with KPI, forecast, and recommendation panels",
    caption: "Verified KPI dashboard screenshot from the Decision Intelligence Lab repo.",
    evidenceSource:
      "GitHub: tylerdobson/mvp-for-a-decision-intelligence-lab/assets/demo/hero.png",
    status: "verified",
  },
  {
    slug: "decision-intelligence-lab-dashboard",
    src: "/images/projects/kpi-dashboard/dashboard-overview.webp",
    width: 3200,
    height: 2000,
    type: "dashboard",
    alt: "Executive overview dashboard from the Decision Intelligence Lab with retail KPI summary panels",
    caption: "Verified executive overview screenshot from the repo demo media set.",
    evidenceSource:
      "GitHub: tylerdobson/mvp-for-a-decision-intelligence-lab/assets/demo/dashboard-overview.png",
    status: "verified",
  },
  {
    slug: "spotify-analysis",
    src: "/images/projects/spotify-analytics/hero.webp",
    width: 3200,
    height: 1800,
    type: "dashboard",
    alt: "Spotify Analytics Streamlit dashboard overview with listening-history and artist analysis panels",
    caption: "Verified Spotify Analytics dashboard screenshot from the repo README media.",
    evidenceSource: "GitHub: tylerdobson/Spotify-Analytics-/assets/demo/hero.png",
    status: "verified",
  },
  {
    slug: "spotify-analysis-workflow",
    src: "/images/projects/spotify-analytics/workflow.webp",
    width: 3200,
    height: 1800,
    type: "workflow",
    alt: "Spotify Analytics playlist workflow screen with controls and analysis sections",
    caption: "Verified workflow screenshot from the Spotify Analytics demo media.",
    evidenceSource: "GitHub: tylerdobson/Spotify-Analytics-/assets/demo/workflow.png",
    status: "verified",
  },
  {
    slug: "tableau-forecasting-discount-analysis",
    src: "/images/projects/tableau-forecasting-discount-analysis/dashboard.webp",
    width: 1536,
    height: 1024,
    type: "dashboard",
    alt: "Tableau forecasting and discount analysis dashboard with sales, profit, discount, and forecast views",
    caption: "Verified Tableau dashboard export from the repository README.",
    evidenceSource:
      "GitHub: tylerdobson/tableau-forecasting-discount-analysis/0cfa84ad-c4a3-4243-87e5-c306cde19fef.png",
    status: "verified",
  },
  {
    slug: "job-application-automation",
    type: "architecture",
    alt: "Job Application Automation architecture diagram",
    caption:
      "Local case-study architecture diagram is used; the linked GitHub repo is private or unavailable from the current GitHub context.",
    evidenceSource: "Portfolio case study: src/components/ArchitectureDiagram.astro",
    status: "placeholder",
  },
  {
    slug: "job-market-skill-radar",
    type: "placeholder",
    alt: "Job Market Skill Radar project image placeholder",
    caption:
      "Private active project; needs a public-safe screenshot before visual promotion.",
    evidenceSource: "Resume highlight only; no public GitHub media located.",
    status: "needs-replacement",
  },
  {
    slug: "sec-pipeline",
    type: "placeholder",
    alt: "SEC Financial Statement Pipeline project image placeholder",
    caption: "Needs a public-safe pipeline diagram or output screenshot.",
    evidenceSource: "GitHub repo inspected; no image assets or README media located.",
    status: "needs-replacement",
  },
  {
    slug: "airbnb-market-intelligence",
    type: "placeholder",
    alt: "Airbnb Market Intelligence project image placeholder",
    caption: "Needs a public-safe Streamlit or Tableau dashboard screenshot.",
    evidenceSource: "GitHub repo inspected; no image assets or README media located.",
    status: "needs-replacement",
  },
];

export function getProjectImage(slug: string): ProjectImage | undefined {
  return projectImages.find((image) => image.slug === slug && image.status === "verified");
}
