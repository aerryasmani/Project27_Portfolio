export type StackLevel = 'daily' | 'regular' | 'used';

export interface StackGroup {
  title: string;
  items: [name: string, level: StackLevel][];
}

// daily = current day-to-day work; regular = side projects / previous roles; used = familiar, not current.
// Order within a group: daily first, then regular, then used.
export const stack: StackGroup[] = [
  {
    title: 'UI AUTOMATION',
    items: [
      ['Selenium WebDriver', 'daily'],
      ['TestNG', 'daily'],
      ['Playwright', 'regular'],
      ['Katalon', 'used'],
      ['Applitools', 'used'],
    ],
  },
  {
    title: 'API & DATA',
    items: [
      ['REST Assured', 'daily'],
      ['SQL', 'daily'],
      ['Postman', 'regular'],
      ['JMeter', 'used'],
    ],
  },
  {
    title: 'CI/CD & OPS',
    items: [
      ['Git', 'daily'],
      ['Bitbucket', 'daily'],
      ['Linux', 'daily'],
      ['Bash', 'daily'],
      ['GitHub Actions', 'regular'],
      ['Jenkins', 'regular'],
      ['Allure', 'used'],
    ],
  },
  {
    title: 'LANGUAGES & BUILD',
    items: [
      ['Java', 'daily'],
      ['Spring Boot', 'daily'],
      ['Maven', 'daily'],
      ['IntelliJ IDEA', 'daily'],
      ['JavaScript', 'regular'],
      ['Python', 'regular'],
      ['React', 'used'],
      ['Node.js', 'used'],
    ],
  },
];
