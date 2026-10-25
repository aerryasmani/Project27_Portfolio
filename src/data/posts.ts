import { links } from './links';

export interface Post {
  title: string;
  href: string;
  date: string;
  minutes?: number;
}

const FEED = 'https://medium.com/feed/@BukanJun';
const WPM = 265;

// TODO: shown only if the Medium feed can't be reached at build time.
const placeholders: Post[] = [1, 2, 3].map((n) => ({
  title: `[ARTICLE TITLE 0${n}]`,
  href: links.medium,
  date: '[MON YYYY]',
}));

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`));
  return m?.[1].trim() ?? '';
};

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();

/** Latest posts from Medium, read once at build time. Falls back to placeholders offline. */
export async function getPosts(limit = 3): Promise<Post[]> {
  try {
    const res = await fetch(FEED, { headers: { 'User-Agent': 'heiyoaerry.one build' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = xml.split('<item>').slice(1, limit + 1);
    if (!items.length) throw new Error('no items');

    return items.map((item) => {
      const words = tag(item, 'content:encoded').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
      return {
        title: tag(item, 'title'),
        href: tag(item, 'link').split('?')[0],
        date: fmtDate(tag(item, 'pubDate')),
        minutes: Math.max(1, Math.round(words / WPM)),
      };
    });
  } catch (err) {
    console.warn(`[posts] Medium feed unavailable, using placeholders: ${(err as Error).message}`);
    return placeholders;
  }
}
