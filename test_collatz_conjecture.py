"""
Unit tests for collatz_conjecture.py

This test suite validates the Collatz conjecture implementation,
including edge cases, error handling, and sequence correctness.
"""

import unittest
from collatz_conjecture import collatz_sequence


class TestCollatzSequence(unittest.TestCase):
    """Test cases for the Collatz sequence generator"""
    
    def test_collatz_starting_with_1(self):
        """Test that starting with 1 returns [1]"""
        result = collatz_sequence(1)
        self.assertEqual(result, [1])
    
    def test_collatz_starting_with_2(self):
        """Test sequence starting with 2: 2 -> 1"""
        result = collatz_sequence(2)
        self.assertEqual(result, [2, 1])
    
    def test_collatz_starting_with_3(self):
        """Test sequence starting with 3: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1"""
        result = collatz_sequence(3)
        self.assertEqual(result, [3, 10, 5, 16, 8, 4, 2, 1])
    
    def test_collatz_starting_with_4(self):
        """Test sequence starting with 4: 4 -> 2 -> 1"""
        result = collatz_sequence(4)
        self.assertEqual(result, [4, 2, 1])
    
    def test_collatz_starting_with_5(self):
        """Test sequence starting with 5"""
        result = collatz_sequence(5)
        self.assertEqual(result, [5, 16, 8, 4, 2, 1])
    
    def test_collatz_starting_with_6(self):
        """Test sequence starting with 6"""
        result = collatz_sequence(6)
        self.assertEqual(result, [6, 3, 10, 5, 16, 8, 4, 2, 1])
    
    def test_collatz_starting_with_10(self):
        """Test sequence starting with 10"""
        result = collatz_sequence(10)
        self.assertEqual(result, [10, 5, 16, 8, 4, 2, 1])
    
    def test_collatz_starting_with_27(self):
        """Test sequence starting with 27 (has a longer sequence)"""
        result = collatz_sequence(27)
        # The sequence for 27 has 112 steps, let's verify key points
        self.assertEqual(result[0], 27)
        self.assertEqual(result[-1], 1)
        self.assertGreater(len(result), 100)
        self.assertIn(9232, result)  # Known high point in the sequence
    
    def test_collatz_negative_number(self):
        """Test that negative numbers raise ValueError"""
        with self.assertRaises(ValueError) as context:
            collatz_sequence(-5)
        self.assertIn("positive integer", str(context.exception))
    
    def test_collatz_zero(self):
        """Test that zero raises ValueError"""
        with self.assertRaises(ValueError) as context:
            collatz_sequence(0)
        self.assertIn("positive integer", str(context.exception))
    
    def test_collatz_large_number(self):
        """Test with a larger starting number (100)"""
        result = collatz_sequence(100)
        self.assertEqual(result[0], 100)
        self.assertEqual(result[-1], 1)
        self.assertGreater(len(result), 1)
        # Verify the sequence follows Collatz rules
        for i in range(len(result) - 1):
            current = result[i]
            next_val = result[i + 1]
            if current % 2 == 0:
                self.assertEqual(next_val, current // 2)
            else:
                self.assertEqual(next_val, 3 * current + 1)
    
    def test_collatz_always_ends_with_1(self):
        """Test that sequences always end with 1 for various inputs"""
        test_values = [1, 2, 7, 15, 20, 50, 99, 128, 255]
        for n in test_values:
            with self.subTest(n=n):
                result = collatz_sequence(n)
                self.assertEqual(result[-1], 1)
    
    def test_collatz_sequence_rules(self):
        """Test that each step follows Collatz rules correctly"""
        result = collatz_sequence(13)
        # Verify each transition follows the rules
        for i in range(len(result) - 1):
            current = result[i]
            next_val = result[i + 1]
            if current == 1:
                break
            if current % 2 == 0:
                # Even: divide by 2
                self.assertEqual(next_val, current // 2, 
                               f"At step {i}: {current} should be followed by {current // 2}, got {next_val}")
            else:
                # Odd: multiply by 3 and add 1
                self.assertEqual(next_val, 3 * current + 1,
                               f"At step {i}: {current} should be followed by {3 * current + 1}, got {next_val}")
    
    def test_collatz_return_type(self):
        """Test that the function returns a list"""
        result = collatz_sequence(5)
        self.assertIsInstance(result, list)
    
    def test_collatz_all_elements_are_integers(self):
        """Test that all elements in the sequence are integers"""
        result = collatz_sequence(15)
        for value in result:
            self.assertIsInstance(value, int)
    
    def test_collatz_sequence_starts_with_input(self):
        """Test that the sequence always starts with the input value"""
        test_values = [1, 5, 10, 42, 100]
        for n in test_values:
            with self.subTest(n=n):
                result = collatz_sequence(n)
                self.assertEqual(result[0], n)


class TestCollatzProperties(unittest.TestCase):
    """Test mathematical properties of the Collatz sequence"""
    
    def test_sequence_is_non_empty(self):
        """Test that sequences are never empty"""
        for n in range(1, 20):
            with self.subTest(n=n):
                result = collatz_sequence(n)
                self.assertGreater(len(result), 0)
    
    def test_sequence_contains_only_positive_integers(self):
        """Test that all values in sequences are positive"""
        for n in [1, 5, 10, 27, 50, 100]:
            with self.subTest(n=n):
                result = collatz_sequence(n)
                for value in result:
                    self.assertGreater(value, 0)
    
    def test_powers_of_two_have_logarithmic_length(self):
        """Test that powers of 2 have sequence length of log2(n) + 1"""
        # For powers of 2: 2^k -> 2^(k-1) -> ... -> 2 -> 1
        # So length should be k + 1
        for k in range(1, 10):
            n = 2 ** k
            with self.subTest(n=n):
                result = collatz_sequence(n)
                expected_length = k + 1
                self.assertEqual(len(result), expected_length,
                               f"2^{k} = {n} should have sequence length {expected_length}")


if __name__ == '__main__':
    unittest.main()
