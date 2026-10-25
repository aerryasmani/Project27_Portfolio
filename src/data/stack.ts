export type StackLevel = 'daily' | 'regular' | 'used';

export interface StackGroup {
  title: string;
  items: [name: string, level: StackLevel][];
}

export const stack: StackGroup[] = [
  {
    title: 'UI AUTOMATION',
    items: [
      ['Playwright', 'daily'],
      ['Selenium', 'regular'],
      ['Katalon', 'regular'],
      ['Applitools', 'used'],
    ],
  },
  {
    title: 'API & PERFORMANCE',
    items: [
      ['Postman', 'regular'],
      ['JMeter', 'used'],
      ['SQL validation', 'regular'],
    ],
  },
  {
    title: 'CI/CD & REPORTING',
    items: [
      ['Jenkins', 'daily'],
      ['GitHub Actions', 'regular'],
      ['Bitbucket', 'daily'],
      ['Allure', 'used'],
    ],
  },
  {
    title: 'LANGUAGES & BUILD',
    items: [
      ['JavaScript', 'daily'],
      ['Python', 'regular'],
      ['React', 'regular'],
      ['Node.js', 'used'],
    ],
  },
];
