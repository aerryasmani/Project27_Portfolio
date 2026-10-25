# heiyoaerry.one

Portfolio site — Astro + Tailwind, deployed to GitHub Pages by `.github/workflows/deploy.yml`.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm test          # build + Playwright smoke tests (1440px and 375px)
```

- Content: `src/data/*.ts` (projects, experience, stack, stats, links). Writing pulls the latest Medium posts at build time.
- Design tokens and signature effects: `src/styles/global.css`. Swap the font pair via `--display` / `--body` / `--dw`.
