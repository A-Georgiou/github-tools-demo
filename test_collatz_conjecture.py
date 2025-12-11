"""
Tests for collatz_conjecture.py

The Collatz conjecture (3n+1 problem) states that for any positive integer n,
the sequence defined by repeatedly applying:
- n -> n/2 (if n is even)
- n -> 3n+1 (if n is odd)
will always eventually reach 1.

These tests verify the correctness of the collatz_sequence function for various
inputs, edge cases, and error conditions.
"""

import pytest
from collatz_conjecture import collatz_sequence


class TestCollatzSequence:
    """Test cases for the collatz_sequence function"""

    def test_collatz_with_1(self):
        """Test with n=1 (base case)"""
        result = collatz_sequence(1)
        assert result == [1], "Sequence starting with 1 should just be [1]"

    def test_collatz_with_2(self):
        """Test with n=2"""
        result = collatz_sequence(2)
        assert result == [2, 1], "Sequence for 2 should be [2, 1]"

    def test_collatz_with_3(self):
        """Test with n=3"""
        result = collatz_sequence(3)
        expected = [3, 10, 5, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"

    def test_collatz_with_4(self):
        """Test with n=4"""
        result = collatz_sequence(4)
        expected = [4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"

    def test_collatz_with_5(self):
        """Test with n=5"""
        result = collatz_sequence(5)
        expected = [5, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"

    def test_collatz_with_10(self):
        """Test with n=10"""
        result = collatz_sequence(10)
        expected = [10, 5, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"

    def test_collatz_with_large_number(self):
        """Test with a larger number (27)"""
        result = collatz_sequence(27)
        # Verify it starts with 27 and ends with 1
        assert result[0] == 27, "Sequence should start with 27"
        assert result[-1] == 1, "Sequence should end with 1"
        # The sequence for 27 is known to be quite long (111 steps)
        assert len(result) > 100, "Sequence for 27 should be longer than 100 steps"

    def test_collatz_sequence_always_ends_with_1(self):
        """Test that sequences for various numbers always end with 1"""
        for n in [6, 7, 8, 9, 15, 20, 25]:
            result = collatz_sequence(n)
            assert result[-1] == 1, f"Sequence for {n} should end with 1"
            assert result[0] == n, f"Sequence for {n} should start with {n}"

    def test_collatz_with_zero_raises_error(self):
        """Test that n=0 raises ValueError"""
        with pytest.raises(ValueError, match="Input must be a positive integer"):
            collatz_sequence(0)

    def test_collatz_with_negative_raises_error(self):
        """Test that negative numbers raise ValueError"""
        with pytest.raises(ValueError, match="Input must be a positive integer"):
            collatz_sequence(-5)

    def test_collatz_sequence_contains_only_positive_integers(self):
        """Test that all values in the sequence are positive integers"""
        result = collatz_sequence(7)
        for value in result:
            assert isinstance(value, int), f"All values should be integers, got {type(value)}"
            assert value > 0, f"All values should be positive, got {value}"
