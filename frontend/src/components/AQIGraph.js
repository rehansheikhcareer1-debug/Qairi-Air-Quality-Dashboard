import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

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

const AQIGraph = ({ historicalData, onViewDetails }) => {
  const [chartType, setChartType] = React.useState('line');
  const [timeRange, setTimeRange] = React.useState('7d');
  
  // sample data if no historical data
  const labels = historicalData?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = historicalData?.values || [85, 92, 78, 105, 98, 112, 95];

  const data = {
    labels,
    datasets: [
      {
        label: 'AQI',
        data: values,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: values.map(v => {
          if (v <= 50) return '#00e400';
          if (v <= 100) return '#ffff00';
          if (v <= 150) return '#ff7e00';
          if (v <= 200) return '#ff0000';
          if (v <= 300) return '#8f3f97';
          return '#7e0023';
        }),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9ca3af'
        }
      }
    }
  };

  const getAverageAQI = () => {
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
  };

  const getTrend = () => {
    const first = values[0];
    const last = values[values.length - 1];
    if (last > first) return { icon: '📈', text: 'Increasing', color: 'text-red-400' };
    if (last < first) return { icon: '📉', text: 'Decreasing', color: 'text-green-400' };
    return { icon: '➡️', text: 'Stable', color: 'text-blue-400' };
  };

  const trend = getTrend();

  return (
    <div className="glass p-6 rounded-2xl transition-all duration-300 group" 
         style={{
           border: '2px solid rgba(255, 255, 255, 0.2)',
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(59, 130, 246, 0.15)'
         }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📊</div>
            <div>
              <h3 className="text-white text-xl font-bold">AQI Trends</h3>
              <p className="text-gray-400 text-sm mt-1">Historical Air Quality Data</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="glass px-4 py-2 rounded-lg">
            <div className="text-gray-400 text-xs">Average AQI</div>
            <div className="text-white text-2xl font-bold">{getAverageAQI()}</div>
          </div>
          <div className={`flex items-center gap-2 ${trend.color} text-sm font-semibold`}>
            <span>{trend.icon}</span>
            <span>{trend.text}</span>
          </div>
        </div>
      </div>

      <div className="h-64 relative">
        <Line data={data} options={options} />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all pointer-events-none rounded-lg"></div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button 
          onClick={() => onViewDetails && onViewDetails('best')}
          className="glass p-3 rounded-lg text-center hover:scale-105 transition-all cursor-pointer hover:bg-green-500/10 border border-transparent hover:border-green-500/30"
        >
          <div className="text-green-400 text-2xl font-bold">{Math.min(...values)}</div>
          <div className="text-gray-400 text-xs mt-1">Best</div>
        </button>
        <button 
          onClick={() => onViewDetails && onViewDetails('average')}
          className="glass p-3 rounded-lg text-center hover:scale-105 transition-all cursor-pointer hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30"
        >
          <div className="text-blue-400 text-2xl font-bold">{getAverageAQI()}</div>
          <div className="text-gray-400 text-xs mt-1">Average</div>
        </button>
        <button 
          onClick={() => onViewDetails && onViewDetails('worst')}
          className="glass p-3 rounded-lg text-center hover:scale-105 transition-all cursor-pointer hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
        >
          <div className="text-red-400 text-2xl font-bold">{Math.max(...values)}</div>
          <div className="text-gray-400 text-xs mt-1">Worst</div>
        </button>
      </div>

      <div className="mt-4 text-center">
        <button 
          onClick={() => onViewDetails && onViewDetails('full')}
          className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-2 mx-auto hover:scale-110 transition-all px-4 py-2 rounded-lg hover:bg-blue-500/10"
        >
          <span>Click for detailed analysis</span>
          <span className="hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default AQIGraph;
