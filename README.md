# Personal Portfolio

Angular 19 portfolio site for **Hrishikesh Patkal** — Software Engineer focused on enterprise apps, cloud/DevOps, and AI-assisted delivery.

**Live domain (target):** [hrishikeshpatkal.dev](https://hrishikeshpatkal.dev)

## Stack

- **Angular 19** — standalone components and signals
- **Tailwind CSS v4** — utilities + design tokens in `src/styles.css`
- **Mailto contact flow** — no third-party form API or backend required
- **Bootstrap Icons** + **Google Fonts** (Gabarito, Geist Mono)
- **Static deploy** — Vercel output in `dist/personal-portfolio/browser/`

## Product Requirements

**Owner:** Hrishikesh Patkal  
**Last updated:** June 2026

### Purpose

A single-page portfolio that presents professional identity, production experience, skills, projects, education, resume, and contact options.

### Goals

- Show full-stack engineering experience with enterprise ERP, Angular, Node.js, AWS, and DevOps.
- Keep contact simple with email, phone, social links, and a mailto-based contact form.
- Avoid third-party form APIs and backend services.
- Deploy cleanly to Vercel as a static browser build.

### Main User Journey

1. Visitor lands on the hero section and sees name, role, value proposition, portrait, and metrics.
2. Visitor scans About, Skills, Experience, Projects, Education, and Contact.
3. Visitor downloads the resume or opens a prefilled email draft from the contact form.

### Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| F1 | Single page with anchored sections | Done |
| F2 | Responsive layout | Done |
| F3 | Theme picker with persisted selection | Done |
| F4 | SEO meta tags and JSON-LD Person schema | Done |
| F5 | Mailto contact form with validation | Done |
| F6 | Resume download from `/resume.pdf` | Done |
| F7 | Static Vercel deployment from `dist/personal-portfolio/browser` | Done |
| F8 | Project cards with case-study modals | Done |

## Quick start

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Production build

```bash
npm run build
```

Deploy **`dist/personal-portfolio/browser/`** to Vercel.  
`vercel.json` sets the build command and output directory for Vercel.

## Configure before launch

1. **Content** — edit `src/app/data/`:
   - `site.data.ts` — hero, bio, metrics, social
   - `experience.data.ts` — work history
   - `skills.data.ts` — skills
   - `projects.data.ts` — featured projects
   - `education.data.ts` — education

2. **Résumé** — `public/resume.pdf`

3. **Domain / SEO** — `public/sitemap.xml`, `public/robots.txt`, canonical URL in `src/index.html`

## Themes

Eight themes via the header palette control (including **Developer Dark**).  
Selection is stored in `localStorage` under `portfolio-theme`.

## Project structure

```
src/app/
├── core/services/   # theme, seo, contact, scroll, motion
├── data/            # static content and theme config
├── layout/          # header, footer, theme picker
├── sections/        # hero, about, skills, projects, experience, education, contact
├── pages/           # home, 404
├── shared/          # reveal-on-scroll directive
└── models/          # TypeScript interfaces

public/              # resume, images, icons, sitemap, robots.txt
scripts/             # image optimization and theme bootstrap helpers
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (port 4200) |
| `npm run build` | Production browser build |
| `npm test` | Unit tests (Karma) |
| `npm run optimize:images` | Generate WebP images from original image files |

## Tests

```bash
npm test -- --no-watch --browsers=ChromeHeadless
```

## License

Private — personal portfolio project.
