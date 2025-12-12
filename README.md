# GitHub Tools Demo

A demonstration repository containing various code examples and tools.

## Contents

- `process.js` - Node.js data processing script with statistics calculation
- `collatz_conjecture.py` - Python implementation of the Collatz conjecture
- `vulnerable_example.py` - Example demonstrating a security vulnerability (for educational purposes)
- `dashboard.jsx` - React component for data visualization

## Testing

This repository includes comprehensive test suites for both JavaScript and Python code.

### Prerequisites

- Node.js (v20+)
- Python 3.12+
- npm

### Installation

Install dependencies:

```bash
npm install
pip install pytest
```

### Running Tests

Run all tests:
```bash
npm test
```

Run JavaScript tests only:
```bash
npm run test:js
```

Run Python tests only:
```bash
npm run test:py
```

### Test Coverage

- **JavaScript Tests** (`process.test.js`): 8 tests covering data processing and report generation
- **Python Tests** (`test_collatz_conjecture.py`): 11 tests covering the Collatz sequence implementation
- **Security Tests** (`test_vulnerable_example.py`): 5 tests documenting the command injection vulnerability

## License

ISC

