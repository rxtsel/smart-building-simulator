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

Charts are intentionally not part of the current scope.

## Main features

### Dashboard

The dashboard is focused on the minimum viable product for the final delivery:

- General building status
- Lighting on/off state
- Temperature state
- Security active/inactive state
- Simulated occupancy
- Alert simulation
- Day/night mode toggle with `next-themes`

### Project page

The `About project` page explains:

- Why the project exists
- The academic context
- The risk-management approach
- Prioritized project risks
- Team members

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

## Available scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm format
```

## Demo access

The project uses a simple mock authentication flow for demonstration purposes.

Default credentials:

```text
Email: test@test.co
Password: Test123@
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
