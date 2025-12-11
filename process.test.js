/**
 * Tests for process.js
 */

const { processData, generateReport } = require('./process');

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

  test('identifies highest value item', () => {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 50 },
      { name: 'Item 3', value: 30 }
    ];
    
    const result = processData(data);
    expect(result.highest).toEqual({ name: 'Item 2', value: 50 });
  });

  test('identifies lowest value item', () => {
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
});

describe('generateReport', () => {
  test('generates correct report format', () => {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 20 }
    ];
    const stats = {
      total: 30,
      average: 15,
      highest: { name: 'Item 2', value: 20 },
      lowest: { name: 'Item 1', value: 10 }
    };
    
    const report = generateReport(data, stats);
    
    expect(report).toContain('# Data Processing Report');
    expect(report).toContain('## Raw Data');
    expect(report).toContain('## Statistics');
    expect(report).toContain('- Item 1: 10');
    expect(report).toContain('- Item 2: 20');
    expect(report).toContain('- Total: 30');
    expect(report).toContain('- Average: 15.00');
    expect(report).toContain('- Highest: Item 2 (20)');
    expect(report).toContain('- Lowest: Item 1 (10)');
  });

  test('formats average to 2 decimal places', () => {
    const data = [
      { name: 'Item 1', value: 10 },
      { name: 'Item 2', value: 15 },
      { name: 'Item 3', value: 20 }
    ];
    const stats = {
      total: 45,
      average: 15.0,
      highest: { name: 'Item 3', value: 20 },
      lowest: { name: 'Item 1', value: 10 }
    };
    
    const report = generateReport(data, stats);
    expect(report).toContain('- Average: 15.00');
  });
});
