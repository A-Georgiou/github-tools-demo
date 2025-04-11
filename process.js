/**
 * Simple data processing script
 * 
 * This demonstrates a Node.js script that could be used to process data
 * in a GitHub repository workflow.
 */

const fs = require('fs');

// Mock data - in real usage, this could be read from files in the repo
const data = [
  { name: 'Item 1', value: 42 },
  { name: 'Item 2', value: 18 },
  { name: 'Item 3', value: 27 },
  { name: 'Item 4', value: 35 }
];

// Process the data
function processData(items) {
  // Calculate basic statistics
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const average = total / items.length;
  const sorted = [...items].sort((a, b) => b.value - a.value);
  
  return {
    total,
    average,
    highest: sorted[0],
    lowest: sorted[sorted.length - 1]
  };
}

// Generate a report
function generateReport(rawData, stats) {
  return `# Data Processing Report

## Raw Data
${rawData.map(item => `- ${item.name}: ${item.value}`).join('\n')}

## Statistics
- Total: ${stats.total}
- Average: ${stats.average.toFixed(2)}
- Highest: ${stats.highest.name} (${stats.highest.value})
- Lowest: ${stats.lowest.name} (${stats.lowest.value})
`;
}

// Main process
const stats = processData(data);
const report = generateReport(data, stats);

// In a real script, we would write this to a file
console.log(report);

// Example of how this could be used in a GitHub Action:
/*
  if (process.env.GITHUB_ACTIONS) {
    fs.writeFileSync('report.md', report);
  }
*/
