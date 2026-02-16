/**
 * Comprehensive tests for dashboard.jsx
 * 
 * This test suite covers:
 * - Component rendering with default data
 * - User interactions (buttons, hover effects)
 * - State management (adding/removing/sorting data)
 * - Dynamic content updates
 * - Edge cases and boundary conditions
 */

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './dashboard';

describe('Dashboard Component', () => {
  describe('Initial Rendering', () => {
    test('renders the dashboard title', () => {
      render(<Dashboard />);
      const heading = screen.getByText('Interactive Dashboard');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
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

    test('displays correct number of initial bars', () => {
      render(<Dashboard />);
      const barContainers = screen.getAllByText(/Category [A-Z]: \d+/);
      expect(barContainers).toHaveLength(4);
    });
  });

  describe('Add Random Data Functionality', () => {
    test('adds a new data point when Add button is clicked', () => {
      render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      const initialBars = screen.getAllByText(/Category [A-Z]: \d+/);
      const initialCount = initialBars.length;
      
      fireEvent.click(addButton);
      
      const newBars = screen.getAllByText(/Category [A-Z]: \d+/);
      expect(newBars).toHaveLength(initialCount + 1);
    });

    test('adds multiple data points sequentially', () => {
      render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      
      const bars = screen.getAllByText(/Category [A-Z]: \d+/);
      expect(bars).toHaveLength(7); // 4 initial + 3 added
    });

    test('new data point has valid category name', () => {
      render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      fireEvent.click(addButton);
      
      const bars = screen.getAllByText(/Category [A-Z]: \d+/);
      const lastBar = bars[bars.length - 1];
      
      // Should match pattern "Category X: N"
      expect(lastBar.textContent).toMatch(/Category [A-H]: \d+/);
    });
  });

  describe('Remove Last Item Functionality', () => {
    test('removes the last data point when Remove button is clicked', () => {
      render(<Dashboard />);
      const removeButton = screen.getByText('Remove Last Item');
      
      const initialBars = screen.getAllByText(/Category [A-Z]: \d+/);
      const initialCount = initialBars.length;
      
      fireEvent.click(removeButton);
      
      const newBars = screen.getAllByText(/Category [A-Z]: \d+/);
      expect(newBars).toHaveLength(initialCount - 1);
    });

    test('does not remove item when only one remains', () => {
      render(<Dashboard />);
      const removeButton = screen.getByText('Remove Last Item');
      
      // Remove until only 1 item remains
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);
      fireEvent.click(removeButton);
      
      expect(screen.getAllByText(/Category [A-Z]: \d+/)).toHaveLength(1);
      
      // Try to remove the last item
      fireEvent.click(removeButton);
      
      // Should still have 1 item
      expect(screen.getAllByText(/Category [A-Z]: \d+/)).toHaveLength(1);
    });

    test('removes correct item (last in array)', () => {
      render(<Dashboard />);
      const removeButton = screen.getByText('Remove Last Item');
      
      // Category D should be last initially
      expect(screen.getByText(/Category D: 35/)).toBeInTheDocument();
      
      fireEvent.click(removeButton);
      
      // Category D should be removed
      expect(screen.queryByText(/Category D: 35/)).not.toBeInTheDocument();
      expect(screen.getByText(/Category C: 80/)).toBeInTheDocument();
    });
  });

  describe('Sort by Value Functionality', () => {
    test('sorts data in descending order by value', () => {
      render(<Dashboard />);
      const sortButton = screen.getByText('Sort by Value');
      
      fireEvent.click(sortButton);
      
      const bars = screen.getAllByText(/Category [A-Z]: \d+/);
      
      // Extract values from the text content
      const values = bars.map(bar => {
        const match = bar.textContent.match(/: (\d+)/);
        return parseInt(match[1]);
      });
      
      // Verify values are in descending order
      for (let i = 0; i < values.length - 1; i++) {
        expect(values[i]).toBeGreaterThanOrEqual(values[i + 1]);
      }
    });

    test('highest value item appears first after sorting', () => {
      render(<Dashboard />);
      const sortButton = screen.getByText('Sort by Value');
      
      fireEvent.click(sortButton);
      
      const bars = screen.getAllByText(/Category [A-Z]: \d+/);
      const firstBar = bars[0];
      
      // Category C has value 80, which is the highest
      expect(firstBar.textContent).toContain('Category C: 80');
    });

    test('sorting works correctly after adding items', () => {
      render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      const sortButton = screen.getByText('Sort by Value');
      
      // Add some items
      fireEvent.click(addButton);
      fireEvent.click(addButton);
      
      // Sort
      fireEvent.click(sortButton);
      
      const bars = screen.getAllByText(/Category [A-Z]: \d+/);
      const values = bars.map(bar => {
        const match = bar.textContent.match(/: (\d+)/);
        return parseInt(match[1]);
      });
      
      // Verify sorted descending
      for (let i = 0; i < values.length - 1; i++) {
        expect(values[i]).toBeGreaterThanOrEqual(values[i + 1]);
      }
    });
  });

  describe('Hover Interactions', () => {
    test('does not show details panel initially', () => {
      render(<Dashboard />);
      expect(screen.queryByText(/Details:/)).not.toBeInTheDocument();
    });

    test('shows details panel on hover', () => {
      render(<Dashboard />);
      const bars = screen.getAllByText(/Category [A-Z]: \d+/);
      const firstBar = bars[0];
      
      fireEvent.mouseEnter(firstBar.closest('.bar-container'));
      
      expect(screen.getByText(/Details: Category/)).toBeInTheDocument();
    });

    test('hides details panel when mouse leaves', () => {
      render(<Dashboard />);
      const bars = screen.getAllByText(/Category [A-Z]: \d+/);
      const firstBar = bars[0];
      const container = firstBar.closest('.bar-container');
      
      fireEvent.mouseEnter(container);
      expect(screen.getByText(/Details: Category/)).toBeInTheDocument();
      
      fireEvent.mouseLeave(container);
      expect(screen.queryByText(/Details: Category/)).not.toBeInTheDocument();
    });

    test('details panel shows correct information', () => {
      render(<Dashboard />);
      const categoryABar = screen.getByText(/Category A: 65/);
      
      fireEvent.mouseEnter(categoryABar.closest('.bar-container'));
      
      expect(screen.getByText('Details: Category A')).toBeInTheDocument();
      expect(screen.getByText('Value: 65')).toBeInTheDocument();
    });

    test('details panel updates when hovering different items', () => {
      render(<Dashboard />);
      
      const categoryABar = screen.getByText(/Category A: 65/);
      fireEvent.mouseEnter(categoryABar.closest('.bar-container'));
      expect(screen.getByText('Details: Category A')).toBeInTheDocument();
      
      const categoryBBar = screen.getByText(/Category B: 40/);
      fireEvent.mouseEnter(categoryBBar.closest('.bar-container'));
      expect(screen.getByText('Details: Category B')).toBeInTheDocument();
      expect(screen.queryByText('Details: Category A')).not.toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    test('complete workflow: add, sort, remove, hover', () => {
      render(<Dashboard />);
      
      // Add a data point
      fireEvent.click(screen.getByText('Add Random Data'));
      expect(screen.getAllByText(/Category [A-Z]: \d+/)).toHaveLength(5);
      
      // Sort the data
      fireEvent.click(screen.getByText('Sort by Value'));
      const barsAfterSort = screen.getAllByText(/Category [A-Z]: \d+/);
      expect(barsAfterSort).toHaveLength(5);
      
      // Remove an item
      fireEvent.click(screen.getByText('Remove Last Item'));
      expect(screen.getAllByText(/Category [A-Z]: \d+/)).toHaveLength(4);
      
      // Hover to see details
      const firstBar = screen.getAllByText(/Category [A-Z]: \d+/)[0];
      fireEvent.mouseEnter(firstBar.closest('.bar-container'));
      expect(screen.getByText(/Details:/)).toBeInTheDocument();
    });

    test('percentage calculation in details panel is correct', () => {
      render(<Dashboard />);
      
      // Category C has value 80, which is the max in initial data
      const categoryCBar = screen.getByText(/Category C: 80/);
      fireEvent.mouseEnter(categoryCBar.closest('.bar-container'));
      
      expect(screen.getByText('Percentage of max: 100%')).toBeInTheDocument();
    });

    test('all operations maintain data integrity', () => {
      render(<Dashboard />);
      
      // Perform multiple operations
      fireEvent.click(screen.getByText('Add Random Data'));
      fireEvent.click(screen.getByText('Sort by Value'));
      fireEvent.click(screen.getByText('Remove Last Item'));
      fireEvent.click(screen.getByText('Add Random Data'));
      
      // Verify we still have valid bars
      const bars = screen.getAllByText(/Category [A-Z]: \d+/);
      expect(bars.length).toBeGreaterThan(0);
      
      // Each bar should have a valid format
      bars.forEach(bar => {
        expect(bar.textContent).toMatch(/Category [A-H]: \d+/);
      });
    });
  });

  describe('Edge Cases', () => {
    test('handles rapid button clicks', () => {
      render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      
      // Rapidly click 10 times
      for (let i = 0; i < 10; i++) {
        fireEvent.click(addButton);
      }
      
      const bars = screen.getAllByText(/Category [A-Z]: \d+/);
      expect(bars).toHaveLength(14); // 4 initial + 10 added
    });

    test('handles alternating add and remove operations', () => {
      render(<Dashboard />);
      const addButton = screen.getByText('Add Random Data');
      const removeButton = screen.getByText('Remove Last Item');
      
      fireEvent.click(addButton);
      fireEvent.click(removeButton);
      fireEvent.click(addButton);
      fireEvent.click(removeButton);
      
      // Should end up with the same count as initial
      expect(screen.getAllByText(/Category [A-Z]: \d+/)).toHaveLength(4);
    });

    test('sorting an already sorted list maintains order', () => {
      render(<Dashboard />);
      const sortButton = screen.getByText('Sort by Value');
      
      fireEvent.click(sortButton);
      const firstSort = screen.getAllByText(/Category [A-Z]: \d+/).map(b => b.textContent);
      
      fireEvent.click(sortButton);
      const secondSort = screen.getAllByText(/Category [A-Z]: \d+/).map(b => b.textContent);
      
      expect(firstSort).toEqual(secondSort);
    });
  });

  describe('Component Structure', () => {
    test('has correct CSS classes', () => {
      const { container } = render(<Dashboard />);
      expect(container.querySelector('.dashboard')).toBeInTheDocument();
      expect(container.querySelector('.controls')).toBeInTheDocument();
      expect(container.querySelector('.chart')).toBeInTheDocument();
    });

    test('buttons are clickable', () => {
      render(<Dashboard />);
      const buttons = screen.getAllByRole('button');
      
      expect(buttons).toHaveLength(3);
      buttons.forEach(button => {
        expect(button).toBeEnabled();
      });
    });
  });
});
