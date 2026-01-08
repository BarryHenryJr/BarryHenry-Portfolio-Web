# Release Testing Guide

This guide explains how to test release-please and version badge update functionality locally before merging PRs.

## Overview

The CI/CD pipeline includes two release-related jobs that only run on pushes to `main`:
- **release-please**: Creates releases and updates version numbers based on conventional commits
- **update-version-badge**: Updates the version badge in README.md when a release is created

## Local Testing

### Prerequisites

Ensure you have the necessary dependencies:
```bash
pnpm install
```

### Test Scripts

Three test scripts are available:

#### 1. Test Release-Please Logic
```bash
npm run test:release-please
```
or
```bash
node scripts/test-release-please.js
```

This script:
- Reads the current release-please manifest and config
- Analyzes recent git commits for release-worthy changes
- Shows what version would be created

#### 2. Test Version Badge Update
```bash
npm run test:version-badge
```
or
```bash
node scripts/test-version-badge.js
```

This script:
- Checks the current version badge in README.md
- Simulates what the update job would do
- Shows the before/after diff

#### 3. Run Both Tests
```bash
npm run release:local
```

### What Gets Tested

#### Release-Please Analysis
The script checks for:
- ✅ **Features**: Commits with `feat:` prefix
- ✅ **Fixes**: Commits with `fix:` prefix
- ✅ **Breaking Changes**: Commits with `BREAKING CHANGE` or `!` suffix

#### Version Badge Update
The script verifies:
- Current badge format in README.md
- Whether an update is needed
- Expected new badge format

## Manual Testing with GitHub CLI

For more comprehensive testing, you can use the GitHub CLI to test the actual release-please action:

### 1. Install release-please CLI
```bash
npm install -g release-please
```

### 2. Test Release Creation
```bash
# Check what release-please would do
release-please release-pr \
  --repo-url=https://github.com/YOUR_USERNAME/barryhenry-portfolio-web \
  --config-file=release-please-config.json \
  --dry-run
```

### 3. Test Manifest Update
```bash
# Update manifest based on conventional commits
release-please manifest \
  --repo-url=https://github.com/YOUR_USERNAME/barryhenry-portfolio-web \
  --config-file=release-please-config.json \
  --dry-run
```

## Testing Workflow

### Before Creating a PR

1. **Make your changes** with conventional commit messages
2. **Run local tests**:
   ```bash
   npm run release:local
   ```
3. **Verify results** - check the output for expected behavior
4. **Create PR** with conventional commit messages

### After PR Approval (Before Merge)

1. **Run tests again** to ensure everything is ready
2. **Merge the PR** to main
3. **Monitor the CI/CD pipeline** for:
   - Build completion
   - Release-Please job execution
   - Version badge update (if release created)

## Conventional Commit Examples

Use these commit message formats to trigger releases:

```bash
# Feature (minor version bump)
git commit -m "feat: add dark mode toggle"

# Fix (patch version bump)
git commit -m "fix: resolve mobile layout issue"

# Breaking change (major version bump)
git commit -m "feat!: redesign API interface

BREAKING CHANGE: The API now requires authentication"
```

## Troubleshooting

### No Release Detected
- Ensure commits use conventional format (`feat:`, `fix:`, etc.)
- Check that changes are meaningful for a release

### Badge Not Updating
- Verify README.md contains the expected badge format
- Check that package.json version matches expectations

### Script Errors
- Ensure Node.js version matches CI (20.18.0)
- Check file permissions on scripts
- Verify all required files exist (.release-please-manifest.json, etc.)

## CI/CD Job Details

For reference, here's what the actual jobs do:

### release-please Job
- **Trigger**: Push to main branch
- **Dependencies**: build, security-audit, secret-scanning
- **Action**: Uses googleapis/release-please-action@v4
- **Output**: `release_created` boolean

### update-version-badge Job
- **Trigger**: When `release_created == 'true'`
- **Actions**:
  - Extracts version from package.json
  - Updates badge in README.md
  - Commits and pushes changes