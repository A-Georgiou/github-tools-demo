"""
Comprehensive tests for collatz_conjecture.py

This test suite covers:
- Normal operation with various inputs
- Edge cases (n=1, small numbers)
- Error handling (invalid inputs)
- Sequence validation
"""

import pytest
from collatz_conjecture import collatz_sequence


class TestCollatzSequence:
    """Test suite for the collatz_sequence function."""
    
    def test_sequence_starting_from_1(self):
        """Test that starting from 1 returns [1]."""
        result = collatz_sequence(1)
        assert result == [1], "Sequence starting from 1 should be [1]"
    
    def test_sequence_starting_from_2(self):
        """Test sequence starting from 2."""
        result = collatz_sequence(2)
        assert result == [2, 1], "Sequence from 2 should be [2, 1]"
    
    def test_sequence_starting_from_3(self):
        """Test sequence starting from 3."""
        result = collatz_sequence(3)
        expected = [3, 10, 5, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"
    
    def test_sequence_starting_from_5(self):
        """Test sequence starting from 5."""
        result = collatz_sequence(5)
        expected = [5, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"
    
    def test_sequence_starting_from_10(self):
        """Test sequence starting from 10."""
        result = collatz_sequence(10)
        expected = [10, 5, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"
    
    def test_sequence_starting_from_27(self):
        """Test sequence starting from 27 (longer sequence)."""
        result = collatz_sequence(27)
        # 27 has a notably long sequence
        assert result[0] == 27, "First element should be the starting number"
        assert result[-1] == 1, "Last element should always be 1"
        assert len(result) == 112, "Sequence from 27 should have 112 elements"
    
    def test_sequence_ends_with_1(self):
        """Test that all sequences end with 1."""
        test_values = [1, 2, 3, 4, 5, 7, 10, 15, 20, 100]
        for n in test_values:
            result = collatz_sequence(n)
            assert result[-1] == 1, f"Sequence from {n} should end with 1"
    
    def test_sequence_starts_with_input(self):
        """Test that all sequences start with the input value."""
        test_values = [1, 5, 10, 15, 25, 50, 100]
        for n in test_values:
            result = collatz_sequence(n)
            assert result[0] == n, f"Sequence should start with {n}"
    
    def test_large_number(self):
        """Test with a large starting number."""
        result = collatz_sequence(1000)
        assert result[0] == 1000, "First element should be 1000"
        assert result[-1] == 1, "Last element should be 1"
        assert len(result) > 1, "Sequence should have multiple elements"
    
    def test_sequence_contains_only_positive_integers(self):
        """Test that all values in sequence are positive integers."""
        result = collatz_sequence(15)
        for value in result:
            assert isinstance(value, int), f"Value {value} should be an integer"
            assert value > 0, f"Value {value} should be positive"
    
    def test_error_on_zero(self):
        """Test that 0 raises a ValueError."""
        with pytest.raises(ValueError) as exc_info:
            collatz_sequence(0)
        assert "positive integer" in str(exc_info.value).lower()
    
    def test_error_on_negative_number(self):
        """Test that negative numbers raise a ValueError."""
        with pytest.raises(ValueError) as exc_info:
            collatz_sequence(-5)
        assert "positive integer" in str(exc_info.value).lower()
    
    def test_error_on_negative_one(self):
        """Test that -1 raises a ValueError."""
        with pytest.raises(ValueError) as exc_info:
            collatz_sequence(-1)
        assert "positive integer" in str(exc_info.value).lower()
    
    def test_even_number_transformation(self):
        """Test that even numbers are correctly divided by 2."""
        result = collatz_sequence(8)
        # 8 -> 4 -> 2 -> 1
        assert result == [8, 4, 2, 1], "Even numbers should be divided by 2"
    
    def test_odd_number_transformation(self):
        """Test that odd numbers are correctly transformed (3n + 1)."""
        result = collatz_sequence(7)
        # 7 -> 22 -> 11 -> 34 -> 17 -> 52 -> 26 -> 13 -> 40 -> 20 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1
        assert result[0] == 7, "Should start with 7"
        assert result[1] == 22, "7 * 3 + 1 = 22"
        assert result[-1] == 1, "Should end with 1"
    
    def test_power_of_two(self):
        """Test with powers of 2 (should have shortest sequences)."""
        # Powers of 2 should directly descend: 16 -> 8 -> 4 -> 2 -> 1
        result = collatz_sequence(16)
        expected = [16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"
        
        result = collatz_sequence(32)
        expected = [32, 16, 8, 4, 2, 1]
        assert result == expected, f"Expected {expected}, got {result}"
    
    def test_sequence_length_varies(self):
        """Test that different inputs produce sequences of different lengths."""
        seq1 = collatz_sequence(1)
        seq5 = collatz_sequence(5)
        seq10 = collatz_sequence(10)
        
        assert len(seq1) == 1, "Sequence from 1 should have length 1"
        assert len(seq5) == 6, "Sequence from 5 should have length 6"
        assert len(seq10) == 7, "Sequence from 10 should have length 7"
