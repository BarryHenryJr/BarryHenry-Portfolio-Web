#!/usr/bin/env node

/**
 * Local test script for release-please functionality
 * Simulates what the GitHub Action does locally
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Testing release-please functionality locally...\n');

// Read current manifest and config
const manifestPath = path.join(__dirname, '..', '.release-please-manifest.json');
const configPath = path.join(__dirname, '..', 'release-please-config.json');
const packagePath = path.join(__dirname, '..', 'package.json');

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  console.log('📋 Current state:');
  console.log(`   Manifest version: ${manifest['.']}`);
  console.log(`   Package version: ${pkg.version}`);
  console.log(`   Release type: ${config.packages['.']['release-type']}`);
  console.log(`   Package name: ${config.packages['.']['package-name']}`);

  // Check for conventional commits since last release
  console.log('\n🔍 Checking for unreleased changes...');

  try {
    // Get commits since the last tag or recent commits
    const recentCommits = execSync('git log --oneline -10', { encoding: 'utf8' });
    console.log('Recent commits:');
    console.log(recentCommits);

    // Check if there are any feat/fix commits that would trigger a release
    // Split commits by lines and check each for conventional commit patterns
    const commitLines = recentCommits.trim().split('\n');
    let hasFeatures = false;
    let hasFixes = false;
    let hasBreaking = false;

    for (const line of commitLines) {
      // Extract commit message (everything after the hash and space)
      const commitMessageMatch = line.match(/^[a-f0-9]{7,}\s+(.+)$/);
      if (!commitMessageMatch) continue;

      const commitMessage = commitMessageMatch[1];

      // Check for conventional commit patterns at the start of the message
      // Matches: type, type(scope), type!, type(scope)!
      const conventionalMatch = commitMessage.match(/^(\w+)(\([^)]+\))?(!)?:/);
      if (conventionalMatch) {
        const [, type, , isBreaking] = conventionalMatch;
        if (type === 'feat') hasFeatures = true;
        if (type === 'fix') hasFixes = true;
        // Check for breaking change indicator (!) in the type part
        if (isBreaking) {
          hasBreaking = true;
        }
      }
      // Also check for BREAKING CHANGE footer
      if (commitMessage.includes('BREAKING CHANGE')) {
        hasBreaking = true;
      }
    }

    console.log('\n📊 Release analysis:');
    console.log(`   Features: ${hasFeatures ? '✅' : '❌'}`);
    console.log(`   Fixes: ${hasFixes ? '✅' : '❌'}`);
    console.log(`   Breaking changes: ${hasBreaking ? '✅' : '❌'}`);

    if (hasFeatures || hasFixes || hasBreaking) {
      console.log('\n🚀 Would create a release if merged to main');
    } else {
      console.log('\n⏳ No release-worthy changes detected');
    }

  } catch (error) {
    console.log('⚠️  Could not analyze git history:', error.message);
  }

  console.log('\n✅ release-please test completed');

} catch (error) {
  console.error('❌ Error testing release-please:', error.message);
  process.exit(1);
}