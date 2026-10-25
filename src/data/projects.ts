export type ProjectCat = 'Automation' | 'Product' | 'Learning' | 'Design';

export interface Project {
  kind: string;
  cat: ProjectCat;
  name: string;
  desc: string;
  stack: string;
  /** Omit for projects with nothing public yet — the card shows `link` as plain text */
  href?: string;
  link: string;
  /** Shown in Selected Work on the home page */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    kind: 'PRODUCT',
    cat: 'Product',
    name: 'Jitu',
    desc: 'Test case workspace with a Quick Generate flow, suites and export preferences. Designed, built and deployed solo.',
    stack: 'React · Vite · Node.js · Supabase · Cloudflare Pages',
    href: 'https://jitu.one',
    link: 'jitu.one',
    featured: true,
  },
  {
    kind: 'AUTOMATION',
    cat: 'Automation',
    name: 'QA_Sedekahje',
    desc: 'Playwright suite covering the core user journeys of Sedekah.je.',
    stack: 'Playwright · JavaScript · POM',
    href: 'https://github.com/aerryasmani/QA_Sedekahje',
    link: 'View repo',
    featured: true,
  },
  {
    kind: 'AUTOMATION',
    cat: 'Automation',
    name: 'QA_jommakan',
    desc: 'Playwright end-to-end tests for JomMakan.',
    stack: 'Playwright · JavaScript',
    href: 'https://github.com/aerryasmani/QA_JomMakan',
    link: 'View repo',
    featured: true,
  },
  {
    kind: 'AUTOMATION',
    cat: 'Automation',
    name: 'QA_GetDoa',
    desc: 'Playwright automation for getdoa.com, an Islamic dua platform.',
    stack: 'Playwright · JavaScript',
    href: 'https://github.com/aerryasmani/QA_GetDoa',
    link: 'View repo',
    featured: true,
  },
  {
    kind: 'AUTOMATION',
    cat: 'Automation',
    name: 'saucedemo-e2e-tests',
    desc: 'Purchase flow and login validation with Page Object Model and data-test locators.',
    stack: 'Playwright · POM · CommonJS',
    href: 'https://github.com/aerryasmani/saucedemo-e2e-tests',
    link: 'View repo',
    featured: true,
  },
  {
    kind: 'LEARNING',
    cat: 'Learning',
    name: 'GetXP',
    desc: 'A 20-week QA learning roadmap — from manual fundamentals to CI-wired automation.',
    stack: 'Roadmap · Markdown',
    href: 'https://github.com/aerryasmani/GetXP',
    link: 'View repo',
    featured: true,
  },
  {
    kind: 'AUTOMATION',
    cat: 'Automation',
    name: 'Commute.my',
    desc: 'QA automation for Commute.my using Selenium (Python), with load tests and GitHub Actions.',
    stack: 'Selenium · Python · Locust · GitHub Actions',
    href: 'https://commute.my/',
    link: 'commute.my',
  },
  {
    kind: 'UI/UX DESIGN',
    cat: 'Design',
    name: 'JomMakan UI',
    desc: 'UI/UX for JomMakan, blending clean mobile patterns with playful local microcopy.',
    stack: 'Figma · Draw.io',
    href: 'https://dribbble.com/shots/26854478-JomMakan-Makan-Apa-Hari-Ini',
    link: 'View on Dribbble',
  },
  {
    kind: 'FINAL YEAR PROJECT',
    cat: 'Design',
    name: 'ReCare',
    desc: 'Diabetic patient care and dietitian–patient consultation, designed as a final year project.',
    stack: 'Figma · Draw.io',
    href: 'https://ieeexplore.ieee.org/document/9515229',
    link: 'Read paper',
  },
  {
    kind: 'HACKATHON',
    cat: 'Design',
    name: 'Fofest',
    desc: 'Hackathon project tackling food wastage and student hunger through mobile UX.',
    stack: 'Figma · Draw.io',
    link: 'Case study coming soon',
  },
];

export const featured = projects.filter((p) => p.featured);

/** Filter tabs: "All" plus each category present in the list, in first-seen order */
export const tabsFor = (list: Project[]) => ['All', ...new Set(list.map((p) => p.cat))];
