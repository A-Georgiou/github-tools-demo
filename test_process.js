/**
 * Unit tests for process.js
 * 
 * This test suite validates the data processing functions including
 * statistics calculation and report generation.
 */

const assert = require('assert');

// Import functions from process.js
// Since process.js doesn't export functions, we'll need to copy them here
// In a real scenario, we'd refactor process.js to export the functions

// Copied functions from process.js for testing
function processData(items) {
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

// Simple test runner
let passed = 0;
let failed = 0;

function describe(suiteName, tests) {
  console.log(`\n${suiteName}`);
  tests();
}

function it(testName, test) {
  try {
    test();
    console.log(`  ✓ ${testName}`);
    passed++;
  } catch (error) {
    console.log(`  ✗ ${testName}`);
    console.log(`    ${error.message}`);
    failed++;
  }
}

console.log('Running tests for process.js...\n');

// Test suite
describe('processData', function() {
  
  it('should calculate correct total for sample data', function() {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 }
    ];
    
    const result = processData(data);
    assert.strictEqual(result.total, 87);
  });
  
  it('should calculate correct average for sample data', function() {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 20 },
      { name: 'Item 3', value: 30 }
    ];
    
    const result = processData(data);
    assert.strictEqual(result.average, 20);
  });
  
  it('should identify the highest value item', function() {
    const data = [
      { name: 'Low', value: 5 },
      { name: 'High', value: 100 },
      { name: 'Medium', value: 50 }
    ];
    
    const result = processData(data);
    assert.strictEqual(result.highest.name, 'High');
    assert.strictEqual(result.highest.value, 100);
  });
  
  it('should identify the lowest value item', function() {
    const data = [
      { name: 'Low', value: 5 },
      { name: 'High', value: 100 },
      { name: 'Medium', value: 50 }
    ];
    
    const result = processData(data);
    assert.strictEqual(result.lowest.name, 'Low');
    assert.strictEqual(result.lowest.value, 5);
  });
  
  it('should handle single item array', function() {
    const data = [{ name: 'Only', value: 42 }];
    
    const result = processData(data);
    assert.strictEqual(result.total, 42);
    assert.strictEqual(result.average, 42);
    assert.strictEqual(result.highest.name, 'Only');
    assert.strictEqual(result.lowest.name, 'Only');
  });
  
  it('should handle all items with same value', function() {
    const data = [
      { name: 'Item 1', value: 50 },
      { name: 'Item 2', value: 50 },
      { name: 'Item 3', value: 50 }
    ];
    
    const result = processData(data);
    assert.strictEqual(result.total, 150);
    assert.strictEqual(result.average, 50);
    assert.strictEqual(result.highest.value, 50);
    assert.strictEqual(result.lowest.value, 50);
  });
  
  it('should handle decimal values correctly', function() {
    const data = [
      { name: 'Item 1', value: 10.5 },
      { name: 'Item 2', value: 20.5 }
    ];
    
    const result = processData(data);
    assert.strictEqual(result.total, 31);
    assert.strictEqual(result.average, 15.5);
  });
  
  it('should not mutate the original array when sorting', function() {
    const data = [
      { name: 'Item 1', value: 30 },
      { name: 'Item 2', value: 10 },
      { name: 'Item 3', value: 20 }
    ];
    
    const originalOrder = [...data];
    processData(data);
    
    // Verify original array is unchanged
    assert.deepStrictEqual(data, originalOrder);
  });
  
  it('should handle large numbers', function() {
    const data = [
      { name: 'Item 1', value: 1000000 },
      { name: 'Item 2', value: 2000000 }
    ];
    
    const result = processData(data);
    assert.strictEqual(result.total, 3000000);
    assert.strictEqual(result.average, 1500000);
  });
  
  it('should handle zero values', function() {
    const data = [
      { name: 'Item 1', value: 0 },
      { name: 'Item 2', value: 10 },
      { name: 'Item 3', value: 20 }
    ];
    
    const result = processData(data);
    assert.strictEqual(result.total, 30);
    assert.strictEqual(result.lowest.value, 0);
  });
});

describe('generateReport', function() {
  
  it('should generate a report with correct structure', function() {
    const data = [{ name: 'Test', value: 42 }];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    assert(report.includes('# Data Processing Report'));
    assert(report.includes('## Raw Data'));
    assert(report.includes('## Statistics'));
  });
  
  it('should include all data items in report', function() {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 20 }
    ];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    assert(report.includes('Item 1: 10'));
    assert(report.includes('Item 2: 20'));
  });
  
  it('should format average with two decimal places', function() {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 15 }
    ];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    assert(report.includes('Average: 12.50'));
  });
  
  it('should include total in report', function() {
    const data = [
      { name: 'Item 1', value: 25 },
      { name: 'Item 2', value: 75 }
    ];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    assert(report.includes('Total: 100'));
  });
  
  it('should include highest value with name in report', function() {
    const data = [
      { name: 'Low', value: 10 },
      { name: 'High', value: 90 }
    ];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    assert(report.includes('Highest: High (90)'));
  });
  
  it('should include lowest value with name in report', function() {
    const data = [
      { name: 'Low', value: 10 },
      { name: 'High', value: 90 }
    ];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    assert(report.includes('Lowest: Low (10)'));
  });
  
  it('should use markdown list format for raw data', function() {
    const data = [{ name: 'Test', value: 42 }];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    assert(report.includes('- Test: 42'));
  });
});

describe('Integration tests', function() {
  
  it('should process and generate report for sample data', function() {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 },
      { name: 'Item 4', value: 35 }
    ];
    
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    // Verify stats
    assert.strictEqual(stats.total, 122);
    assert.strictEqual(stats.average, 30.5);
    assert.strictEqual(stats.highest.name, 'Item 1');
    assert.strictEqual(stats.lowest.name, 'Item 2');
    
    // Verify report contains all key information
    assert(report.includes('Total: 122'));
    assert(report.includes('Average: 30.50'));
    assert(report.includes('Highest: Item 1 (42)'));
    assert(report.includes('Lowest: Item 2 (18)'));
  });
  
  it('should handle edge case with two items', function() {
    const data = [
      { name: 'First', value: 100 },
      { name: 'Second', value: 50 }
    ];
    
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    assert.strictEqual(stats.total, 150);
    assert.strictEqual(stats.average, 75);
    assert(report.includes('Highest: First (100)'));
    assert(report.includes('Lowest: Second (50)'));
  });
});

console.log(`\n\nTest Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
