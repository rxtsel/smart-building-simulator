# Smart Building Simulator

Smart Building Simulator is a university project built with Next.js and shadcn/ui. It presents a web-based simulation of a smart building with a simple authenticated flow, an interactive dashboard, and a project information page.

## Current scope

The application currently includes:

- A login screen
- A smart building dashboard
- Simulated building status indicators
- Lighting controls
- Security controls
- Temperature controls
- Simulated occupancy controls
- Simulated alerts
- A project overview page with academic context and risk-management summary

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- next-themes
- Radix Slider
- Hugeicons

## Getting started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open the app at:

```text
http://localhost:3000
```

## Project structure

```text
app/
  page.tsx              # Login page
  dashboard/page.tsx    # Smart building dashboard
  acerca/page.tsx       # Project information page
components/
  app-page-shell.tsx
  app-sidebar.tsx
  login-form.tsx
  smart-building-dashboard.tsx
  ui/
lib/
  session.ts
  utils.ts
```
