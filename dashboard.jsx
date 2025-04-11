import React, { useState, useEffect } from 'react';

/**
 * Interactive Dashboard Component
 * 
 * A sample React component that demonstrates data visualization with
 * interactive controls and animations.
 */
const Dashboard = () => {
  // Sample data for the dashboard
  const [data, setData] = useState([
    { category: 'Category A', value: 65, color: '#3498db' },
    { category: 'Category B', value: 40, color: '#2ecc71' },
    { category: 'Category C', value: 80, color: '#e74c3c' },
    { category: 'Category D', value: 35, color: '#9b59b6' },
  ]);
  
  // State for currently selected item
  const [selected, setSelected] = useState(null);
  
  // Add a new random data point
  const addDataPoint = () => {
    const categories = ['Category E', 'Category F', 'Category G', 'Category H'];
    const colors = ['#f1c40f', '#e67e22', '#1abc9c', '#34495e'];
    
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomValue = Math.floor(Math.random() * 100);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setData([...data, { category: randomCategory, value: randomValue, color: randomColor }]);
  };
  
  // Remove the last data point
  const removeDataPoint = () => {
    if (data.length > 1) {
      setData(data.slice(0, -1));
    }
  };
  
  // Sort data by value
  const sortData = () => {
    setData([...data].sort((a, b) => b.value - a.value));
  };
  
  // Get maximum value for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="dashboard">
      <h1>Interactive Dashboard</h1>
      
      <div className="controls">
        <button onClick={addDataPoint}>Add Random Data</button>
        <button onClick={removeDataPoint}>Remove Last Item</button>
        <button onClick={sortData}>Sort by Value</button>
      </div>
      
      <div className="chart">
        {data.map((item, index) => (
          <div 
            key={index}
            className="bar-container"
            onMouseEnter={() => setSelected(index)}
            onMouseLeave={() => setSelected(null)}
          >
            <div 
              className="bar"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
                opacity: selected === index ? 1 : 0.7,
                transform: selected === index ? 'scaleY(1.1)' : 'scaleY(1)'
              }}
            />
            <div className="label">
              {item.category}: {item.value}
            </div>
          </div>
        ))}
      </div>
      
      {selected !== null && (
        <div className="details-panel">
          <h3>Details: {data[selected].category}</h3>
          <p>Value: {data[selected].value}</p>
          <p>Percentage of max: {Math.round((data[selected].value / maxValue) * 100)}%</p>
        </div>
      )}
      
      <style jsx>{`
        .dashboard {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .controls {
          margin-bottom: 20px;
        }
        
        button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 8px 12px;
          margin-right: 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        button:hover {
          background-color: #2980b9;
        }
        
        .chart {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
        }
        
        .bar-container {
          margin-bottom: 10px;
          cursor: pointer;
        }
        
        .bar {
          height: 30px;
          border-radius: 4px;
          transition: all 0.3s ease-in-out;
        }
        
        .label {
          margin-top: 5px;
          font-size: 14px;
        }
        
        .details-panel {
          margin-top: 20px;
          padding: 15px;
          background-color: #ecf0f1;
          border-radius: 8px;
          border-left: 5px solid #3498db;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;