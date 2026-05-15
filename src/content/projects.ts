import type { ProjectImage } from "./projectImages.ts";
import { getProjectImage } from "./projectImages.ts";

export type TechTag = string;

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectCardData {
  slug: string;
  title: string;
  description: string;
  tech: TechTag[];
  image?: ProjectImage;
  finding?: string;
  links: ProjectLink[];
}

export interface SmallProjectData {
  slug: string;
  title: string;
  description: string;
  tech: TechTag[];
  repo: string;
  image?: ProjectImage;
}

export const flagshipProject = {
  title: "Job Application Automation System",
  oneLine:
    "A multi-agent AI workflow that ingests job applications, classifies recruiter emails, scores fit, drafts follow-ups, and runs my entire job search on autopilot.",
  body: "I built this because I was applying to dozens of roles a week and losing track of every one. Eight integrated tools, two LLMs with distinct responsibilities (GPT for structured extraction, Claude for reasoning and writing), event-driven Gmail detection, scheduled follow-up loops, and GitHub as the source of truth for prompts, scripts, and documentation. It's not a tutorial project — it's running my actual job search right now.",
  stats: [
    { value: "8", label: "TOOLS INTEGRATED" },
    { value: "2", label: "LLM AGENTS" },
    { value: "5", label: "EVENT-DRIVEN ZAPS" },
    { value: "23", label: "TRACKED FIELDS" },
  ],
  tech: [
    "Google Forms",
    "Google Sheets",
    "Zapier",
    "OpenAI GPT-4o",
    "Anthropic Claude",
    "Gmail",
    "Google Calendar",
    "GitHub",
    "Google Apps Script",
  ],
  caseStudyHref: "/projects/job-application-automation/",
  repoHref: "https://github.com/tylerdobson/job-application-automation",
};

export const caseStudies: ProjectCardData[] = [
  {
    slug: "retail-kpi",
    title: "Retail KPI & Forecasting Sandbox",
    description:
      "A retail KPI sample workflow that turns modeled operating data into KPIs, forecast ranges, scenario tests, exports, and executive recommendations.",
    tech: ["Python", "SQL", "Streamlit", "SQLite", "Plotly", "pytest"],
    image: getProjectImage("retail-kpi"),
    finding:
      "Finding: The recommendation engine flags low-margin, high-volume segments as risk — one example action is to improve product economics before pushing more volume.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/tylerdobson/mvp-for-a-decision-intelligence-lab",
        external: true,
      },
      {
        label: "Demo video",
        href: "https://github.com/tylerdobson/mvp-for-a-decision-intelligence-lab/blob/main/assets/demo/demo.webm",
        external: true,
      },
      {
        label: "Validation notes",
        href: "https://github.com/tylerdobson/mvp-for-a-decision-intelligence-lab/blob/main/docs/PORTFOLIO_PROOF.md",
        external: true,
      },
    ],
  },
  {
    slug: "spotify-analysis",
    title: "Spotify Analytics Dashboard",
    description:
      "A professional dashboard for personal Spotify analytics with API data collection, playlist workflows, local persistence, and a demo-safe public review path.",
    tech: ["Python", "Streamlit", "Spotipy", "SQLite", "Plotly", "OAuth"],
    image: getProjectImage("spotify-analysis"),
    finding:
      "Finding: In May 2026, saved listening history showed a repeat-listening pattern — leading artist at 8 plays, top repeated track at 4 plays, turning a raw API feed into a behavioral insight.",
    links: [
      {
        label: "Repository",
        href: "https://github.com/tylerdobson/Spotify-Analytics-",
        external: true,
      },
      {
        label: "Demo video",
        href: "https://github.com/tylerdobson/Spotify-Analytics-/blob/main/assets/demo/demo.mp4",
        external: true,
      },
      {
        label: "Validation notes",
        href: "https://github.com/tylerdobson/Spotify-Analytics-/blob/main/docs/PORTFOLIO_PROOF.md",
        external: true,
      },
    ],
  },
  {
    slug: "sec-pipeline",
    title: "SEC Financial Statement Pipeline",
    description:
      "Reproducible Python ETL that pulls official SEC EDGAR company facts, standardizes financial metrics, and publishes CSV, SQLite, and Markdown outputs.",
    tech: ["Python", "SEC EDGAR API", "SQLite", "ETL"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/tylerdobson/sec-financial-statement-pipeline",
        external: true,
      },
    ],
  },
];

export const moreProjects: SmallProjectData[] = [
  {
    slug: "airbnb-market-intelligence",
    title: "Airbnb Market Intelligence Dashboard",
    description:
      "End-to-end short-term rental analytics with SQLite storage, KPI calculations, Plotly visualizations, and an interactive Streamlit dashboard.",
    tech: ["Python", "SQL", "Streamlit", "Plotly"],
    repo: "https://github.com/tylerdobson/airbnb-market-intelligence-dashboard",
  },
  {
    slug: "canvas-assignment-calendar-agent",
    title: "Canvas Assignment Calendar Agent",
    description:
      "Python automation that reads Canvas assignments, finds incomplete work due today, and creates or updates Google Calendar events.",
    tech: ["Python", "Canvas API", "Google Calendar"],
    repo: "https://github.com/tylerdobson/Canvas-Assignment-Calendar-Agent",
  },
  {
    slug: "sales-data-cleaning-standardization",
    title: "Sales Data Cleaning Pipeline",
    description:
      "Cleaning pipeline that converts inconsistent monthly sales exports into validated, analysis-ready files with rejected-record handling.",
    tech: ["Python", "Pandas", "SQLite"],
    repo: "https://github.com/tylerdobson/sales-data-cleaning-standardization",
  },
  {
    slug: "sql-retail-revenue-analysis",
    title: "SQL Retail Revenue Analysis",
    description:
      "Relational SQL analysis of customers, products, orders, revenue by region, top customers, best-selling products, and trends.",
    tech: ["SQL", "SQLite"],
    repo: "https://github.com/tylerdobson/sql-retail-revenue-analysis",
  },
  {
    slug: "tableau-forecasting-discount-analysis",
    title: "Tableau Forecasting & Discount Analysis",
    description:
      "Executive-style dashboard on sales performance, profitability, discount behavior, and regional comparison.",
    tech: ["Tableau", "BI"],
    repo: "https://github.com/tylerdobson/tableau-forecasting-discount-analysis",
    image: getProjectImage("tableau-forecasting-discount-analysis"),
  },
  {
    slug: "sql-labor-market-intelligence",
    title: "SQL Labor Market Intelligence",
    description:
      "Warehouse-style SQL project using dimension tables, fact tables, reusable views, and quality checks.",
    tech: ["SQL", "Data Modeling"],
    repo: "https://github.com/tylerdobson/sql-labor-market-intelligence",
  },
  {
    slug: "job-application-quick-fill",
    title: "Job Application Quick-Fill",
    description:
      "Python CLI for searching saved application answers, filling template variables, and tracking usage.",
    tech: ["Python", "CLI"],
    repo: "https://github.com/tylerdobson/Job-Application-Quick-Fill",
  },
];

export const skillTiers = [
  {
    tier: "AI / ML",
    label: "Systems and model workflows",
    items: [
      "Prompt engineering and structured extraction (OpenAI GPT-4o, Anthropic Claude)",
      "Multi-agent orchestration with role separation (extraction vs. reasoning)",
      "Event-driven AI workflows (Zapier + LLM)",
      "LLM evaluation and output validation",
    ],
  },
  {
    tier: "Data engineering",
    label: "Pipelines and analytical stores",
    items: [
      "ETL pipeline design (SEC EDGAR, Spotify, Canvas APIs)",
      "Schema design and SQLite-backed analytics stores",
      "API integration with OAuth, token caching, retry handling",
      "Reproducible data generation and validation",
    ],
  },
  {
    tier: "Analytics / SQL",
    label: "Business logic and quality checks",
    items: [
      "SQLite, complex joins, aggregations, ranking, window functions",
      "Data quality checks and rejected-record handling",
      "pandas, KPI engines, forecasting helpers, scenario models",
      "Tested business calculations with pytest",
    ],
  },
  {
    tier: "BI / Communication",
    label: "Dashboards and documentation",
    items: [
      "Streamlit, Plotly, Tableau, Power BI, Excel",
      "Executive dashboard design and export workflows",
      "READMEs, data dictionaries, methodology notes, validation docs",
      "Interview-ready explanations",
    ],
  },
];

export const approachSteps = [
  {
    number: "01",
    title: "Map the system",
    body: "Identify the trigger, the data, the decisions, and the downstream effects. Sketch the architecture before writing code.",
  },
  {
    number: "02",
    title: "Build with tests in mind",
    body: "Clean inputs, standardized fields, validated calculations, and a separation between demo-safe records and private workflows.",
  },
  {
    number: "03",
    title: "Make it usable",
    body: "Streamlit, Tableau, CLI, or static report — whatever the audience actually needs. Filters, comparisons, exports, scenarios.",
  },
  {
    number: "04",
    title: "Explain the takeaway",
    body: "State the assumptions, the limitations, and the recommendation. Validation docs and interview-ready explanations included.",
  },
];
