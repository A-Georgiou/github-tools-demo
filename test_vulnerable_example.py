"""
Tests for vulnerable_example.py

Note: This file contains intentionally vulnerable code for demonstration purposes.
These tests verify the vulnerability exists and document it for security awareness.
DO NOT use this code in production.
"""

import pytest
from unittest.mock import patch, MagicMock
import vulnerable_example


class TestVulnerableExample:
    """Test cases documenting the command injection vulnerability"""

    @patch('vulnerable_example.input')
    @patch('vulnerable_example.os.system')
    def test_basic_functionality_with_safe_input(self, mock_system, mock_input):
        """Test that the function works with safe input"""
        mock_input.return_value = "test.txt"
        
        vulnerable_example.insecure_function()
        
        mock_system.assert_called_once_with("ls test.txt")

    @patch('vulnerable_example.input')
    @patch('vulnerable_example.os.system')
    def test_vulnerability_command_injection(self, mock_system, mock_input):
        """
        SECURITY WARNING: This test demonstrates a command injection vulnerability.
        
        The function concatenates user input directly into a shell command without
        sanitization, allowing arbitrary command execution.
        
        Example: Input like "; rm -rf /" would execute additional commands.
        """
        # Simulate malicious input
        mock_input.return_value = "file.txt; echo 'injected command'"
        
        vulnerable_example.insecure_function()
        
        # This demonstrates the vulnerability - the malicious command is executed
        mock_system.assert_called_once_with("ls file.txt; echo 'injected command'")

    @patch('vulnerable_example.input')
    @patch('vulnerable_example.os.system')
    def test_vulnerability_with_pipe(self, mock_system, mock_input):
        """Test another command injection vector using pipe"""
        mock_input.return_value = "file.txt | cat /etc/passwd"
        
        vulnerable_example.insecure_function()
        
        # This shows how pipe operators can be abused
        mock_system.assert_called_once_with("ls file.txt | cat /etc/passwd")

    def test_security_documentation(self):
        """
        Documentation of the security issue:
        
        VULNERABILITY: CWE-78 OS Command Injection
        SEVERITY: Critical
        
        The insecure_function() uses os.system() with unsanitized user input,
        allowing attackers to execute arbitrary commands.
        
        REMEDIATION:
        1. Use subprocess module with shell=False
        2. Use pathlib for file operations
        3. Validate and sanitize all user input
        4. Use allowlists for permitted characters/values
        
        Example secure alternative:
            import subprocess
            subprocess.run(['ls', user_input], check=True)
        """
        # This test exists purely for documentation
        assert True, "This test documents the security vulnerability"
