# yllan.org

Astro static site for yllan.org.

## Local development

Install dependencies once:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

The generated site is written to `dist/`.

## Write a story

Add a Markdown file under `src/content/stories/` with frontmatter:

```md
---
title: 文章標題
date: 2026-01-01
slug: story-slug
summary: 首頁摘要
---

# 文章標題

內文。
```

The build writes each story to `/stories/YYYY-MM-DD/slug/`.

## Cloudflare Pages

Use Git integration and set:

```txt
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: /
Production branch: main
```
