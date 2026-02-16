/**
 * Comprehensive tests for process.js
 * 
 * This test suite covers:
 * - processData function with various inputs
 * - generateReport function output validation
 * - Edge cases and error conditions
 * - Integration of both functions
 */

const { processData, generateReport } = require('./process');

describe('processData', () => {
  describe('basic functionality', () => {
    test('calculates correct total', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 20 },
        { name: 'Item 3', value: 30 }
      ];
      
      const result = processData(data);
      expect(result.total).toBe(60);
    });

    test('calculates correct average', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 20 },
        { name: 'Item 3', value: 30 }
      ];
      
      const result = processData(data);
      expect(result.average).toBe(20);
    });

    test('identifies highest value item', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 30 },
        { name: 'Item 3', value: 20 }
      ];
      
      const result = processData(data);
      expect(result.highest).toEqual({ name: 'Item 2', value: 30 });
    });

    test('identifies lowest value item', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 30 },
        { name: 'Item 3', value: 20 }
      ];
      
      const result = processData(data);
      expect(result.lowest).toEqual({ name: 'Item 1', value: 10 });
    });
  });

  describe('edge cases', () => {
    test('handles single item', () => {
      const data = [{ name: 'Only Item', value: 42 }];
      
      const result = processData(data);
      expect(result.total).toBe(42);
      expect(result.average).toBe(42);
      expect(result.highest).toEqual({ name: 'Only Item', value: 42 });
      expect(result.lowest).toEqual({ name: 'Only Item', value: 42 });
    });

    test('handles items with same values', () => {
      const data = [
        { name: 'Item 1', value: 25 },
        { name: 'Item 2', value: 25 },
        { name: 'Item 3', value: 25 }
      ];
      
      const result = processData(data);
      expect(result.total).toBe(75);
      expect(result.average).toBe(25);
      expect(result.highest.value).toBe(25);
      expect(result.lowest.value).toBe(25);
    });

    test('handles zero values', () => {
      const data = [
        { name: 'Item 1', value: 0 },
        { name: 'Item 2', value: 10 },
        { name: 'Item 3', value: 0 }
      ];
      
      const result = processData(data);
      expect(result.total).toBe(10);
      expect(result.average).toBeCloseTo(3.33, 1);
      expect(result.highest).toEqual({ name: 'Item 2', value: 10 });
      expect(result.lowest.value).toBe(0);
    });

    test('handles negative values', () => {
      const data = [
        { name: 'Item 1', value: -5 },
        { name: 'Item 2', value: 10 },
        { name: 'Item 3', value: -2 }
      ];
      
      const result = processData(data);
      expect(result.total).toBe(3);
      expect(result.average).toBe(1);
      expect(result.highest).toEqual({ name: 'Item 2', value: 10 });
      expect(result.lowest).toEqual({ name: 'Item 1', value: -5 });
    });

    test('handles large numbers', () => {
      const data = [
        { name: 'Item 1', value: 1000000 },
        { name: 'Item 2', value: 2000000 },
        { name: 'Item 3', value: 3000000 }
      ];
      
      const result = processData(data);
      expect(result.total).toBe(6000000);
      expect(result.average).toBe(2000000);
    });

    test('handles decimal values', () => {
      const data = [
        { name: 'Item 1', value: 10.5 },
        { name: 'Item 2', value: 20.7 },
        { name: 'Item 3', value: 15.3 }
      ];
      
      const result = processData(data);
      expect(result.total).toBeCloseTo(46.5, 1);
      expect(result.average).toBeCloseTo(15.5, 1);
    });
  });

  describe('sorting verification', () => {
    test('does not mutate original array', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 30 },
        { name: 'Item 3', value: 20 }
      ];
      
      const originalOrder = [...data];
      processData(data);
      
      expect(data).toEqual(originalOrder);
    });

    test('correctly sorts items descending', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 30 },
        { name: 'Item 3', value: 20 },
        { name: 'Item 4', value: 40 }
      ];
      
      const result = processData(data);
      expect(result.highest.value).toBeGreaterThan(result.lowest.value);
    });
  });

  describe('data structure validation', () => {
    test('returns object with required properties', () => {
      const data = [{ name: 'Item', value: 10 }];
      
      const result = processData(data);
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('average');
      expect(result).toHaveProperty('highest');
      expect(result).toHaveProperty('lowest');
    });

    test('highest and lowest have name and value properties', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 20 }
      ];
      
      const result = processData(data);
      expect(result.highest).toHaveProperty('name');
      expect(result.highest).toHaveProperty('value');
      expect(result.lowest).toHaveProperty('name');
      expect(result.lowest).toHaveProperty('value');
    });
  });
});

describe('generateReport', () => {
  describe('report structure', () => {
    test('generates report with correct sections', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 20 }
      ];
      const stats = processData(data);
      
      const report = generateReport(data, stats);
      
      expect(report).toContain('# Data Processing Report');
      expect(report).toContain('## Raw Data');
      expect(report).toContain('## Statistics');
    });

    test('includes all raw data items', () => {
      const data = [
        { name: 'Item 1', value: 42 },
        { name: 'Item 2', value: 18 }
      ];
      const stats = processData(data);
      
      const report = generateReport(data, stats);
      
      expect(report).toContain('Item 1: 42');
      expect(report).toContain('Item 2: 18');
    });

    test('includes all statistics', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 20 },
        { name: 'Item 3', value: 30 }
      ];
      const stats = processData(data);
      
      const report = generateReport(data, stats);
      
      expect(report).toContain('Total: 60');
      expect(report).toContain('Average: 20.00');
      expect(report).toContain('Highest: Item 3 (30)');
      expect(report).toContain('Lowest: Item 1 (10)');
    });
  });

  describe('number formatting', () => {
    test('formats average with 2 decimal places', () => {
      const data = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 11 }
      ];
      const stats = processData(data);
      
      const report = generateReport(data, stats);
      
      expect(report).toContain('Average: 10.50');
    });

    test('handles zero average correctly', () => {
      const data = [
        { name: 'Item 1', value: 0 },
        { name: 'Item 2', value: 0 }
      ];
      const stats = processData(data);
      
      const report = generateReport(data, stats);
      
      expect(report).toContain('Average: 0.00');
    });
  });

  describe('special characters in names', () => {
    test('handles names with special characters', () => {
      const data = [
        { name: 'Item #1', value: 10 },
        { name: 'Item (2)', value: 20 },
        { name: 'Item-3', value: 30 }
      ];
      const stats = processData(data);
      
      const report = generateReport(data, stats);
      
      expect(report).toContain('Item #1: 10');
      expect(report).toContain('Item (2): 20');
      expect(report).toContain('Item-3: 30');
    });

    test('handles names with quotes', () => {
      const data = [
        { name: "Item's Name", value: 10 },
        { name: 'Item "Two"', value: 20 }
      ];
      const stats = processData(data);
      
      const report = generateReport(data, stats);
      
      expect(report).toContain("Item's Name: 10");
      expect(report).toContain('Item "Two": 20');
    });
  });
});

describe('integration tests', () => {
  test('full workflow with example data', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 },
      { name: 'Item 4', value: 35 }
    ];
    
    const stats = processData(data);
    expect(stats.total).toBe(122);
    expect(stats.average).toBe(30.5);
    expect(stats.highest).toEqual({ name: 'Item 1', value: 42 });
    expect(stats.lowest).toEqual({ name: 'Item 2', value: 18 });
    
    const report = generateReport(data, stats);
    expect(report).toBeTruthy();
    expect(report.length).toBeGreaterThan(0);
  });

  test('handles empty-like edge case with minimal data', () => {
    const data = [{ name: 'Single', value: 100 }];
    
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    expect(report).toContain('Total: 100');
    expect(report).toContain('Average: 100.00');
    expect(report).toContain('Highest: Single (100)');
    expect(report).toContain('Lowest: Single (100)');
  });

  test('maintains consistency between stats and report', () => {
    const data = [
      { name: 'Alpha', value: 50 },
      { name: 'Beta', value: 75 },
      { name: 'Gamma', value: 25 }
    ];
    
    const stats = processData(data);
    const report = generateReport(data, stats);
    
    // Verify the report contains the calculated statistics
    expect(report).toContain(`Total: ${stats.total}`);
    expect(report).toContain(`Average: ${stats.average.toFixed(2)}`);
    expect(report).toContain(`${stats.highest.name} (${stats.highest.value})`);
    expect(report).toContain(`${stats.lowest.name} (${stats.lowest.value})`);
  });
});
