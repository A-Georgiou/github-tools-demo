# Issue #2 Documentation: Goldbach Conjecture Implementation

## Issue Overview

**Issue Number:** #2  
**Title:** Create a Python script for the Goldbach conjecture  
**Status:** Open  
**Related PR:** [#3 - Implement Goldbach conjecture demonstration script](https://github.com/A-Georgiou/github-tools-demo/pull/3)  

## Background

The Goldbach conjecture is one of the oldest and best-known unsolved problems in number theory. It states that every even integer greater than 2 can be expressed as the sum of two primes.

## Requirements

The issue requested a Python script that:

1. **Input Validation**: Accept an even integer greater than 2 as input from the user
2. **Prime Pair Finding**: Find and print a pair of prime numbers that sum to the given even integer (Goldbach pair)
3. **Multiple Pairs**: If multiple pairs exist, print all possible pairs
4. **Error Handling**: Raise a ValueError if input is not an even integer greater than 2
5. **Code Style**: Implement similarly to the existing `collatz_conjecture.py` script

## Implementation Details

### Key Functions

The implementation includes three main functions:

1. **`is_prime(n)`** - Efficiently determines if a number is prime using optimized trial division
2. **`goldbach_pairs(n)`** - Finds all prime pairs that sum to the target number
3. **Main execution block** - Handles user input and error cases

### Code Style Consistency

The implementation follows the same patterns as `collatz_conjecture.py`:
- Similar docstring format and function organization
- Consistent error handling with try-except blocks
- Matching user interaction patterns and output formatting
- Clear input validation and user prompts

## Example Usage

```bash
$ python3 goldbach_conjecture.py
Enter an even integer greater than 2 to test the Goldbach conjecture: 28
Goldbach pairs for 28: [(5, 23), (11, 17)]
```

### Edge Cases Handled

- **Input validation**: Only accepts even integers greater than 2
- **Non-integer input**: Gracefully handles with error messages
- **Smallest valid input**: Works correctly with 4 (the smallest valid input)
- **Large numbers**: Efficiently processes larger even integers

## Development Process

### Conversation History

1. **Initial Request**: User requested a Python script implementing the Goldbach conjecture, similar in style to `collatz_conjecture.py`
2. **Issue Creation**: The issue was drafted and saved as #2
3. **PR Initiation**: A pull request (#3) was created with a WIP Goldbach conjecture script
4. **Code Review**: Discussion about potential bugs and code quality
5. **Documentation Request**: User requested to document this conversation process

### Implementation Timeline

- **Issue Created**: July 31, 2025
- **PR Created**: July 31, 2025 (same day)
- **Current Status**: PR is in draft state awaiting review

## Technical Specifications

### Algorithm Complexity

- **Prime checking**: O(√n) time complexity for each prime test
- **Pair finding**: O(n√n) worst case, but typically much faster due to early termination
- **Space complexity**: O(1) for the algorithm itself

### Dependencies

- **Python Standard Library Only**: No external dependencies required
- **Minimum Python Version**: Python 3.x (uses standard integer division)

## Testing Considerations

### Test Cases to Validate

1. **Valid inputs**: 4, 6, 8, 10, 20, 28, 100
2. **Invalid inputs**: 3, 5, 7 (odd numbers), 1, 0, -2 (too small)
3. **Non-numeric input**: Strings, floats, special characters
4. **Edge cases**: Minimum valid input (4), larger numbers

### Expected Outputs

- **4**: [(2, 2)]
- **6**: [(3, 3)]
- **8**: [(3, 5)]
- **10**: [(3, 7), (5, 5)]
- **28**: [(5, 23), (11, 17)]

## Mathematical Background

### Goldbach Conjecture Statement

"Every even integer greater than 2 can be expressed as the sum of two primes."

### Historical Context

- **Proposed**: 1742 by Christian Goldbach
- **Status**: Unproven but verified for very large numbers
- **Computational verification**: Tested for numbers up to 4 × 10^18

### Related Concepts

- **Prime numbers**: Numbers greater than 1 with exactly two factors
- **Computational number theory**: Algorithms for number-theoretic problems
- **Conjecture verification**: Computational approaches to mathematical problems

## File Structure

```
github-tools-demo/
├── collatz_conjecture.py     # Reference implementation
├── goldbach_conjecture.py    # New implementation (via PR #3)
├── issues/
│   ├── 2_summary.md         # Original conversation summary
│   └── 2_documentation.md   # This comprehensive documentation
└── README.md                # Updated project documentation
```

## References

- [Issue #2](https://github.com/A-Georgiou/github-tools-demo/issues/2)
- [Pull Request #3](https://github.com/A-Georgiou/github-tools-demo/pull/3)
- [Goldbach Conjecture - Wikipedia](https://en.wikipedia.org/wiki/Goldbach%27s_conjecture)
- Reference implementation: `collatz_conjecture.py`

---

*This documentation was created to provide comprehensive information about the development process and implementation details for the Goldbach conjecture script as requested in the original conversation.*