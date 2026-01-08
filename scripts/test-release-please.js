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
    const hasFeatures = recentCommits.includes('feat:') || recentCommits.includes('feat(');
    const hasFixes = recentCommits.includes('fix:') || recentCommits.includes('fix(');
    const hasBreaking = recentCommits.includes('BREAKING CHANGE') || recentCommits.includes('!');

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