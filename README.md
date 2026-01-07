![version](https://img.shields.io/badge/version-0.1.0-blue)
![build](https://github.com/BarryHenryJr/barryhenry-portfolio-web/actions/workflows/cicd.yml/badge.svg?branch=main)
![lint](https://github.com/BarryHenryJr/barryhenry-portfolio-web/actions/workflows/cicd.yml/badge.svg?branch=main&job=lint)
![security](https://github.com/BarryHenryJr/barryhenry-portfolio-web/actions/workflows/cicd.yml/badge.svg?branch=main&job=security-audit)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-61dafb?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.18.0-339933?logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-9.15.0-F69220?logo=pnpm&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?logo=tailwind-css&logoColor=white)

# Barry Henry - Portfolio

A modern, high-fidelity personal portfolio designed to mimic a SaaS dashboard. Built with cutting-edge technologies and featuring real-time metrics, interactive components, and a seamless user experience.

## ✨ Features

### Dashboard Overview

- **Activity Feed** - Real-time activity tracking and metrics
- **Tech Radar** - Interactive technology proficiency visualization
- **Project Metrics** - Live statistics on active projects, skills, and experience

### Portfolio Showcase

- **Projects Grid** - Animated grid layout showcasing featured projects with status indicators
- **Experience Timeline** - Changelog-style professional experience visualization
- **Project Details** - Comprehensive project information with tech stacks and links

### Developer Experience

- **Command Palette** - Press `⌘K` (Cmd+K) for quick navigation and search
- **Dark/Light Theme** - Seamless theme switching with system preference detection
- **Responsive Design** - Optimized for desktop, tablet, and mobile experiences
- **Modern UI** - Built with shadcn/ui components for consistent, accessible design

### Technical Features

- **Type-Safe** - Full TypeScript implementation with strict type checking
- **Performance Optimized** - Built with Next.js App Router for optimal loading and SEO
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Ready** - Optimized meta tags and structured data

## 🛠 Tech Stack

### Core Framework

- **[Next.js 16.1.1](https://nextjs.org/)** - React framework with App Router for optimal performance and SEO
- **[React 19.2.3](https://react.dev/)** - Modern React with concurrent features and improved performance
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe JavaScript with strict type checking

### Styling & UI

- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built on Radix UI and styled with Tailwind
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives for building high-quality design systems
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit made by the community

### Animation & Interaction

- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library for React
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Perfect dark/light mode for Next.js

### Development & Quality

- **[ESLint 9.0](https://eslint.org/)** - Pluggable JavaScript linter for code quality
- **[Husky](https://typicode.github.io/husky/)** - Modern native Git hooks made easy
- **[pnpm 9.15.0](https://pnpm.io/)** - Fast, disk space efficient package manager

### Utilities

- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library
- **[class-variance-authority](https://cva.style/)** - Class variance authority for building reusable component variants
- **[cmdk](https://cmdk.paco.me/)** - Command palette component for React

### Infrastructure

- **[Node.js 20.18.0](https://nodejs.org/)** - JavaScript runtime built on Chrome's V8 JavaScript engine
- **[Vercel](https://vercel.com/)** - Platform for deploying and hosting web applications

## 🚀 Getting Started

### Prerequisites

- **Node.js 20.18.0+** - Required runtime environment
- **pnpm 9.15.0+** - Package manager (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/BarryHenryJr/barryhenry-portfolio-web.git
   cd barryhenry-portfolio-web
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

### Development Features

- **Hot Reload** - Changes are automatically reflected in the browser
- **TypeScript** - Full type checking and IntelliSense support
- **Command Palette** - Press `⌘K` (Cmd+K) for quick navigation and search
- **Theme Switching** - Toggle between dark/light modes in the UI

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm prepare      # Setup Git hooks (Husky)
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes (if needed)
│   ├── experience/               # Experience timeline page
│   │   ├── components/           # Experience-specific components
│   │   └── page.tsx             # Experience page
│   ├── favicon.ico              # Site favicon
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Homepage (dashboard)
│   └── projects/                # Projects showcase page
│       ├── components/          # Project-specific components
│       └── page.tsx            # Projects page
├── components/                  # Reusable React components
│   ├── command-menu.tsx         # Global command palette
│   ├── dashboard/               # Dashboard widgets
│   │   ├── ActivityFeed.tsx     # Activity feed component
│   │   └── TechRadar.tsx        # Technology radar component
│   ├── layout/                  # Layout components
│   │   ├── Shell.tsx            # Main app shell
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   └── StatusBar.tsx        # Status bar component
│   ├── theme-provider.tsx       # Theme provider for dark/light mode
│   └── ui/                      # shadcn/ui components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
└── lib/                         # Utilities and constants
    ├── constants.ts             # App constants and data
    └── utils.ts                 # Utility functions
```

### Key Directories

- **`app/`** - Next.js 13+ App Router structure with page components
- **`components/`** - Modular component architecture with clear separation of concerns
- **`lib/`** - Shared utilities, constants, and business logic
- **`ui/`** - Design system components from shadcn/ui

## 🔧 Development Workflow

### Code Quality & Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to manage Git hooks for code quality and consistency.

#### Setup

Git hooks are automatically configured when you run:

```bash
pnpm install    # Installs dependencies
pnpm prepare    # Sets up Husky git hooks
```

#### Pre-commit Hook

The pre-commit hook automatically runs ESLint to ensure code quality:

```bash
pnpm lint  # Runs automatically on pre-commit
```

If linting fails, the commit will be blocked. Fix the issues and try committing again.

#### Additional Hooks (Optional)

You can add more Git hooks by creating files in the `.husky/` directory:

- `commit-msg`: Validate commit messages
- `pre-push`: Run additional checks before pushing

Example commit-msg hook for conventional commits:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Add commitlint or custom validation here
```

## 🚀 Deployment

This portfolio is optimized for deployment on [Vercel](https://vercel.com/), the platform built by the creators of Next.js.

### Automatic Deployment

The project is configured for continuous deployment with GitHub Actions:

1. **Push to main branch** - Triggers automated CI/CD pipeline
2. **Build verification** - Runs linting, type checking, and build tests
3. **Security scanning** - Performs vulnerability and secret scanning
4. **Auto-deployment** - Successful builds deploy automatically to Vercel

### Manual Deployment

To deploy manually:

1. **Connect to Vercel**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel --prod
   ```

2. **Environment Variables** (if needed)
   Configure any required environment variables in your Vercel project settings.

### Build Configuration

The project includes optimized build settings for:

- **Static generation** - Fast loading with Next.js App Router
- **Image optimization** - Automatic image optimization and WebP conversion
- **SEO optimization** - Proper meta tags and structured data
- **Performance** - Bundle analysis and optimization

### Custom Domain

To use a custom domain:

1. Add your domain in Vercel project settings
2. Configure DNS records as instructed
3. Enable SSL certificate (automatic)

For detailed deployment documentation, see [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
