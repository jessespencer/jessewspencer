# jessewspencer

Personal portfolio and creative website for Jesse W Spencer — product design architect, musician, and photographer. Built with Next.js and featuring animated page transitions powered by Framer Motion.

## Sections

- **About** — 15+ years of product design experience, career timeline, expertise, awards, and speaking engagements
- **Design** — Portfolio gallery with MDX-driven case study pages
- **Music** — Drumming career, Breach and Bellow project, collaborations with embedded YouTube and Spotify
- **Photography** — Astrophotography, national parks, and people galleries

## Tech Stack

- **Framework:** Next.js 16 with React 19 and TypeScript
- **Animations:** Framer Motion
- **Content:** MDX via next-mdx-remote + gray-matter frontmatter
- **Styling:** CSS Modules with custom design tokens

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── design/       # Portfolio + dynamic [slug] case studies
│   ├── music/        # Music portfolio
│   ├── photos/       # Photography gallery
│   └── archive/      # Archive
├── components/       # Layout and UI components
├── content/design/   # MDX case study files
├── lib/              # Content loading + animation variants
└── styles/           # Global CSS + design tokens
```

## Setup

```bash
npm install
```

## Development

```bash
npm run dev     # http://localhost:3000
npm run build   # Production build
npm run start   # Serve production build
```
