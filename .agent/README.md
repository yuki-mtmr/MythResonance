# Myth Resonance - Development Guidelines

This project is a static web application built with Vite, React, and TypeScript, intended for GitHub Pages.

## Core Rules
- **Static SPA**: No server-side code or external DB/API.
- **GitHub Pages Routing**: Use `HashRouter` from `react-router-dom` to avoid 404s on refresh.
- **Built-in Data**: All questions and deity data must be in `src/data/*.json`.
- **Styling**: Modern, premium dark theme with purple/gold accents.
- **Deployment**: Automatic via GitHub Actions to GitHub Pages.

## Done Criteria
- `npm run build` passes.
- 10-question diagnostic flow works end-to-end.
- Results are shareable on X.
- Mobile-responsive design.
