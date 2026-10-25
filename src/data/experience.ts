export interface Job {
  dates: string;
  company: string;
  role: string;
  summary: string;
  current?: boolean;
}

// Dates, titles and summaries for Iscistech, VireServe and Espl come from the
// previous site's career timeline.
export const experience: Job[] = [
  {
    dates: 'JUL 2026 — NOW',
    company: 'NETS MALAYSIA',
    role: 'Senior QA Automation Engineer · CTSLite',
    summary:
      'First dedicated automation engineer. Took a fully manual process and an empty repo to a Playwright smoke test and API test wired end-to-end through Jenkins.',
    current: true,
  },
  {
    dates: 'OCT 2022 — OCT 2025',
    company: 'ISCISTECH',
    role: 'QA Automation · Petronas Digital project',
    summary: 'Built 200+ Katalon / Selenium scripts and cut regression cycle time by 75%.',
  },
  {
    dates: 'MAR 2021 — FEB 2022',
    company: 'VIRESERVE',
    role: 'System Analyst',
    summary:
      'Owned FAT/UAT testing for government system deployments — requirements analysis, test procedures and client system upkeep.',
  },
  {
    dates: 'MAR 2021 — OCT 2022',
    company: 'ESPL ESPORTS',
    role: 'Technical Executive',
    summary:
      'Built the automation testing framework from scratch for a gaming platform and ran the team’s Scrum ceremonies.',
  },
];
