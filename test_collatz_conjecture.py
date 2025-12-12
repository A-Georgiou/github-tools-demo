"""
Tests for collatz_conjecture.py
"""

import pytest
from collatz_conjecture import collatz_sequence


class TestCollatzSequence:
    """Test cases for the collatz_sequence function"""

    def test_collatz_sequence_with_1(self):
        """Test that sequence starting with 1 returns [1]"""
        result = collatz_sequence(1)
        assert result == [1]

    def test_collatz_sequence_with_2(self):
        """Test sequence starting with 2"""
        result = collatz_sequence(2)
        assert result == [2, 1]

    def test_collatz_sequence_with_3(self):
        """Test sequence starting with 3"""
        result = collatz_sequence(3)
        expected = [3, 10, 5, 16, 8, 4, 2, 1]
        assert result == expected

    def test_collatz_sequence_with_5(self):
        """Test sequence starting with 5"""
        result = collatz_sequence(5)
        expected = [5, 16, 8, 4, 2, 1]
        assert result == expected

    def test_collatz_sequence_with_6(self):
        """Test sequence starting with 6"""
        result = collatz_sequence(6)
        expected = [6, 3, 10, 5, 16, 8, 4, 2, 1]
        assert result == expected

    def test_collatz_sequence_with_27(self):
        """Test sequence starting with 27 (longer sequence)"""
        result = collatz_sequence(27)
        # Verify it starts with 27 and ends with 1
        assert result[0] == 27
        assert result[-1] == 1
        # Verify sequence length is correct
        assert len(result) == 112

    def test_collatz_sequence_negative_raises_error(self):
        """Test that negative input raises ValueError"""
        with pytest.raises(ValueError, match="Input must be a positive integer"):
            collatz_sequence(-5)

    def test_collatz_sequence_zero_raises_error(self):
        """Test that zero input raises ValueError"""
        with pytest.raises(ValueError, match="Input must be a positive integer"):
            collatz_sequence(0)

    def test_collatz_sequence_returns_list(self):
        """Test that the function returns a list"""
        result = collatz_sequence(10)
        assert isinstance(result, list)

    def test_collatz_sequence_all_positive(self):
        """Test that all values in sequence are positive"""
        result = collatz_sequence(13)
        assert all(n > 0 for n in result)

    def test_collatz_sequence_ends_with_1(self):
        """Test that sequence always ends with 1"""
        for n in [7, 15, 19, 50, 100]:
            result = collatz_sequence(n)
            assert result[-1] == 1
