export type WorkflowNodeGroup =
  | "capture"
  | "second-brain"
  | "ai"
  | "data"
  | "automation"
  | "analytics"
  | "validation"
  | "output";

export type WorkflowNodeConfidence = "verified" | "likely" | "needs-review";
export type WorkflowNodeVisibility = "public" | "private-only" | "do-not-show";

export interface WorkflowNode {
  id: string;
  label: string;
  group: WorkflowNodeGroup;
  tools: string[];
  role: string;
  confidence: WorkflowNodeConfidence;
  visibility: WorkflowNodeVisibility;
  evidenceSource: string;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  label?: string;
}

export const workflowNodes: WorkflowNode[] = [
  {
    id: "capture",
    label: "Capture",
    group: "capture",
    tools: ["Forms", "Gmail", "Calendar", "GitHub"],
    role: "messy inputs and operating signals",
    confidence: "verified",
    visibility: "public",
    evidenceSource: "Portfolio flagship case study, resume page, and linked project metadata",
  },
  {
    id: "second-brain",
    label: "Second Brain",
    group: "second-brain",
    tools: ["Obsidian", "Markdown", "briefs", "changelogs"],
    role: "planning, assumptions, decisions, and backlog memory",
    confidence: "verified",
    visibility: "public",
    evidenceSource: "Resume highlights and public-safe local Second Brain inventory",
  },
  {
    id: "ai",
    label: "AI implementation",
    group: "ai",
    tools: ["Claude", "Claude Code", "Codex", "ChatGPT", "GPT-4o", "Cursor"],
    role: "extraction, coding, reasoning, and review loops",
    confidence: "verified",
    visibility: "public",
    evidenceSource: "Portfolio case study, resume page, and public-safe local workflow evidence",
  },
  {
    id: "data",
    label: "Data layer",
    group: "data",
    tools: ["Python", "pandas", "SQL", "SQLite", "APIs"],
    role: "ETL, schema design, stores, and analysis logic",
    confidence: "verified",
    visibility: "public",
    evidenceSource: "Linked GitHub project READMEs, project metadata, and resume page",
  },
  {
    id: "analytics",
    label: "Analytics surfaces",
    group: "analytics",
    tools: ["Tableau", "Power BI", "Streamlit", "Plotly"],
    role: "dashboards and reviewable analytical interfaces",
    confidence: "verified",
    visibility: "public",
    evidenceSource: "Resume page, project metadata, and verified project screenshots",
  },
  {
    id: "automation",
    label: "Automation",
    group: "automation",
    tools: ["Zapier", "n8n", "GitHub Actions"],
    role: "events, orchestration, scheduled work, and deployment",
    confidence: "verified",
    visibility: "public",
    evidenceSource: "Portfolio flagship case study, resume page, and project READMEs",
  },
  {
    id: "validation",
    label: "Validation",
    group: "validation",
    tools: ["pytest", "unittest", "README", "checklists"],
    role: "test coverage, method notes, limitations, and public-readiness checks",
    confidence: "verified",
    visibility: "public",
    evidenceSource: "Linked GitHub READMEs, resume page, and portfolio approach section",
  },
  {
    id: "output",
    label: "Portfolio outputs",
    group: "output",
    tools: ["dashboards", "reports", "case studies"],
    role: "public artifacts that a reviewer can inspect",
    confidence: "verified",
    visibility: "public",
    evidenceSource: "Portfolio homepage, project case studies, and linked GitHub docs",
  },
];

export const workflowEdges: WorkflowEdge[] = [
  { from: "capture", to: "second-brain", label: "organize" },
  { from: "second-brain", to: "ai", label: "brief" },
  { from: "second-brain", to: "data", label: "build" },
  { from: "ai", to: "data", label: "implement" },
  { from: "data", to: "analytics", label: "surface" },
  { from: "data", to: "automation", label: "trigger" },
  { from: "data", to: "validation", label: "test" },
  { from: "automation", to: "output", label: "ship" },
  { from: "analytics", to: "output", label: "publish" },
  { from: "validation", to: "output", label: "document" },
];

export const visibleWorkflowNodes = workflowNodes.filter(
  (node) => node.visibility === "public" && node.confidence === "verified",
);

export function getVisibleWorkflowNode(id: string): WorkflowNode | undefined {
  return visibleWorkflowNodes.find((node) => node.id === id);
}
