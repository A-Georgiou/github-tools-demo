/**
 * Tests for dashboard.jsx
 * 
 * Note: These tests use React Testing Library to test the Dashboard component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './dashboard.jsx';

// Mock useState for controlled testing
describe('Dashboard Component', () => {
  test('renders dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Interactive Dashboard')).toBeInTheDocument();
  });

  test('renders control buttons', () => {
    render(<Dashboard />);
    expect(screen.getByText('Add Random Data')).toBeInTheDocument();
    expect(screen.getByText('Remove Last Item')).toBeInTheDocument();
    expect(screen.getByText('Sort by Value')).toBeInTheDocument();
  });

  test('renders initial data categories', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Category A: 65/)).toBeInTheDocument();
    expect(screen.getByText(/Category B: 40/)).toBeInTheDocument();
    expect(screen.getByText(/Category C: 80/)).toBeInTheDocument();
    expect(screen.getByText(/Category D: 35/)).toBeInTheDocument();
  });

  test('displays 4 initial data items', () => {
    const { container } = render(<Dashboard />);
    const barContainers = container.querySelectorAll('.bar-container');
    expect(barContainers.length).toBe(4);
  });

  test('add button increases data items', () => {
    const { container } = render(<Dashboard />);
    const addButton = screen.getByText('Add Random Data');
    
    const initialBars = container.querySelectorAll('.bar-container').length;
    fireEvent.click(addButton);
    const newBars = container.querySelectorAll('.bar-container').length;
    
    expect(newBars).toBe(initialBars + 1);
  });

  test('remove button decreases data items', () => {
    const { container } = render(<Dashboard />);
    const removeButton = screen.getByText('Remove Last Item');
    
    const initialBars = container.querySelectorAll('.bar-container').length;
    fireEvent.click(removeButton);
    const newBars = container.querySelectorAll('.bar-container').length;
    
    expect(newBars).toBe(initialBars - 1);
  });

  test('remove button does not remove when only one item left', () => {
    const { container } = render(<Dashboard />);
    const removeButton = screen.getByText('Remove Last Item');
    
    // Remove until only 1 item left
    fireEvent.click(removeButton);
    fireEvent.click(removeButton);
    fireEvent.click(removeButton);
    
    expect(container.querySelectorAll('.bar-container').length).toBe(1);
    
    // Try to remove the last item
    fireEvent.click(removeButton);
    
    // Should still have 1 item
    expect(container.querySelectorAll('.bar-container').length).toBe(1);
  });

  test('sort button reorders data by value', () => {
    render(<Dashboard />);
    const sortButton = screen.getByText('Sort by Value');
    
    fireEvent.click(sortButton);
    
    // After sorting, Category C (80) should be first
    const labels = screen.getAllByText(/Category [A-D]: \d+/);
    expect(labels[0]).toHaveTextContent('Category C: 80');
  });

  test('hovering over bar shows details panel', () => {
    const { container } = render(<Dashboard />);
    const firstBar = container.querySelector('.bar-container');
    
    // Details panel should not be visible initially
    expect(screen.queryByText(/Details:/)).not.toBeInTheDocument();
    
    // Hover over the first bar
    fireEvent.mouseEnter(firstBar);
    
    // Details panel should now be visible
    expect(screen.getByText(/Details: Category A/)).toBeInTheDocument();
    expect(screen.getByText(/Value: 65/)).toBeInTheDocument();
  });

  test('mouse leave hides details panel', () => {
    const { container } = render(<Dashboard />);
    const firstBar = container.querySelector('.bar-container');
    
    // Hover over the bar
    fireEvent.mouseEnter(firstBar);
    expect(screen.getByText(/Details: Category A/)).toBeInTheDocument();
    
    // Mouse leave
    fireEvent.mouseLeave(firstBar);
    expect(screen.queryByText(/Details:/)).not.toBeInTheDocument();
  });

  test('details panel shows percentage of max value', () => {
    const { container } = render(<Dashboard />);
    const bars = container.querySelectorAll('.bar-container');
    
    // Find Category C (value 80, which is the max)
    const categoryC = Array.from(bars).find(bar => 
      bar.textContent.includes('Category C')
    );
    
    fireEvent.mouseEnter(categoryC);
    
    // Category C should show 100% since it's the maximum value
    expect(screen.getByText(/Percentage of max: 100%/)).toBeInTheDocument();
  });
});
