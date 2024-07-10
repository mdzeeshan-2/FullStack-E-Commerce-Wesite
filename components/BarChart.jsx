'use client';
import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

const BarChart = ({ data }) => {
  const chartContainer = useRef(null); // Reference to the chart canvas
  const chartInstance = useRef(null); // Reference to the chart instance

  useEffect(() => {
    if (chartInstance.current !== null) {
      // Destroy the previous chart instance
      chartInstance.current.destroy();
    }

    if (chartContainer.current) {
      // Initialize the chart
      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar', // Set chart type to 'pie'
        data: data,
      });
    }

    return () => {
      // Cleanup: Ensure chart instance is destroyed when component unmounts
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [data]); // Re-render the chart when data changes

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="uppercase">Sales Based on {data.datasets[0].label}</h2>
      <canvas ref={chartContainer} width="400" height="400" />
    </div>
  );
};

export default BarChart;
