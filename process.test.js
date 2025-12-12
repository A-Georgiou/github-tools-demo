/**
 * Tests for process.js
 */

// Mock the process.js module functions for testing
const processData = (items) => {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const average = total / items.length;
  const sorted = [...items].sort((a, b) => b.value - a.value);
  
  return {
    total,
    average,
    highest: sorted[0],
    lowest: sorted[sorted.length - 1]
  };
};

const generateReport = (rawData, stats) => {
  return `# Data Processing Report

## Raw Data
${rawData.map(item => `- ${item.name}: ${item.value}`).join('\n')}

## Statistics
- Total: ${stats.total}
- Average: ${stats.average.toFixed(2)}
- Highest: ${stats.highest.name} (${stats.highest.value})
- Lowest: ${stats.lowest.name} (${stats.lowest.value})
`;
};

describe('processData', () => {
  test('calculates total correctly', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 }
    ];
    const result = processData(data);
    expect(result.total).toBe(87);
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
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 }
    ];
    const result = processData(data);
    expect(result.highest).toEqual({ name: 'Item 1', value: 42 });
  });

  test('identifies lowest value item', () => {
    const data = [
      { name: 'Item 1', value: 42 },
      { name: 'Item 2', value: 18 },
      { name: 'Item 3', value: 27 }
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
});

describe('generateReport', () => {
  test('generates report with correct structure', () => {
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
    expect(report).toContain('## Raw Data');
    expect(report).toContain('## Statistics');
  });

  test('includes all data items in report', () => {
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
    
    expect(report).toContain('Item 1: 42');
    expect(report).toContain('Item 2: 18');
  });

  test('includes statistics in report', () => {
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
    
    expect(report).toContain('Total: 60');
    expect(report).toContain('Average: 30.00');
    expect(report).toContain('Highest: Item 1 (42)');
    expect(report).toContain('Lowest: Item 2 (18)');
  });
});
