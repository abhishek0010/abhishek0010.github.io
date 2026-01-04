# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/resume website for Abhishek Kumar. Currently being migrated from Create React App to Vite + TypeScript + Tailwind CSS.

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
- **Styling:** Tailwind CSS 3
- **Package Manager:** Yarn

## Architecture

This is a single-page portfolio site. Current state is minimal (fresh Vite scaffold), intended to be built out with resume sections.

**Entry points:**
- `index.html` - Vite entry point (loads `/src/main.tsx`)
- `src/main.tsx` - React root render
- `src/App.tsx` - Main application component

**Legacy reference (`OLD/`):**
- Contains the previous Create React App implementation
- `OLD/src/resumeData.json` - Resume data structure (education, work history, skills, social links)
- `OLD/src/Components/` - Section components (Header, About, Resume, Portfolio, Contact, Footer, Testimonials)

## Configuration Notes

- TypeScript strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- Tailwind configured to scan `index.html` and `src/**/*.{js,ts,jsx,tsx}`
- ESLint enforces zero warnings (`--max-warnings 0`)

## Deployment

GitHub Pages site (`abhishek0010.github.io`). Build output in `dist/` should be deployed to the `master` branch or configured for GitHub Actions.
