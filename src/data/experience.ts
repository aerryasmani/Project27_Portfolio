export interface Job {
  dates: string;
  /** Natural case — the Experience row uppercases it with CSS */
  company: string;
  role: string;
  summary: string;
  current?: boolean;
}

// Rendered in this exact order (newest first) — no sorting anywhere.
export const experience: Job[] = [
  {
    dates: 'JUL 2026 — NOW',
    company: 'NETS Malaysia',
    role: 'Senior QA Automation Engineer',
    summary:
      'First dedicated automation engineer. Took a fully manual process and an empty repo to a Selenium smoke suite and REST API tests, running end-to-end on a scheduled Linux pipeline.',
    current: true,
  },
  {
    dates: 'OCT 2022 — OCT 2025',
    company: 'Iscistech Business Solutions Sdn Bhd',
    role: 'QA Automation · Petronas Digital project',
    summary: 'Built 200+ Katalon / Selenium scripts and cut regression cycle time by 75%.',
  },
  {
    dates: 'MAR 2021 — OCT 2022',
    company: 'ESPL Esports Sdn Bhd',
    role: 'Technical Executive',
    summary:
      'Built the automation testing framework from scratch for a gaming platform and ran the team’s Scrum ceremonies.',
  },
  {
    dates: 'MAY 2020 — FEB 2021',
    company: 'VireServe Sdn Bhd',
    role: 'System Analyst',
    summary:
      'Owned FAT/UAT testing for government system deployments — requirements analysis, test procedures and client system upkeep.',
  },
];
