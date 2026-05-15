export interface WorkflowTool {
  name: string;
  role: string;
}

export interface WorkflowGroup {
  label: string;
  heading: string;
  tools: WorkflowTool[];
}

export const workflowGroups: WorkflowGroup[] = [
  {
    label: "AI & Agents",
    heading: "Model work, agent sessions, and assisted engineering",
    tools: [
      { name: "Claude Code", role: "implementation sessions and codebase reasoning" },
      { name: "Claude", role: "reasoning, drafting, review, and workflow design" },
      { name: "Anthropic Console", role: "prompt testing and model behavior checks" },
      { name: "Codex", role: "repo work, terminal workflows, and implementation support" },
      { name: "Cursor", role: "AI-assisted editing and local development" },
      { name: "OpenAI GPT-4o", role: "structured extraction and JSON normalization" },
    ],
  },
  {
    label: "Automation",
    heading: "No-code, low-code, and knowledge-system glue",
    tools: [
      { name: "Zapier", role: "event-driven application and follow-up automations" },
      { name: "n8n", role: "workflow orchestration and automation prototyping" },
      { name: "Google Apps Script", role: "spreadsheet automation and utility scripts" },
      { name: "Slack", role: "system notifications and team-facing workflow updates" },
      { name: "Glean", role: "knowledge retrieval across work materials" },
      { name: "Obsidian", role: "notes, research capture, and project memory" },
    ],
  },
  {
    label: "Operations",
    heading: "Application tracking and day-to-day execution layer",
    tools: [
      { name: "Google Forms", role: "manual intake for structured job-application records" },
      { name: "Google Sheets", role: "master trackers, schemas, and reporting tables" },
      { name: "Gmail", role: "confirmation, recruiter, interview, and follow-up signals" },
      { name: "Google Calendar", role: "reminders, due dates, and interview prep blocks" },
      { name: "GitHub", role: "source control, documentation, and public proof artifacts" },
      { name: "VS Code", role: "local development and integrated terminal workflows" },
      { name: "PowerShell", role: "Windows automation, validation, and command execution" },
      { name: "Markdown", role: "READMEs, validation notes, and implementation briefs" },
    ],
  },
  {
    label: "Analytics",
    heading: "Evidence, dashboards, and data-source surfaces",
    tools: [
      { name: "pytest", role: "Python regression coverage for analytics logic" },
      { name: "unittest", role: "stdlib test coverage for private workflow pilots" },
      { name: "SQLite", role: "local analytical stores and repeatable query layers" },
      { name: "Excel", role: "spreadsheet analysis and business review workflows" },
      { name: "Tableau", role: "executive dashboards and forecasting studies" },
      { name: "Power BI", role: "BI reporting and dashboard practice" },
      { name: "Streamlit", role: "interactive analytics applications" },
      { name: "Plotly", role: "charts, KPI views, and exploratory interfaces" },
      { name: "Canvas", role: "assignment workflow data and calendar automation" },
      { name: "Spotify/Spotipy", role: "OAuth API data collection and demo-safe analytics" },
      { name: "SEC EDGAR", role: "official financial-statement ETL source data" },
    ],
  },
];
