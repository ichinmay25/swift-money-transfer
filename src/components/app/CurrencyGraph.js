import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function CurrencyGraph({ data, currentValue, onHover }) {
  // Create gradient for the line
  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#8755ca'); // surface-primary-01
    gradient.addColorStop(1, '#4c74d5'); // surface-primary-02
    return gradient;
  };

  // Sample data for demonstration - replace with real data
  const chartData = {
    labels: data?.labels || [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'USD to INR',
        data: data?.values || [
          85.5, 85.2, 85.8, 85.1, 84.9, 84.6, 
          84.8, 84.3, 84.1, 83.8, 83.5, 83.2
        ],
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return '#8755ca'; // Fallback color
          }
          return createGradient(ctx);
        },
        backgroundColor: 'transparent', // No background fill
        borderWidth: 3,
        fill: false,
        tension: 0.4, // Smooth curves
        pointRadius: 0, // Hide default points
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#3B82F6', // Blue for current point
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1, // Square aspect ratio
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips for cleaner look
      }
    },
    scales: {
      x: {
        display: false, // Hide x-axis
        grid: {
          display: false,
        },
      },
      y: {
        display: false, // Hide y-axis
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    onHover: (event, activeElements, chart) => {
      if (activeElements.length > 0 && onHover) {
        const dataIndex = activeElements[0].index;
        const value = data?.values?.[dataIndex];
        const label = data?.labels?.[dataIndex];
        onHover(value, label, dataIndex);
      }
      // Don't reset here - let the mouse leave event handle it
    },
    elements: {
      point: {
        radius: 0, // Hide all points by default
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  return (
    <div 
      className="currency-graph"
      onMouseLeave={() => {
        if (onHover) {
          onHover(null, null, null);
        }
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
}

export default CurrencyGraph;
