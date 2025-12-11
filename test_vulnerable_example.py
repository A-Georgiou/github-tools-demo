"""
Unit tests for the vulnerable_example.py module.

Note: This file contains intentionally vulnerable code for demonstration purposes.
These tests document the expected behavior but should NOT be used in production.
The vulnerable code demonstrates command injection vulnerabilities.
"""

import pytest
from unittest.mock import patch, MagicMock
import io
import sys
from vulnerable_example import insecure_function


class TestInsecureFunction:
    """
    Test suite for the insecure_function.
    
    WARNING: This function has a command injection vulnerability.
    These tests are for documentation purposes only.
    """
    
    @patch('builtins.input', return_value='test.txt')
    @patch('os.system')
    def test_insecure_function_with_simple_filename(self, mock_system, mock_input):
        """Test basic functionality with a simple filename."""
        insecure_function()
        mock_system.assert_called_once_with('ls test.txt')
    
    @patch('builtins.input', return_value='file1.txt')
    @patch('os.system')
    def test_insecure_function_calls_os_system(self, mock_system, mock_input):
        """Test that the function calls os.system."""
        insecure_function()
        assert mock_system.called
        assert mock_system.call_count == 1
    
    @patch('builtins.input', return_value='document.pdf')
    @patch('os.system')
    def test_insecure_function_with_different_extension(self, mock_system, mock_input):
        """Test with a different file extension."""
        insecure_function()
        mock_system.assert_called_once_with('ls document.pdf')
    
    @patch('builtins.input', return_value='')
    @patch('os.system')
    def test_insecure_function_with_empty_string(self, mock_system, mock_input):
        """Test behavior with empty input."""
        insecure_function()
        mock_system.assert_called_once_with('ls ')
    
    @patch('builtins.input', return_value='path/to/file.txt')
    @patch('os.system')
    def test_insecure_function_with_path(self, mock_system, mock_input):
        """Test with a file path."""
        insecure_function()
        mock_system.assert_called_once_with('ls path/to/file.txt')
    
    @patch('builtins.input', return_value='file with spaces.txt')
    @patch('os.system')
    def test_insecure_function_with_spaces(self, mock_system, mock_input):
        """Test with filename containing spaces."""
        insecure_function()
        mock_system.assert_called_once_with('ls file with spaces.txt')
    
    # Tests demonstrating the vulnerability (for educational purposes)
    @patch('builtins.input', return_value='test.txt; rm -rf /')
    @patch('os.system')
    def test_vulnerability_command_injection_semicolon(self, mock_system, mock_input):
        """
        VULNERABILITY TEST: Demonstrates command injection with semicolon.
        This test shows how malicious input can execute arbitrary commands.
        """
        insecure_function()
        # The vulnerable code will pass the entire string to os.system
        mock_system.assert_called_once_with('ls test.txt; rm -rf /')
    
    @patch('builtins.input', return_value='test.txt && cat /etc/passwd')
    @patch('os.system')
    def test_vulnerability_command_injection_and(self, mock_system, mock_input):
        """
        VULNERABILITY TEST: Demonstrates command injection with &&.
        This test shows how malicious input can chain commands.
        """
        insecure_function()
        mock_system.assert_called_once_with('ls test.txt && cat /etc/passwd')
    
    @patch('builtins.input', return_value='test.txt | grep secret')
    @patch('os.system')
    def test_vulnerability_command_injection_pipe(self, mock_system, mock_input):
        """
        VULNERABILITY TEST: Demonstrates command injection with pipe.
        This test shows how malicious input can pipe output to other commands.
        """
        insecure_function()
        mock_system.assert_called_once_with('ls test.txt | grep secret')
    
    @patch('builtins.input', return_value='`whoami`')
    @patch('os.system')
    def test_vulnerability_command_injection_backticks(self, mock_system, mock_input):
        """
        VULNERABILITY TEST: Demonstrates command injection with backticks.
        This test shows how command substitution can be exploited.
        """
        insecure_function()
        mock_system.assert_called_once_with('ls `whoami`')
    
    @patch('builtins.input', return_value='$(id)')
    @patch('os.system')
    def test_vulnerability_command_injection_dollar_paren(self, mock_system, mock_input):
        """
        VULNERABILITY TEST: Demonstrates command injection with $().
        This test shows another form of command substitution.
        """
        insecure_function()
        mock_system.assert_called_once_with('ls $(id)')


class TestSecurityRecommendations:
    """
    This test class documents recommended secure alternatives.
    These tests show how the function SHOULD be implemented.
    """
    
    def test_secure_alternative_example(self):
        """
        Example of a secure implementation using subprocess with shell=False.
        
        Recommended approach:
        import subprocess
        
        def secure_function():
            user_input = input("Enter a filename to list: ")
            # Validate input
            if not user_input or '..' in user_input or '/' in user_input:
                print("Invalid filename")
                return
            # Use subprocess with shell=False and list of arguments
            try:
                subprocess.run(['ls', user_input], check=True)
            except subprocess.CalledProcessError as e:
                print(f"Error: {e}")
        """
        # This is a documentation test
        assert True, "See docstring for secure implementation example"
    
    def test_input_validation_recommendation(self):
        """
        Document recommended input validation strategies:
        1. Whitelist allowed characters (alphanumeric, dots, underscores)
        2. Reject paths (no slashes, no ..)
        3. Limit length
        4. Use subprocess instead of os.system
        5. Never use shell=True with user input
        """
        # This is a documentation test
        assert True, "See docstring for input validation recommendations"
    
    def test_alternative_approaches(self):
        """
        Document alternative secure approaches:
        1. Use pathlib.Path for file operations
        2. Use os.listdir() instead of ls command
        3. Use os.path.exists() to check file existence
        4. Avoid shell commands entirely when possible
        """
        # This is a documentation test
        assert True, "See docstring for alternative approaches"


class TestMainBlock:
    """Tests for the main execution block."""
    
    @patch('builtins.input', return_value='test.txt')
    @patch('os.system')
    def test_main_block_executes_function(self, mock_system, mock_input):
        """
        Test that the main block would execute insecure_function.
        Since we can't easily test __main__, we just verify the function works.
        """
        insecure_function()
        assert mock_system.called
