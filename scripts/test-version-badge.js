#!/usr/bin/env node

/**
 * Local test script for version badge update functionality
 * Simulates what the update-version-badge job does
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing version badge update functionality locally...\n');

// Paths
const readmePath = path.join(__dirname, '..', 'README.md');
const packagePath = path.join(__dirname, '..', 'package.json');

try {
  // Read current files
  const readme = fs.readFileSync(readmePath, 'utf8');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  console.log('📋 Current state:');
  console.log(`   Package version: ${pkg.version}`);

  // Find current version badge
  const versionBadgeRegex = /!\[version\]\(https:\/\/img\.shields\.io\/badge\/version-[^-]+-blue\)/;
  const currentBadgeMatch = readme.match(versionBadgeRegex);

  if (currentBadgeMatch) {
    console.log(`   Current badge: ${currentBadgeMatch[0]}`);

    // Simulate what the workflow would do
    const newBadge = `![version](https://img.shields.io/badge/version-${pkg.version}-blue)`;

    console.log('\n🔄 Badge update simulation:');
    console.log(`   Would update to: ${newBadge}`);

    if (currentBadgeMatch[0] === newBadge) {
      console.log('   ✅ Badge is already up to date');
    } else {
      console.log('   📝 Badge would be updated');

      // Show the diff
      console.log('\n📋 Badge diff:');
      console.log(`   Before: ${currentBadgeMatch[0]}`);
      console.log(`   After:  ${newBadge}`);
    }

  } else {
    console.log('   ❌ Version badge not found in README.md');
    console.log('\n💡 Expected format: ![version](https://img.shields.io/badge/version-X.X.X-blue)');
  }

  console.log('\n✅ Version badge test completed');

} catch (error) {
  console.error('❌ Error testing version badge:', error.message);
  process.exit(1);
}