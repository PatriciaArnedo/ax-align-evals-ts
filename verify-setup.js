#!/usr/bin/env node

/**
 * Setup verification script for Mastra Weather Demo
 * Checks dependencies, environment, and configuration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Mastra Weather Demo Setup...\n');

let hasErrors = false;

function checkFailed(message) {
  console.log(`❌ ${message}`);
  hasErrors = true;
}

function checkPassed(message) {
  console.log(`✅ ${message}`);
}

function checkWarning(message) {
  console.log(`⚠️  ${message}`);
}

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion >= 20) {
  checkPassed(`Node.js version: ${nodeVersion} (✅ >= 20.9.0)`);
} else {
  checkFailed(`Node.js version: ${nodeVersion} (requires >= 20.9.0)`);
}

// Check package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  checkPassed('package.json found');
  
  // Check if node_modules exists (dependencies installed)
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    checkPassed('Dependencies installed (node_modules found)');
  } else {
    checkFailed('Dependencies not installed (run: npm install)');
  }
} else {
  checkFailed('package.json not found');
}

// Check environment variables
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  checkPassed('OpenAI API key configured via environment variable');
} else {
  checkFailed('OpenAI API key not found in environment variables (set OPENAI_API_KEY)');
}

// Check essential source files
const essentialFiles = [
  'src/mastra/index.ts',
  'src/mastra/agents/weather-orchestrator-agent.ts',
  'src/mastra/tools/activity-planning-tool.ts',
  'src/mastra/tools/weather-analysis-tool.ts',
  'src/mastra/tools/weather-tool.ts',
];

let missingFiles = [];
for (const file of essentialFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    checkPassed(`Source file: ${file}`);
  } else {
    missingFiles.push(file);
    checkFailed(`Missing source file: ${file}`);
  }
}

// Check TypeScript config
const tsConfigPath = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(tsConfigPath)) {
  checkPassed('TypeScript configuration found');
} else {
  checkWarning('tsconfig.json not found (may cause issues)');
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Setup verification FAILED');
  console.log('\n📋 To fix issues:');
  console.log('1. Ensure Node.js >= 20.9.0 is installed');
  console.log('2. Run: npm install');
  console.log('3. Set OPENAI_API_KEY environment variable');
  console.log('4. Ensure all source files are present');
  process.exit(1);
} else {
  console.log('✅ Setup verification PASSED - Ready to start GUI!');
  console.log('\n🚀 Start the Mastra agent GUI with: npm start');
  console.log('🌐 This will open the web interface to interact with agents');
}
