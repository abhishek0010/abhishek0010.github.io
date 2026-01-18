# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Personal portfolio website for Abhishek Kumar - a developer-focused site with terminal aesthetic, blog system, and project showcase.

## Commands

```bash
# Development
yarn dev          # Start dev server (http://localhost:5173)

# Build & Deploy
yarn build        # TypeScript check + production build (outputs to dist/)
yarn preview      # Preview production build locally

# Linting
yarn lint         # ESLint with zero warnings policy
```

## Tech Stack

- **Build Tool:** Vite 5
- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS 3 with custom terminal theme
- **Routing:** React Router DOM 7 (lazy-loaded routes)
- **Content:** MDX for blog posts
- **Package Manager:** Yarn

## Architecture

### Directory Structure

```
src/
├── pages/                    # Route pages (lazy-loaded)
│   ├── Home.tsx              # Landing: hero, featured posts/projects
│   ├── About.tsx             # Profile, skills, experience
│   ├── Blog.tsx              # Blog index with tag filtering
│   ├── BlogPost.tsx          # Individual MDX post viewer
│   ├── Projects.tsx          # Project showcase
│   ├── Lists.tsx             # Curated lists index
│   └── ListDetail.tsx        # Individual list content
├── components/
│   ├── layout/
│   │   ├── Layout.tsx        # Page wrapper with grid overlay
│   │   ├── Navbar.tsx        # Navigation + theme toggle
│   │   ├── Footer.tsx        # Status indicator + socials
│   │   └── ThemeProvider.tsx # Dark/light mode context
│   └── mdx/
│       └── MDXComponents.tsx # Styled MDX elements
├── content/
│   ├── blog/*.mdx            # Blog posts with frontmatter
│   ├── lists/*.json          # Curated lists data
│   └── projects/projects.json
├── data/
│   └── resume.ts             # Profile/resume data
├── lib/
│   ├── blog.ts               # Blog utilities (getAllPosts, getBySlug, etc.)
│   └── utils.ts              # Helper functions (cn)
├── hooks/
│   └── useTheme.ts           # Theme hook
└── types/
    └── index.ts              # TypeScript interfaces
```

### Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Hero, featured posts/projects, about preview |
| `/about` | About | Profile, skills, work experience |
| `/blog` | Blog | All posts with tag filtering |
| `/blog/:slug` | BlogPost | Individual MDX post |
| `/projects` | Projects | Project showcase with filtering |
| `/lists` | Lists | Category index (reading, tools, resources) |
| `/lists/:category` | ListDetail | Individual list items |

### Key Systems

**Theme System** (`ThemeProvider.tsx`)
- Context-based dark/light mode
- localStorage persistence
- System preference detection
- Applies `.dark` class to document root

**Blog System** (`lib/blog.ts`)
- Vite glob import for MDX files
- Frontmatter parsing (title, date, tags, draft)
- Reading time calculation (200 wpm)
- Related posts by shared tags

**MDX Frontmatter Format:**
```yaml
---
title: "Post Title"
date: "2024-01-15"
description: "Brief description"
tags: ["tag1", "tag2"]
draft: false
---
```

## Design System

**Terminal Theme** - Cyan accents, monospace fonts, glass effects

**Colors** (defined in `tailwind.config.js`):
- Background: `#FAFAFA` (light) / `#0A0A0F` (dark)
- Surface: `#F4F4F5` (light) / `#18181B` (dark)
- Accent: `#06B6D4` (cyan)
- Border: `#E4E4E7` (light) / `#27272A` (dark)

**Fonts:**
- Monospace: JetBrains Mono (terminal aesthetic)
- Sans: Inter (content text)

**Custom Utilities:**
- `.card-terminal` - Card with border and hover glow
- `.btn-glow` - Primary button with cyan glow
- `.glass` - Frosted glass effect
- `.bg-dots` - Dot pattern background

## Data Files

- `src/data/resume.ts` - Profile info, work history, education, skills
- `src/content/projects/projects.json` - Projects with tags, demo/github links
- `src/content/lists/*.json` - Curated reading, tools, resources lists
- `src/content/blog/*.mdx` - Blog posts

## Configuration

- TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`
- Tailwind scans `index.html` and `src/**/*.{js,ts,jsx,tsx,mdx}`
- ESLint enforces zero warnings (`--max-warnings 0`)
- GitHub Pages SPA routing workaround in `main.tsx`

## Deployment

GitHub Pages at `abhishek0010.github.io`. Build output (`dist/`) deployed to `master` branch.

## Legacy Reference

`OLD/` contains the previous Create React App implementation for reference:
- `OLD/src/resumeData.json` - Original resume data structure
- `OLD/src/Components/` - Original section components
