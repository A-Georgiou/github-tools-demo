/**
 * Unit tests for dashboard.jsx
 * 
 * This test suite validates the Dashboard React component including
 * state management, data manipulation, and rendering logic.
 * 
 * Note: These tests use React Testing Library conventions.
 * To run these tests, you would need to install:
 * - @testing-library/react
 * - @testing-library/jest-dom
 * - jest
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './dashboard';

describe('Dashboard Component', () => {
  
  describe('Initial Rendering', () => {
    
    it('should render the dashboard title', () => {
      render(<Dashboard />);
      expect(screen.getByText('Interactive Dashboard')).toBeInTheDocument();
    });
    
    it('should render all control buttons', () => {
      render(<Dashboard />);
      expect(screen.getByText('Add Random Data')).toBeInTheDocument();
      expect(screen.getByText('Remove Last Item')).toBeInTheDocument();
      expect(screen.getByText('Sort by Value')).toBeInTheDocument();
    });
    
    it('should render initial data points', () => {
      render(<Dashboard />);
      expect(screen.getByText(/Category A: 65/)).toBeInTheDocument();
      expect(screen.getByText(/Category B: 40/)).toBeInTheDocument();
      expect(screen.getByText(/Category C: 80/)).toBeInTheDocument();
      expect(screen.getByText(/Category D: 35/)).toBeInTheDocument();
    });
    
    it('should render exactly 4 initial data items', () => {
      const { container } = render(<Dashboard />);
      const bars = container.querySelectorAll('.bar-container');
      expect(bars).toHaveLength(4);
    });
    
  });
  
  describe('Add Random Data Functionality', () => {
    
    it('should add a new data point when "Add Random Data" is clicked', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      const initialBars = container.querySelectorAll('.bar-container').length;
      fireEvent.click(addButton);
      const finalBars = container.querySelectorAll('.bar-container').length;
      
      expect(finalBars).toBe(initialBars + 1);
    });
    
    it('should add multiple data points on multiple clicks', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      
      const bars = container.querySelectorAll('.bar-container');
      expect(bars).toHaveLength(7); // 4 initial + 3 added
    });
    
  });
  
  describe('Remove Last Item Functionality', () => {
    
    it('should remove the last data point when "Remove Last Item" is clicked', () => {
      const { container } = render(<Dashboard />);
      const removeButton = screen.getByText('Remove Last Item');
      
      const initialBars = container.querySelectorAll('.bar-container').length;
      fireEvent.click(removeButton);
      const finalBars = container.querySelectorAll('.bar-container').length;
      
      expect(finalBars).toBe(initialBars - 1);
    });
    
    it('should not remove below 1 item', () => {
      const { container } = render(<Dashboard />);
      const removeButton = screen.getByText('Remove Last Item');
      
      // Remove 3 items (leaving 1)
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);
      
      expect(container.querySelectorAll('.bar-container')).toHaveLength(1);
      
      // Try to remove one more
      fireEvent.click(removeButton);
      
      // Should still have 1 item
      expect(container.querySelectorAll('.bar-container')).toHaveLength(1);
    });
    
  });
  
  describe('Sort by Value Functionality', () => {
    
    it('should sort data in descending order when "Sort by Value" is clicked', () => {
      const { container } = render(<Dashboard />);
      const sortButton = screen.getByText('Sort by Value');
      
      fireEvent.click(sortButton);
      
      const labels = container.querySelectorAll('.label');
      const values = Array.from(labels).map(label => {
        const match = label.textContent.match(/: (\d+)$/);
        return match ? parseInt(match[1]) : 0;
      });
      
      // Check that values are in descending order
      for (let i = 0; i < values.length - 1; i++) {
        expect(values[i]).toBeGreaterThanOrEqual(values[i + 1]);
      }
    });
    
    it('should maintain sort order after sorting', () => {
      render(<Dashboard />);
      const sortButton = screen.getByText('Sort by Value');
      
      fireEvent.click(sortButton);
      
      // Initial values are [65, 40, 80, 35], sorted should be [80, 65, 40, 35]
      expect(screen.getByText(/Category C: 80/)).toBeInTheDocument();
    });
    
  });
  
  describe('Interactive Hover Effects', () => {
    
    it('should show details panel on hover', async () => {
      const { container } = render(<Dashboard />);
      const firstBar = container.querySelector('.bar-container');
      
      fireEvent.mouseEnter(firstBar);
      
      await waitFor(() => {
        expect(screen.getByText(/Details: Category A/)).toBeInTheDocument();
      });
    });
    
    it('should hide details panel on mouse leave', async () => {
      const { container } = render(<Dashboard />);
      const firstBar = container.querySelector('.bar-container');
      
      fireEvent.mouseEnter(firstBar);
      await waitFor(() => {
        expect(screen.getByText(/Details: Category A/)).toBeInTheDocument();
      });
      
      fireEvent.mouseLeave(firstBar);
      
      await waitFor(() => {
        expect(screen.queryByText(/Details: Category A/)).not.toBeInTheDocument();
      });
    });
    
    it('should display correct value in details panel', async () => {
      const { container } = render(<Dashboard />);
      const firstBar = container.querySelector('.bar-container');
      
      fireEvent.mouseEnter(firstBar);
      
      await waitFor(() => {
        expect(screen.getByText(/Value: 65/)).toBeInTheDocument();
      });
    });
    
    it('should calculate correct percentage in details panel', async () => {
      const { container } = render(<Dashboard />);
      const firstBar = container.querySelector('.bar-container');
      
      fireEvent.mouseEnter(firstBar);
      
      await waitFor(() => {
        // Max value is 80, Category A is 65, so 65/80 = 81.25% ≈ 81%
        expect(screen.getByText(/Percentage of max: 81%/)).toBeInTheDocument();
      });
    });
    
  });
  
  describe('Bar Scaling', () => {
    
    it('should scale bars relative to maximum value', () => {
      const { container } = render(<Dashboard />);
      const bars = container.querySelectorAll('.bar');
      
      // Check that bars have width styles
      bars.forEach(bar => {
        const style = window.getComputedStyle(bar);
        expect(style.width).toBeTruthy();
      });
    });
    
    it('should set the highest value bar to 100% width', () => {
      const { container } = render(<Dashboard />);
      const bars = container.querySelectorAll('.bar');
      
      // Find the bar with the highest width percentage
      let maxWidth = 0;
      bars.forEach(bar => {
        const widthStr = bar.style.width;
        const width = parseFloat(widthStr);
        if (width > maxWidth) maxWidth = width;
      });
      
      expect(maxWidth).toBe(100);
    });
    
  });
  
  describe('Data Persistence', () => {
    
    it('should maintain data after multiple operations', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      const sortButton = screen.getByText('Sort by Value');
      
      // Add data
      fireEvent.click(addButton);
      const afterAddCount = container.querySelectorAll('.bar-container').length;
      expect(afterAddCount).toBe(5);
      
      // Sort data
      fireEvent.click(sortButton);
      const afterSortCount = container.querySelectorAll('.bar-container').length;
      expect(afterSortCount).toBe(5);
      
      // Data count should remain the same
      expect(afterSortCount).toBe(afterAddCount);
    });
    
    it('should preserve colors when sorting', () => {
      const { container } = render(<Dashboard />);
      const sortButton = screen.getByText('Sort by Value');
      
      // Get initial colors
      const initialBars = Array.from(container.querySelectorAll('.bar'));
      const initialColors = initialBars.map(bar => bar.style.backgroundColor);
      
      fireEvent.click(sortButton);
      
      // Get colors after sort
      const sortedBars = Array.from(container.querySelectorAll('.bar'));
      const sortedColors = sortedBars.map(bar => bar.style.backgroundColor);
      
      // All original colors should still exist (just in different order)
      initialColors.forEach(color => {
        expect(sortedColors).toContain(color);
      });
    });
    
  });
  
  describe('Edge Cases', () => {
    
    it('should handle rapid button clicks', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      // Rapidly click add button
      for (let i = 0; i < 10; i++) {
        fireEvent.click(addButton);
      }
      
      const bars = container.querySelectorAll('.bar-container');
      expect(bars).toHaveLength(14); // 4 initial + 10 added
    });
    
    it('should handle alternating add and remove', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      const removeButton = screen.getByText('Remove Last Item');
      
      fireEvent.click(addButton);
      fireEvent.click(removeButton);
      fireEvent.click(addButton);
      fireEvent.click(removeButton);
      
      const bars = container.querySelectorAll('.bar-container');
      expect(bars).toHaveLength(4); // Back to original count
    });
    
    it('should render without crashing with minimum data', () => {
      const { container } = render(<Dashboard />);
      const removeButton = screen.getByText('Remove Last Item');
      
      // Remove down to 1 item
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);
      
      expect(container.querySelectorAll('.bar-container')).toHaveLength(1);
      expect(screen.getByText('Interactive Dashboard')).toBeInTheDocument();
    });
    
  });
  
  describe('Accessibility', () => {
    
    it('should have accessible button elements', () => {
      render(<Dashboard />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });
    
    it('should render semantic HTML structure', () => {
      const { container } = render(<Dashboard />);
      
      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('.dashboard')).toBeInTheDocument();
      expect(container.querySelector('.controls')).toBeInTheDocument();
      expect(container.querySelector('.chart')).toBeInTheDocument();
    });
    
  });
  
});
