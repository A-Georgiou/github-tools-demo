"""
Security-focused tests for vulnerable_example.py

This test suite demonstrates testing for security vulnerabilities,
specifically command injection vulnerabilities in the insecure_function.

Note: These tests document the vulnerability and verify it exists,
which is useful for security testing and training purposes.
"""

import pytest
from unittest.mock import patch, call
import os
import vulnerable_example


class TestVulnerableExample:
    """Test suite for the vulnerable_example module."""
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_basic_functionality(self, mock_system, mock_input):
        """Test that the function calls os.system with ls command."""
        mock_input.return_value = "test.txt"
        
        vulnerable_example.insecure_function()
        
        # Verify os.system was called
        mock_system.assert_called_once()
        called_command = mock_system.call_args[0][0]
        assert "ls" in called_command
        assert "test.txt" in called_command
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_simple_filename(self, mock_system, mock_input):
        """Test with a simple, safe filename."""
        mock_input.return_value = "document.pdf"
        
        vulnerable_example.insecure_function()
        
        mock_system.assert_called_once_with("ls document.pdf")
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_filename_with_path(self, mock_system, mock_input):
        """Test with a filename that includes a path."""
        mock_input.return_value = "/tmp/test.txt"
        
        vulnerable_example.insecure_function()
        
        mock_system.assert_called_once_with("ls /tmp/test.txt")
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_command_injection_vulnerability_with_semicolon(self, mock_system, mock_input):
        """
        SECURITY TEST: Demonstrate command injection vulnerability using semicolon.
        
        This test verifies that the vulnerability exists by showing that
        arbitrary commands can be injected via user input.
        """
        # Malicious input: list files AND create a marker file
        malicious_input = "test.txt; echo 'injected' > /tmp/marker.txt"
        mock_input.return_value = malicious_input
        
        vulnerable_example.insecure_function()
        
        # Verify the entire malicious command string was passed to os.system
        expected_command = f"ls {malicious_input}"
        mock_system.assert_called_once_with(expected_command)
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_command_injection_vulnerability_with_pipe(self, mock_system, mock_input):
        """
        SECURITY TEST: Demonstrate command injection vulnerability using pipe.
        
        Tests that piped commands can be injected.
        """
        malicious_input = "test.txt | cat /etc/passwd"
        mock_input.return_value = malicious_input
        
        vulnerable_example.insecure_function()
        
        expected_command = f"ls {malicious_input}"
        mock_system.assert_called_once_with(expected_command)
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_command_injection_vulnerability_with_and(self, mock_system, mock_input):
        """
        SECURITY TEST: Demonstrate command injection vulnerability using &&.
        
        Tests that command chaining with && can be exploited.
        """
        malicious_input = "test.txt && whoami"
        mock_input.return_value = malicious_input
        
        vulnerable_example.insecure_function()
        
        expected_command = f"ls {malicious_input}"
        mock_system.assert_called_once_with(expected_command)
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_command_injection_with_backticks(self, mock_system, mock_input):
        """
        SECURITY TEST: Demonstrate command injection with command substitution.
        
        Tests that command substitution using backticks can be exploited.
        """
        malicious_input = "`whoami`"
        mock_input.return_value = malicious_input
        
        vulnerable_example.insecure_function()
        
        expected_command = f"ls {malicious_input}"
        mock_system.assert_called_once_with(expected_command)
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_command_injection_with_dollar_substitution(self, mock_system, mock_input):
        """
        SECURITY TEST: Demonstrate command injection with $() substitution.
        
        Tests that command substitution using $() can be exploited.
        """
        malicious_input = "$(cat /etc/passwd)"
        mock_input.return_value = malicious_input
        
        vulnerable_example.insecure_function()
        
        expected_command = f"ls {malicious_input}"
        mock_system.assert_called_once_with(expected_command)
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_empty_input(self, mock_system, mock_input):
        """Test behavior with empty input."""
        mock_input.return_value = ""
        
        vulnerable_example.insecure_function()
        
        mock_system.assert_called_once_with("ls ")
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_input_with_spaces(self, mock_system, mock_input):
        """Test behavior with filenames containing spaces."""
        mock_input.return_value = "my document.txt"
        
        vulnerable_example.insecure_function()
        
        # This also demonstrates a bug - spaces in filenames aren't properly quoted
        mock_system.assert_called_once_with("ls my document.txt")
    
    @patch('vulnerable_example.input')
    @patch('os.system')
    def test_input_with_special_characters(self, mock_system, mock_input):
        """Test behavior with special shell characters."""
        special_chars = ["*", "?", "[", "]", "'", '"', "$", "`"]
        
        for char in special_chars:
            mock_system.reset_mock()
            mock_input.return_value = f"test{char}.txt"
            
            vulnerable_example.insecure_function()
            
            expected = f"ls test{char}.txt"
            mock_system.assert_called_once_with(expected)


class TestSecurityBestPractices:
    """
    Tests demonstrating secure alternatives to vulnerable_example.py
    
    These tests show what SHOULD be done instead of using os.system with
    untrusted input.
    """
    
    def test_secure_alternative_using_subprocess(self):
        """
        Demonstrate the secure way to execute commands using subprocess.
        
        This test shows how to safely execute commands by using subprocess
        with a list of arguments instead of shell=True.
        """
        import subprocess
        from unittest.mock import patch
        
        filename = "test.txt; rm -rf /"  # Malicious input
        
        # Secure approach: use subprocess with list of arguments
        with patch('subprocess.run') as mock_run:
            # This would be the secure implementation:
            subprocess.run(['ls', filename], check=False)
            
            # Verify that the command is properly sanitized
            mock_run.assert_called_once()
            call_args = mock_run.call_args[0][0]
            
            # In this secure version, the semicolon is treated as part of the filename
            # not as a command separator
            assert call_args == ['ls', filename]
    
    def test_secure_alternative_path_validation(self):
        """
        Demonstrate input validation as a security measure.
        
        This test shows how to validate and sanitize user input.
        """
        import re
        
        def validate_filename(filename):
            """Validate that filename contains only safe characters."""
            # Allow only alphanumeric, dots, hyphens, and underscores
            if re.match(r'^[a-zA-Z0-9._-]+$', filename):
                return True
            return False
        
        # Test validation
        assert validate_filename("test.txt") is True
        assert validate_filename("my-file_2023.txt") is True
        assert validate_filename("test.txt; rm -rf /") is False
        assert validate_filename("test.txt && whoami") is False
        assert validate_filename("$(whoami)") is False
