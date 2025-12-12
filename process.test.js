/**
 * Tests for process.js data processing functions
 */

const { processData, generateReport } = require('./process.js');

describe('processData', () => {
  test('calculates total correctly', () => {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 20 },
      { name: 'Item 3', value: 30 }
    ];
    const result = processData(data);
    expect(result.total).toBe(60);
  });

  test('calculates average correctly', () => {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 20 },
      { name: 'Item 3', value: 30 }
    ];
    const result = processData(data);
    expect(result.average).toBe(20);
  });

  test('finds highest value correctly', () => {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 50 },
      { name: 'Item 3', value: 30 }
    ];
    const result = processData(data);
    expect(result.highest).toEqual({ name: 'Item 2', value: 50 });
  });

  test('finds lowest value correctly', () => {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 50 },
      { name: 'Item 3', value: 30 }
    ];
    const result = processData(data);
    expect(result.lowest).toEqual({ name: 'Item 1', value: 10 });
  });

  test('handles single item', () => {
    const data = [{ name: 'Only Item', value: 42 }];
    const result = processData(data);
    expect(result.total).toBe(42);
    expect(result.average).toBe(42);
    expect(result.highest).toEqual({ name: 'Only Item', value: 42 });
    expect(result.lowest).toEqual({ name: 'Only Item', value: 42 });
  });

  test('handles empty array', () => {
    const data = [];
    const result = processData(data);
    expect(result.total).toBe(0);
    expect(result.average).toBeNaN();
  });
});

describe('generateReport', () => {
  test('generates correct report format', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 }
    ];
    const stats = {
      total: 60,
      average: 30,
      highest: { name: 'Item 1', value: 42 },
      lowest: { name: 'Item 2', value: 18 }
    };
    const report = generateReport(data, stats);
    
    expect(report).toContain('# Data Processing Report');
    expect(report).toContain('Item 1: 42');
    expect(report).toContain('Item 2: 18');
    expect(report).toContain('Total: 60');
    expect(report).toContain('Average: 30.00');
    expect(report).toContain('Highest: Item 1 (42)');
    expect(report).toContain('Lowest: Item 2 (18)');
  });

  test('formats average to 2 decimal places', () => {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 15 },
      { name: 'Item 3', value: 17 }
    ];
    const stats = {
      total: 42,
      average: 14.0,
      highest: { name: 'Item 3', value: 17 },
      lowest: { name: 'Item 1', value: 10 }
    };
    const report = generateReport(data, stats);
    
    expect(report).toContain('Average: 14.00');
  });
});
