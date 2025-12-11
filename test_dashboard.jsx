/**
 * Unit tests for the Dashboard React component
 * 
 * Tests cover:
 * - Component rendering
 * - Data manipulation functions
 * - User interactions
 * - State management
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './dashboard';

describe('Dashboard Component', () => {
  describe('Rendering', () => {
    test('renders dashboard title', () => {
      render(<Dashboard />);
      const title = screen.getByText('Interactive Dashboard');
      expect(title).toBeInTheDocument();
    });

    test('renders all control buttons', () => {
      render(<Dashboard />);
      expect(screen.getByText('Add Random Data')).toBeInTheDocument();
      expect(screen.getByText('Remove Last Item')).toBeInTheDocument();
      expect(screen.getByText('Sort by Value')).toBeInTheDocument();
    });

    test('renders initial data items', () => {
      render(<Dashboard />);
      expect(screen.getByText(/Category A: 65/)).toBeInTheDocument();
      expect(screen.getByText(/Category B: 40/)).toBeInTheDocument();
      expect(screen.getByText(/Category C: 80/)).toBeInTheDocument();
      expect(screen.getByText(/Category D: 35/)).toBeInTheDocument();
    });

    test('renders four initial data bars', () => {
      const { container } = render(<Dashboard />);
      const bars = container.querySelectorAll('.bar');
      expect(bars.length).toBe(4);
    });
  });

  describe('Add Random Data functionality', () => {
    test('adds new data point when button clicked', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      const initialBars = container.querySelectorAll('.bar').length;
      fireEvent.click(addButton);
      const newBars = container.querySelectorAll('.bar').length;
      
      expect(newBars).toBe(initialBars + 1);
    });

    test('can add multiple data points', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      
      const bars = container.querySelectorAll('.bar');
      expect(bars.length).toBe(7); // 4 initial + 3 added
    });
  });

  describe('Remove Last Item functionality', () => {
    test('removes last data point when button clicked', () => {
      const { container } = render(<Dashboard />);
      const removeButton = screen.getByText('Remove Last Item');
      
      const initialBars = container.querySelectorAll('.bar').length;
      fireEvent.click(removeButton);
      const newBars = container.querySelectorAll('.bar').length;
      
      expect(newBars).toBe(initialBars - 1);
    });

    test('does not remove when only one item remains', () => {
      const { container } = render(<Dashboard />);
      const removeButton = screen.getByText('Remove Last Item');
      
      // Remove down to 1 item
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);
      
      // Try to remove the last item
      fireEvent.click(removeButton);
      
      const bars = container.querySelectorAll('.bar');
      expect(bars.length).toBe(1);
    });

    test('can remove and add items in sequence', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      const removeButton = screen.getByText('Remove Last Item');
      
      fireEvent.click(addButton);
      fireEvent.click(removeButton);
      fireEvent.click(addButton);
      
      const bars = container.querySelectorAll('.bar');
      expect(bars.length).toBe(5); // 4 initial + 1 - 1 + 1
    });
  });

  describe('Sort by Value functionality', () => {
    test('sorts data by value in descending order', () => {
      render(<Dashboard />);
      const sortButton = screen.getByText('Sort by Value');
      
      fireEvent.click(sortButton);
      
      // After sorting, Category C (80) should be first
      const labels = screen.getAllByText(/Category [A-Z]: \d+/);
      expect(labels[0]).toHaveTextContent('Category C: 80');
    });

    test('maintains all data after sorting', () => {
      const { container } = render(<Dashboard />);
      const sortButton = screen.getByText('Sort by Value');
      
      const initialBars = container.querySelectorAll('.bar').length;
      fireEvent.click(sortButton);
      const newBars = container.querySelectorAll('.bar').length;
      
      expect(newBars).toBe(initialBars);
    });
  });

  describe('Mouse interactions', () => {
    test('shows details panel on hover', () => {
      const { container } = render(<Dashboard />);
      const barContainers = container.querySelectorAll('.bar-container');
      
      fireEvent.mouseEnter(barContainers[0]);
      
      const detailsPanel = container.querySelector('.details-panel');
      expect(detailsPanel).toBeInTheDocument();
    });

    test('hides details panel on mouse leave', () => {
      const { container } = render(<Dashboard />);
      const barContainers = container.querySelectorAll('.bar-container');
      
      fireEvent.mouseEnter(barContainers[0]);
      fireEvent.mouseLeave(barContainers[0]);
      
      const detailsPanel = container.querySelector('.details-panel');
      expect(detailsPanel).not.toBeInTheDocument();
    });

    test('details panel shows correct information', () => {
      const { container } = render(<Dashboard />);
      const barContainers = container.querySelectorAll('.bar-container');
      
      fireEvent.mouseEnter(barContainers[0]); // Category A: 65
      
      expect(screen.getByText(/Details: Category A/)).toBeInTheDocument();
      expect(screen.getByText(/Value: 65/)).toBeInTheDocument();
    });

    test('updates details panel when hovering different items', () => {
      const { container } = render(<Dashboard />);
      const barContainers = container.querySelectorAll('.bar-container');
      
      fireEvent.mouseEnter(barContainers[0]); // Category A
      expect(screen.getByText(/Details: Category A/)).toBeInTheDocument();
      
      fireEvent.mouseLeave(barContainers[0]);
      fireEvent.mouseEnter(barContainers[1]); // Category B
      expect(screen.getByText(/Details: Category B/)).toBeInTheDocument();
    });
  });

  describe('Data visualization', () => {
    test('bar widths are proportional to values', () => {
      const { container } = render(<Dashboard />);
      const bars = container.querySelectorAll('.bar');
      
      // Category C has value 80 (highest), should have 100% width
      // Category D has value 35 (lowest), should have less
      const widths = Array.from(bars).map(bar => bar.style.width);
      
      expect(widths[2]).toBe('100%'); // Category C (80) is max
      expect(widths).toContain('100%');
    });

    test('bars have correct colors', () => {
      const { container } = render(<Dashboard />);
      const bars = container.querySelectorAll('.bar');
      
      expect(bars[0].style.backgroundColor).toBe('rgb(52, 152, 219)'); // #3498db
      expect(bars[1].style.backgroundColor).toBe('rgb(46, 204, 113)'); // #2ecc71
      expect(bars[2].style.backgroundColor).toBe('rgb(231, 76, 60)');  // #e74c3c
      expect(bars[3].style.backgroundColor).toBe('rgb(155, 89, 182)'); // #9b59b6
    });
  });

  describe('Edge cases', () => {
    test('handles rapid button clicks', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      // Rapidly click add button
      for (let i = 0; i < 10; i++) {
        fireEvent.click(addButton);
      }
      
      const bars = container.querySelectorAll('.bar');
      expect(bars.length).toBe(14); // 4 initial + 10 added
    });

    test('handles alternating add and remove', () => {
      const { container } = render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      const removeButton = screen.getByText('Remove Last Item');
      
      fireEvent.click(addButton);
      fireEvent.click(removeButton);
      fireEvent.click(addButton);
      fireEvent.click(removeButton);
      
      const bars = container.querySelectorAll('.bar');
      expect(bars.length).toBe(4); // Back to original
    });

    test('percentage calculation shows correctly in details', () => {
      const { container } = render(<Dashboard />);
      const barContainers = container.querySelectorAll('.bar-container');
      
      fireEvent.mouseEnter(barContainers[2]); // Category C: 80 (max value)
      
      expect(screen.getByText(/Percentage of max: 100%/)).toBeInTheDocument();
    });
  });
});
