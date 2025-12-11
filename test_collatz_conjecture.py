"""
Unit tests for the Collatz Conjecture implementation.

Tests cover various scenarios including:
- Basic functionality with known sequences
- Edge cases (1, 2, small numbers)
- Large numbers
- Invalid input handling
"""

import pytest
from collatz_conjecture import collatz_sequence


class TestCollatzSequence:
    """Test suite for the collatz_sequence function."""
    
    def test_collatz_sequence_with_one(self):
        """Test that starting with 1 returns [1]."""
        result = collatz_sequence(1)
        assert result == [1], "Collatz sequence starting with 1 should be [1]"
    
    def test_collatz_sequence_with_two(self):
        """Test that starting with 2 returns [2, 1]."""
        result = collatz_sequence(2)
        assert result == [2, 1], "Collatz sequence starting with 2 should be [2, 1]"
    
    def test_collatz_sequence_with_three(self):
        """Test the classic sequence starting with 3."""
        result = collatz_sequence(3)
        expected = [3, 10, 5, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"
    
    def test_collatz_sequence_with_five(self):
        """Test sequence starting with 5."""
        result = collatz_sequence(5)
        expected = [5, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"
    
    def test_collatz_sequence_with_ten(self):
        """Test sequence starting with 10."""
        result = collatz_sequence(10)
        expected = [10, 5, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"
    
    def test_collatz_sequence_with_power_of_two(self):
        """Test that powers of 2 follow a simple pattern."""
        result = collatz_sequence(16)
        expected = [16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"
    
    def test_collatz_sequence_with_large_number(self):
        """Test with a larger number to ensure algorithm works."""
        result = collatz_sequence(27)
        # Verify basic properties instead of entire sequence
        assert result[0] == 27, "First element should be the starting number"
        assert result[-1] == 1, "Last element should always be 1"
        assert len(result) > 1, "Sequence should have more than one element"
        # The sequence for 27 is known to be 111 steps
        assert len(result) == 112, "Sequence starting with 27 should have 112 elements"
    
    def test_collatz_sequence_ends_with_one(self):
        """Test that all sequences end with 1."""
        for n in [4, 6, 7, 8, 9, 11, 13, 15, 20, 25]:
            result = collatz_sequence(n)
            assert result[-1] == 1, f"Sequence starting with {n} should end with 1"
    
    def test_collatz_sequence_starts_with_input(self):
        """Test that the sequence always starts with the input number."""
        for n in [1, 5, 10, 15, 20, 100]:
            result = collatz_sequence(n)
            assert result[0] == n, f"Sequence should start with input number {n}"
    
    def test_collatz_sequence_is_list(self):
        """Test that the function returns a list."""
        result = collatz_sequence(7)
        assert isinstance(result, list), "Result should be a list"
    
    def test_collatz_sequence_contains_only_integers(self):
        """Test that all elements in the sequence are integers."""
        result = collatz_sequence(13)
        assert all(isinstance(x, int) for x in result), "All elements should be integers"
    
    def test_collatz_sequence_with_zero_raises_error(self):
        """Test that input of 0 raises ValueError."""
        with pytest.raises(ValueError, match="Input must be a positive integer"):
            collatz_sequence(0)
    
    def test_collatz_sequence_with_negative_raises_error(self):
        """Test that negative input raises ValueError."""
        with pytest.raises(ValueError, match="Input must be a positive integer"):
            collatz_sequence(-1)
    
    def test_collatz_sequence_with_negative_large_raises_error(self):
        """Test that large negative input raises ValueError."""
        with pytest.raises(ValueError, match="Input must be a positive integer"):
            collatz_sequence(-100)
    
    def test_collatz_sequence_length_is_positive(self):
        """Test that sequences always have at least one element."""
        for n in [1, 2, 5, 10, 50]:
            result = collatz_sequence(n)
            assert len(result) >= 1, f"Sequence for {n} should have at least 1 element"
    
    def test_collatz_sequence_monotonic_decrease_for_powers_of_two(self):
        """Test that powers of 2 decrease monotonically."""
        result = collatz_sequence(32)
        expected = [32, 16, 8, 4, 2, 1]
        assert result == expected, "Powers of 2 should decrease by half each step"
        # Verify it's monotonically decreasing
        for i in range(len(result) - 1):
            assert result[i] > result[i + 1], "Should be monotonically decreasing"
