"""
Tests for collatz_conjecture.py
"""

import pytest
from collatz_conjecture import collatz_sequence


class TestCollatzSequence:
    """Test suite for the collatz_sequence function"""

    def test_basic_sequence_starting_from_5(self):
        """Test the Collatz sequence starting from 5"""
        result = collatz_sequence(5)
        expected = [5, 16, 8, 4, 2, 1]
        assert result == expected

    def test_basic_sequence_starting_from_10(self):
        """Test the Collatz sequence starting from 10"""
        result = collatz_sequence(10)
        expected = [10, 5, 16, 8, 4, 2, 1]
        assert result == expected

    def test_sequence_starting_from_1(self):
        """Test that starting from 1 returns [1]"""
        result = collatz_sequence(1)
        expected = [1]
        assert result == expected

    def test_sequence_starting_from_2(self):
        """Test the Collatz sequence starting from 2"""
        result = collatz_sequence(2)
        expected = [2, 1]
        assert result == expected

    def test_sequence_starting_from_3(self):
        """Test the Collatz sequence starting from 3"""
        result = collatz_sequence(3)
        expected = [3, 10, 5, 16, 8, 4, 2, 1]
        assert result == expected

    def test_sequence_starting_from_27(self):
        """Test a longer sequence starting from 27"""
        result = collatz_sequence(27)
        # The sequence for 27 has exactly 112 steps
        assert result[0] == 27
        assert result[-1] == 1
        assert len(result) == 112

    def test_invalid_input_zero(self):
        """Test that zero raises ValueError"""
        with pytest.raises(ValueError, match="Input must be a positive integer"):
            collatz_sequence(0)

    def test_invalid_input_negative(self):
        """Test that negative numbers raise ValueError"""
        with pytest.raises(ValueError, match="Input must be a positive integer"):
            collatz_sequence(-5)

    def test_sequence_always_ends_with_1(self):
        """Test that sequences always end with 1"""
        for n in [1, 5, 10, 17, 100]:
            result = collatz_sequence(n)
            assert result[-1] == 1

    def test_sequence_starts_with_input(self):
        """Test that sequences always start with the input number"""
        for n in [1, 5, 10, 17, 100]:
            result = collatz_sequence(n)
            assert result[0] == n

    def test_large_number(self):
        """Test with a larger number"""
        result = collatz_sequence(100)
        assert result[0] == 100
        assert result[-1] == 1
        # Verify it's a reasonable length (100 takes 25 steps)
        assert len(result) > 10
