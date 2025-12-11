# Testing Guide

This document explains how to run the tests for this repository.

## Test Coverage

This repository includes tests for:

1. **JavaScript/Node.js** - `process.js` data processing functions
2. **Python** - `collatz_conjecture.py` mathematical sequence generator
3. **Python** - `vulnerable_example.py` security vulnerability documentation
4. **React/JSX** - `dashboard.jsx` interactive dashboard component

## Prerequisites

### For JavaScript/Node.js Tests
- Node.js (v14 or higher)
- npm or yarn

### For Python Tests
- Python 3.7 or higher
- pip

## Running JavaScript Tests

### Installation
```bash
npm install
```

### Run Tests
```bash
# Run all JavaScript tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Files
- `process.test.js` - Tests for data processing functions
- `dashboard.test.jsx` - Tests for React dashboard component

## Running Python Tests

### Installation
```bash
pip install -r requirements-test.txt
```

### Run Tests
```bash
# Run all Python tests
pytest

# Run with verbose output
pytest -v

# Run with coverage report
pytest --cov=. --cov-report=html

# Run specific test file
pytest test_collatz_conjecture.py
pytest test_vulnerable_example.py
```

### Test Files
- `test_collatz_conjecture.py` - Tests for Collatz conjecture sequence generator
- `test_vulnerable_example.py` - Tests documenting security vulnerabilities (for educational purposes)

## Test Structure

### JavaScript Tests (Jest)
- Uses Jest testing framework
- React components tested with React Testing Library
- Configuration in `jest.config.js`

### Python Tests (pytest)
- Uses pytest framework
- Follows pytest naming conventions (`test_*.py`)
- Includes unit tests and security documentation tests

## Security Note

The `test_vulnerable_example.py` file contains tests for intentionally vulnerable code. This is for educational purposes only to demonstrate command injection vulnerabilities. **DO NOT use the vulnerable code in production environments.**

## Continuous Integration

To run all tests in a CI/CD pipeline:

```bash
# Install JavaScript dependencies
npm install

# Run JavaScript tests
npm test

# Install Python dependencies
pip install -r requirements-test.txt

# Run Python tests
pytest
```

## Coverage Reports

### JavaScript Coverage
After running `npm run test:coverage`, open `coverage/lcov-report/index.html` in your browser.

### Python Coverage
After running `pytest --cov=. --cov-report=html`, open `htmlcov/index.html` in your browser.

## Troubleshooting

### JavaScript Tests
- If tests fail to run, ensure Node.js version is 14 or higher
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Python Tests
- If imports fail, ensure you're running tests from the repository root
- Use a virtual environment to avoid dependency conflicts:
  ```bash
  python -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
  pip install -r requirements-test.txt
  ```

## Contributing

When adding new code, please ensure:
1. All new functions have corresponding tests
2. Tests cover edge cases and error conditions
3. Tests follow the existing naming and structure conventions
4. All tests pass before submitting changes
