export type ProjectCat = 'Automation' | 'Product' | 'Learning';

export interface Project {
  kind: string;
  cat: ProjectCat;
  name: string;
  desc: string;
  stack: string;
  href: string;
  link: string;
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
  },
  {
    kind: 'AUTOMATION',
    cat: 'Automation',
    name: 'QA_Sedekahje',
    desc: 'Playwright suite covering the core user journeys of Sedekah.je.',
    stack: 'Playwright · JavaScript · POM',
    href: 'https://github.com/aerryasmani/QA_Sedekahje',
    link: 'View repo',
  },
  {
    kind: 'AUTOMATION',
    cat: 'Automation',
    name: 'QA_JomMakan',
    desc: 'Playwright end-to-end tests for JomMakan.',
    stack: 'Playwright · JavaScript',
    href: 'https://github.com/aerryasmani/QA_JomMakan',
    link: 'View repo',
  },
  {
    kind: 'AUTOMATION',
    cat: 'Automation',
    name: 'QA_GetDoa',
    desc: 'Playwright automation for getdoa.com, an Islamic dua platform.',
    stack: 'Playwright · JavaScript',
    href: 'https://github.com/aerryasmani/QA_GetDoa',
    link: 'View repo',
  },
  {
    kind: 'AUTOMATION',
    cat: 'Automation',
    name: 'saucedemo-e2e-tests',
    desc: 'Purchase flow and login validation with Page Object Model and data-test locators.',
    stack: 'Playwright · POM · CommonJS',
    href: 'https://github.com/aerryasmani/saucedemo-e2e-tests',
    link: 'View repo',
  },
  {
    kind: 'LEARNING',
    cat: 'Learning',
    name: 'GetXP',
    desc: 'A 20-week QA learning roadmap — from manual fundamentals to CI-wired automation.',
    stack: 'Roadmap · Markdown',
    href: 'https://github.com/aerryasmani/GetXP',
    link: 'View repo',
  },
];

export const projectTabs = ['All', 'Automation', 'Product', 'Learning'];
