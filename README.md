# Liu Lab Website

Systems Social Neuroscience Lab · Westlake University

**Live site:** [https://ding-lab-westlake-university.github.io/liu-lab-website/](https://ding-lab-westlake-university.github.io/liu-lab-website/)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/liu-lab-website](http://localhost:3000/liu-lab-website) (the app uses `basePath: /liu-lab-website`).

## Deploy

Pushes to `main` trigger [GitHub Actions](.github/workflows/deploy.yml), which builds a static export and deploys to GitHub Pages.

To deploy manually: **Actions → Deploy to GitHub Pages → Run workflow**

## Content

Edit [`src/data/site.ts`](src/data/site.ts) for site-wide settings, [`src/data/team.ts`](src/data/team.ts) for team members, and add news posts under `content/news/`.
