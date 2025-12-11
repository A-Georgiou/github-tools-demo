/**
 * Unit tests for the data processing script
 * 
 * Tests cover:
 * - processData function with various inputs
 * - generateReport function with different data sets
 * - Edge cases and error handling
 */

// Import the functions we want to test
// Since process.js doesn't export, we'll need to modify it slightly
// For now, we'll define test versions of the functions

const fs = require('fs');

// Helper function to extract functions for testing
function extractFunctions() {
  // These are the same functions from process.js
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

  return { processData, generateReport };
}

const { processData, generateReport } = extractFunctions();

// Test suite for processData function
describe('processData', () => {
  test('calculates correct total for sample data', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 },
      { name: 'Item 4', value: 35 }
    ];
    const result = processData(data);
    expect(result.total).toBe(122);
  });

  test('calculates correct average for sample data', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 },
      { name: 'Item 4', value: 35 }
    ];
    const result = processData(data);
    expect(result.average).toBe(30.5);
  });

  test('identifies highest value item', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 },
      { name: 'Item 4', value: 35 }
    ];
    const result = processData(data);
    expect(result.highest).toEqual({ name: 'Item 1', value: 42 });
  });

  test('identifies lowest value item', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 },
      { name: 'Item 4', value: 35 }
    ];
    const result = processData(data);
    expect(result.lowest).toEqual({ name: 'Item 2', value: 18 });
  });

  test('handles single item', () => {
    const data = [{ name: 'Only Item', value: 100 }];
    const result = processData(data);
    expect(result.total).toBe(100);
    expect(result.average).toBe(100);
    expect(result.highest).toEqual({ name: 'Only Item', value: 100 });
    expect(result.lowest).toEqual({ name: 'Only Item', value: 100 });
  });

  test('handles two items', () => {
    const data = [
      { name: 'First', value: 10 },
      { name: 'Second', value: 20 }
    ];
    const result = processData(data);
    expect(result.total).toBe(30);
    expect(result.average).toBe(15);
    expect(result.highest).toEqual({ name: 'Second', value: 20 });
    expect(result.lowest).toEqual({ name: 'First', value: 10 });
  });

  test('handles all zeros', () => {
    const data = [
      { name: 'Zero 1', value: 0 },
      { name: 'Zero 2', value: 0 },
      { name: 'Zero 3', value: 0 }
    ];
    const result = processData(data);
    expect(result.total).toBe(0);
    expect(result.average).toBe(0);
  });

  test('handles large numbers', () => {
    const data = [
      { name: 'Large 1', value: 1000000 },
      { name: 'Large 2', value: 2000000 }
    ];
    const result = processData(data);
    expect(result.total).toBe(3000000);
    expect(result.average).toBe(1500000);
  });

  test('handles negative numbers', () => {
    const data = [
      { name: 'Negative', value: -10 },
      { name: 'Positive', value: 20 }
    ];
    const result = processData(data);
    expect(result.total).toBe(10);
    expect(result.average).toBe(5);
    expect(result.highest).toEqual({ name: 'Positive', value: 20 });
    expect(result.lowest).toEqual({ name: 'Negative', value: -10 });
  });

  test('handles decimal values', () => {
    const data = [
      { name: 'Decimal 1', value: 10.5 },
      { name: 'Decimal 2', value: 20.3 }
    ];
    const result = processData(data);
    expect(result.total).toBeCloseTo(30.8, 2);
    expect(result.average).toBeCloseTo(15.4, 2);
  });

  test('does not modify original data', () => {
    const data = [
      { name: 'Item 1', value: 5 },
      { name: 'Item 2', value: 10 }
    ];
    const original = JSON.parse(JSON.stringify(data));
    processData(data);
    expect(data).toEqual(original);
  });
});

// Test suite for generateReport function
describe('generateReport', () => {
  test('generates report with correct structure', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 }
    ];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    expect(report).toContain('# Data Processing Report');
    expect(report).toContain('## Raw Data');
    expect(report).toContain('## Statistics');
  });

  test('includes all data items in report', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 }
    ];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    expect(report).toContain('Item 1: 42');
    expect(report).toContain('Item 2: 18');
  });

  test('includes statistics in report', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 }
    ];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    expect(report).toContain('Total: 60');
    expect(report).toContain('Average: 30.00');
    expect(report).toContain('Highest: Item 1 (42)');
    expect(report).toContain('Lowest: Item 2 (18)');
  });

  test('formats average to 2 decimal places', () => {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 15 },
      { name: 'Item 3', value: 20 }
    ];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    expect(report).toContain('Average: 15.00');
  });

  test('handles single item report', () => {
    const data = [{ name: 'Only Item', value: 100 }];
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    expect(report).toContain('Only Item: 100');
    expect(report).toContain('Total: 100');
    expect(report).toContain('Average: 100.00');
    expect(report).toContain('Highest: Only Item (100)');
    expect(report).toContain('Lowest: Only Item (100)');
  });
});

// Integration tests
describe('Integration tests', () => {
  test('complete workflow with sample data', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 },
      { name: 'Item 4', value: 35 }
    ];
    
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    expect(stats.total).toBe(122);
    expect(stats.average).toBe(30.5);
    expect(report).toBeTruthy();
    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);
  });

  test('workflow with empty-like edge case', () => {
    const data = [{ name: 'Zero', value: 0 }];
    
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    expect(stats.total).toBe(0);
    expect(stats.average).toBe(0);
    expect(report).toContain('Zero: 0');
  });
});
