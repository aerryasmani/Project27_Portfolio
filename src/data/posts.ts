import https from 'node:https';
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

// node:https with agent:false instead of fetch — fetch keeps a pooled socket open,
// which crashes `astro build` on exit under Node 24 on Windows (libuv UV_HANDLE_CLOSING).
const get = (url: string) =>
  new Promise<string>((resolve, reject) => {
    const req = https.get(url, { agent: false, headers: { 'User-Agent': 'heiyoaerry.one build' } }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve(body));
    });
    req.setTimeout(10_000, () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });

/** Latest posts from Medium, read once at build time. Falls back to placeholders offline. */
export async function getPosts(limit = 3): Promise<Post[]> {
  try {
    const xml = await get(FEED);
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
