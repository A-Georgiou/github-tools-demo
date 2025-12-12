# Testing Guide for github-tools-demo

This repository contains a test suite for all the code files.

## Running Tests

### JavaScript Tests

The repository uses Jest for JavaScript testing.

**Install dependencies:**
```bash
npm install
```

**Run tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

### Python Tests

The repository uses pytest for Python testing.

**Install pytest:**
```bash
pip install pytest
```

**Run tests:**
```bash
pytest test_collatz_conjecture.py -v
```

**Run all Python tests:**
```bash
pytest -v
```

## Test Coverage

### JavaScript (process.js)
- ✅ `processData()` function tests
  - Total calculation
  - Average calculation
  - Highest value identification
  - Lowest value identification
  - Single item handling

- ✅ `generateReport()` function tests
  - Report structure validation
  - Data inclusion verification
  - Statistics formatting

**Test file:** `process.test.js`  
**Tests:** 8 tests, all passing

### Python (collatz_conjecture.py)
- ✅ `collatz_sequence()` function tests
  - Basic sequences (5, 10, 1, 2, 3, 27)
  - Edge cases (1, large numbers)
  - Error handling (zero, negative numbers)
  - Sequence properties (starts with input, ends with 1)

**Test file:** `test_collatz_conjecture.py`  
**Tests:** 11 tests, all passing

## Manual Testing

### chart.html
This is an interactive HTML page. To test:

1. Open `chart.html` in a web browser
2. Adjust the input values (0-100)
3. Verify that the bars update in real-time
4. Check that the bars reflect the percentage of the input values

### dashboard.jsx
This is a React component that requires a build setup. To test:

1. This component would need to be integrated into a React application
2. Key features to test:
   - Add Random Data button functionality
   - Remove Last Item button functionality
   - Sort by Value button functionality
   - Hover effects on bars
   - Details panel display

### animation.svg
This is an SVG file that can be viewed directly in a browser or image viewer.

### vulnerable_example.py
⚠️ **Warning:** This file contains intentionally vulnerable code (command injection) and should **NOT** be run or tested in production environments. It is included for educational/demonstration purposes only.

## Test Results Summary

✅ **All automated tests passing**
- JavaScript: 8/8 tests passing
- Python: 11/11 tests passing
- Total: 19/19 tests passing
