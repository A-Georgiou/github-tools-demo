# Test Coverage Report

This repository now includes comprehensive test coverage for all main code files.

## Overview

**Total Tests: 80 tests across Python and JavaScript/React**
- ✅ Python: 30 tests (70% coverage)
- ✅ JavaScript: 24 tests (100% coverage)
- ✅ React: 26 tests (100% coverage)

## Test Infrastructure

### Python Tests (pytest)
- **Framework**: pytest 7.4.0+ with pytest-cov for coverage
- **Files Tested**:
  - `collatz_conjecture.py` - Collatz sequence generator
  - `vulnerable_example.py` - Security vulnerability demonstration

### JavaScript Tests (Jest)
- **Framework**: Jest 30.x with Babel for transpilation
- **Files Tested**:
  - `process.js` - Data processing functions
  - `dashboard.jsx` - Interactive React dashboard component

## Running Tests

### Prerequisites

Install dependencies:

```bash
# Python dependencies
pip install -r requirements.txt

# JavaScript dependencies
npm install
```

### Run All Tests

```bash
# Python tests
pytest

# JavaScript tests (includes React)
npm test

# With coverage report
pytest --cov=collatz_conjecture --cov=vulnerable_example --cov-report=term-missing
npm run test:coverage
```

### Run Specific Test Suites

```bash
# Python - Collatz tests only
pytest test_collatz_conjecture.py -v

# Python - Security tests only
pytest test_vulnerable_example.py -v

# JavaScript - Process.js tests only
npm test -- process.test.js

# JavaScript - Dashboard tests only
npm test -- dashboard.test.jsx
```

## Test Coverage Details

### Python Coverage (70% overall)

#### `collatz_conjecture.py` (65% coverage)
**17 tests covering:**
- ✅ Normal sequence generation (various starting numbers)
- ✅ Edge cases (n=1, powers of 2, large numbers)
- ✅ Error handling (zero, negative numbers)
- ✅ Sequence validation (starts with input, ends with 1)
- ✅ Data type validation (positive integers only)
- ⚠️ **Uncovered**: Lines 19-24 (main execution block with user input)

**Test Examples:**
- `test_sequence_starting_from_27`: Validates long sequences (112 elements)
- `test_error_on_negative_number`: Ensures proper error handling
- `test_power_of_two`: Verifies optimal descent path

#### `vulnerable_example.py` (83% coverage)
**13 tests covering:**
- ✅ Basic command execution functionality
- ✅ Multiple command injection vectors (semicolon, pipe, &&, backticks, $())
- ✅ Edge cases (empty input, special characters, spaces)
- ✅ Security best practices demonstrations (subprocess, input validation)
- ⚠️ **Uncovered**: Line 9 (main execution block)

**Test Examples:**
- `test_command_injection_vulnerability_with_semicolon`: Documents security vulnerability
- `test_secure_alternative_using_subprocess`: Shows proper implementation
- `test_secure_alternative_path_validation`: Demonstrates input sanitization

### JavaScript Coverage (100%)

#### `process.js` (100% coverage)
**24 tests covering:**
- ✅ Basic statistics calculation (total, average, highest, lowest)
- ✅ Edge cases (single item, same values, zero values, negative values)
- ✅ Large numbers and decimal values
- ✅ Array immutability (original array not mutated)
- ✅ Report generation with proper formatting
- ✅ Special characters in data
- ✅ Integration tests

**Test Examples:**
- `test_handles_zero_values`: Validates edge case handling
- `test_does_not_mutate_original_array`: Ensures functional programming principles
- `test_formats_average_with_2_decimal_places`: Verifies number formatting

#### `dashboard.jsx` (100% coverage)
**26 tests covering:**
- ✅ Component rendering (title, buttons, initial data)
- ✅ Add data functionality (single and multiple additions)
- ✅ Remove data functionality (with minimum threshold)
- ✅ Sort functionality (descending order validation)
- ✅ Hover interactions (details panel show/hide)
- ✅ State management across operations
- ✅ Edge cases (rapid clicks, alternating operations)
- ✅ CSS classes and structure
- ✅ Integration workflows

**Test Examples:**
- `test_adds_multiple_data_points_sequentially`: Tests state updates
- `test_does_not_remove_item_when_only_one_remains`: Validates business logic
- `test_details_panel_shows_correct_information`: Checks interactive features
- `test_complete_workflow_add_sort_remove_hover`: End-to-end integration test

## Test Quality Metrics

### Coverage by Type
- **Unit Tests**: 68 tests (85%)
- **Integration Tests**: 12 tests (15%)

### Test Categories
- **Functionality Tests**: 45 tests
- **Edge Cases**: 20 tests
- **Error Handling**: 10 tests
- **Security Tests**: 13 tests (vulnerability documentation)
- **Integration/Workflow**: 12 tests

## Areas with Limited Coverage

### Python
1. **`collatz_conjecture.py` main block (lines 19-24)**: 
   - Interactive input/output code
   - Not critical for testing as function logic is fully covered
   
2. **`vulnerable_example.py` main block (line 9)**:
   - Interactive execution
   - Intentionally vulnerable code for demonstration

These uncovered lines are in `if __name__ == "__main__"` blocks which are not typically unit tested as they handle user interaction rather than business logic.

## Continuous Integration

These tests are ready to be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run Python tests
  run: |
    pip install -r requirements.txt
    pytest --cov --cov-report=xml

- name: Run JavaScript tests
  run: |
    npm install
    npm run test:coverage
```

## Test Maintenance

### Adding New Tests

**Python:**
```python
# Add to test_collatz_conjecture.py or test_vulnerable_example.py
def test_new_feature(self):
    result = collatz_sequence(15)
    assert result[0] == 15
```

**JavaScript:**
```javascript
// Add to process.test.js or dashboard.test.jsx
test('new feature description', () => {
  const result = processData(data);
  expect(result.total).toBe(expectedValue);
});
```

### Coverage Goals

Current coverage is excellent for the testable codebase:
- **Functional code**: ~100% coverage (all functions fully tested)
- **Overall files**: 70% Python, 100% JavaScript (main blocks excluded)

## Security Testing

The `test_vulnerable_example.py` suite serves as security documentation:
- Documents known vulnerabilities (command injection)
- Demonstrates attack vectors
- Provides secure alternatives
- Useful for security training and awareness

---

**Last Updated**: 2026-02-16
**Test Framework Versions**: pytest 7.4.0+, Jest 30.x
**Node Version**: v24.13.0
**Python Version**: 3.12.3
