# Test Suite Documentation

This repository contains a comprehensive test suite for all code files in the github-tools-demo repository.

## Overview

The test suite covers the following modules:

### Python Tests
1. **test_collatz_conjecture.py** - Tests for the Collatz Conjecture implementation
2. **test_vulnerable_example.py** - Tests for the vulnerable example (educational purposes)

### JavaScript Tests
1. **test_process.js** - Tests for the data processing script
2. **test_dashboard.jsx** - Tests for the React Dashboard component

## Running the Tests

### Python Tests

First, install the Python testing dependencies:

```bash
pip install -r requirements-test.txt
```

Run all Python tests:
```bash
pytest
```

Run tests with coverage:
```bash
pytest --cov=. --cov-report=html
```

Run a specific test file:
```bash
pytest test_collatz_conjecture.py
pytest test_vulnerable_example.py
```

Run tests with verbose output:
```bash
pytest -v
```

### JavaScript Tests

First, install the Node.js testing dependencies:

```bash
npm install
```

Run all JavaScript tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests in watch mode (for development):
```bash
npm run test:watch
```

## Test Coverage

### test_collatz_conjecture.py
Tests for the Collatz Conjecture sequence generator:
- ✅ Basic functionality with known sequences (1, 2, 3, 5, 10)
- ✅ Edge cases (1, powers of 2)
- ✅ Large numbers (27, which has a sequence of 112 elements)
- ✅ Invalid input handling (0, negative numbers)
- ✅ Data type verification (returns list of integers)
- ✅ Sequence properties (starts with input, ends with 1)
- ✅ Monotonic decrease for powers of 2

**Total: 17 test cases**

### test_vulnerable_example.py
Tests for the vulnerable command injection example:
- ✅ Basic functionality with simple filenames
- ✅ Behavior with different file extensions and paths
- ✅ Edge cases (empty strings, spaces in filenames)
- ⚠️ Vulnerability demonstrations (command injection scenarios)
- 📚 Documentation of secure alternatives and best practices

**Total: 15 test cases** (including vulnerability documentation)

**Note:** This file contains intentionally vulnerable code for educational purposes. The tests document the vulnerability and provide secure alternatives.

### test_process.js
Tests for the data processing functions:
- ✅ `processData()` function
  - Total calculation
  - Average calculation
  - Highest/lowest value identification
  - Edge cases (single item, two items, all zeros)
  - Large numbers and negative numbers
  - Decimal values
  - Immutability of original data
- ✅ `generateReport()` function
  - Report structure validation
  - Data inclusion in report
  - Statistics formatting
  - Decimal precision
- ✅ Integration tests for complete workflow

**Total: 22 test cases**

### test_dashboard.jsx
Tests for the React Dashboard component:
- ✅ Rendering
  - Title and buttons
  - Initial data items
  - Bar elements
- ✅ Add Random Data functionality
  - Adding single/multiple items
- ✅ Remove Last Item functionality
  - Removing items
  - Preventing removal of last item
  - Add/remove sequences
- ✅ Sort by Value functionality
  - Descending order sorting
  - Data preservation
- ✅ Mouse interactions
  - Hover to show details
  - Mouse leave to hide details
  - Correct detail information
  - Updating details for different items
- ✅ Data visualization
  - Proportional bar widths
  - Correct colors
- ✅ Edge cases
  - Rapid button clicks
  - Alternating operations
  - Percentage calculations

**Total: 24 test cases**

## Total Test Count

**83 comprehensive test cases** covering all code in the repository.

## Test Structure

### Python Tests
Python tests use the `pytest` framework with the following structure:
- Test classes group related tests
- Descriptive test names following `test_<what_is_being_tested>` convention
- Comprehensive docstrings explaining each test
- Use of `pytest.raises()` for exception testing
- Mocking with `unittest.mock` for testing vulnerable code safely

### JavaScript Tests
JavaScript tests use `Jest` and React Testing Library with the following structure:
- `describe` blocks group related tests
- `test` or `it` blocks for individual test cases
- React Testing Library for component testing
- Mocking and snapshot testing where appropriate
- Coverage of both unit and integration scenarios

## Continuous Integration

These tests can be easily integrated into CI/CD pipelines:

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test-python:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.x'
      - run: pip install -r requirements-test.txt
      - run: pytest --cov=. --cov-report=xml
      
  test-javascript:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
```

## Security Notes

⚠️ **Important:** The `test_vulnerable_example.py` file contains tests for intentionally vulnerable code. This is for educational purposes to demonstrate:
- Command injection vulnerabilities
- Secure coding alternatives
- Input validation best practices

**Never use the patterns in `vulnerable_example.py` in production code.**

## Contributing

When adding new code to the repository, please:
1. Write corresponding tests following the existing patterns
2. Ensure all tests pass before committing
3. Aim for high test coverage (>80%)
4. Include both positive and negative test cases
5. Test edge cases and error conditions

## License

MIT
