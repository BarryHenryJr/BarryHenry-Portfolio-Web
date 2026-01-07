![version](https://img.shields.io/badge/version-0.1.0-blue)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to manage Git hooks for code quality and consistency.

### Setup

After cloning the repository, install dependencies and set up Git hooks:

```bash
pnpm install
pnpm prepare  # This sets up Husky
```

### Pre-commit Hook

The pre-commit hook automatically runs ESLint to ensure code quality before each commit:

```bash
pnpm lint  # Runs automatically on pre-commit
```

If linting fails, the commit will be blocked. Fix the issues and try committing again.

### Additional Hooks (Optional)

You can add more Git hooks by creating files in the `.husky/` directory. For example:

- `commit-msg`: Validate commit messages
- `pre-push`: Run tests before pushing

Example commit-msg hook for conventional commits:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Add commitlint or custom validation here
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
