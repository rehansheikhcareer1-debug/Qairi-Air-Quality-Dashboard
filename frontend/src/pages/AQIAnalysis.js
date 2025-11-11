import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Navbar from '../components/Navbar';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AQIAnalysis = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Get view type from URL
  const searchParams = new URLSearchParams(window.location.search);
  const viewType = searchParams.get('view') || 'full';
  
  // Sample data
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [85, 92, 78, 105, 98, 112, 95]
  };

  const monthlyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [88, 95, 102, 98]
  };

  const currentData = timeRange === '7d' ? weeklyData : monthlyData;

  const lineChartData = {
    labels: currentData.labels,
    datasets: [{
      label: 'AQI Level',
      data: currentData.values,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 10,
      pointBackgroundColor: currentData.values.map(v => {
        if (v <= 50) return '#22c55e';
        if (v <= 100) return '#eab308';
        if (v <= 150) return '#f97316';
        return '#ef4444';
      }),
      pointBorderColor: '#fff',
      pointBorderWidth: 3,
    }]
  };

  const pollutantData = {
    labels: ['PM2.5', 'PM10', 'CO', 'NO2', 'SO2', 'O3'],
    datasets: [{
      label: 'Pollutant Levels',
      data: [45, 78, 32, 56, 23, 67],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(249, 115, 22)',
        'rgb(234, 179, 8)',
        'rgb(34, 197, 94)',
        'rgb(59, 130, 246)',
        'rgb(168, 85, 247)',
      ],
      borderWidth: 2,
    }]
  };

  const aqiDistribution = {
    labels: ['Good', 'Moderate', 'Unhealthy', 'Very Unhealthy'],
    datasets: [{
      data: [15, 35, 30, 20],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderColor: '#fff',
      borderWidth: 2,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#9ca3af' }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1920')] bg-cover bg-center opacity-20"></div>
      </div>

      <div className="relative z-20">
        <Navbar currentCountry="IN" />
        
        <div className="pt-32 px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {viewType === 'best' && '🌟 Best Air Quality Days'}
                  {viewType === 'average' && '📊 Average AQI Analysis'}
                  {viewType === 'worst' && '⚠️ Worst Air Quality Days'}
                  {viewType === 'full' && '📈 AQI Detailed Analysis'}
                </h1>
                <p className="text-gray-400">
                  {viewType === 'best' && 'Days with the cleanest air quality'}
                  {viewType === 'average' && 'Overall air quality trends and patterns'}
                  {viewType === 'worst' && 'Days requiring extra precautions'}
                  {viewType === 'full' && 'Comprehensive air quality insights and trends'}
                </p>
              </div>
              <Link 
                to="/"
                className="glass px-6 py-3 rounded-lg text-white hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <span>←</span> Back to Home
              </Link>
            </div>

            {/* View-specific highlight banner */}
            {viewType !== 'full' && (
              <div className={`glass p-6 rounded-xl mb-6 border-2 ${
                viewType === 'best' ? 'border-green-500/30 bg-green-500/5' :
                viewType === 'average' ? 'border-blue-500/30 bg-blue-500/5' :
                'border-red-500/30 bg-red-500/5'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="text-6xl">
                    {viewType === 'best' && '😊'}
                    {viewType === 'average' && '📊'}
                    {viewType === 'worst' && '😷'}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 ${
                      viewType === 'best' ? 'text-green-400' :
                      viewType === 'average' ? 'text-blue-400' :
                      'text-red-400'
                    }`}>
                      {viewType === 'best' && 'AQI: 78 - Good Air Quality'}
                      {viewType === 'average' && 'AQI: 95 - Moderate Quality'}
                      {viewType === 'worst' && 'AQI: 112 - Unhealthy for Sensitive Groups'}
                    </h3>
                    <p className="text-gray-300">
                      {viewType === 'best' && 'Perfect conditions for outdoor activities. Air quality is satisfactory with little to no health risk.'}
                      {viewType === 'average' && 'Acceptable air quality. Unusually sensitive people should consider limiting prolonged outdoor exertion.'}
                      {viewType === 'worst' && 'Members of sensitive groups may experience health effects. General public less likely to be affected.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Time Range Selector */}
            <div className="glass p-4 rounded-xl mb-6 flex items-center justify-between">
              <div className="flex gap-3">
                <button 
                  onClick={() => setTimeRange('7d')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    timeRange === '7d' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  7 Days
                </button>
                <button 
                  onClick={() => setTimeRange('30d')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    timeRange === '30d' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  30 Days
                </button>
              </div>
              <div className="text-gray-400 text-sm">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* AQI Trend Line Chart */}
              <div className="glass p-6 rounded-2xl" style={{ border: '2px solid rgba(255, 255, 255, 0.2)' }}>
                <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📈</span> AQI Trend Analysis
                </h3>
                <div className="h-80">
                  <Line data={lineChartData} options={chartOptions} />
                </div>
              </div>

              {/* Pollutant Breakdown */}
              <div className="glass p-6 rounded-2xl" style={{ border: '2px solid rgba(255, 255, 255, 0.2)' }}>
                <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                  <span>🔬</span> Pollutant Breakdown
                </h3>
                <div className="h-80">
                  <Bar data={pollutantData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Secondary Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* AQI Distribution */}
              <div className="glass p-6 rounded-2xl" style={{ border: '2px solid rgba(255, 255, 255, 0.2)' }}>
                <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                  <span>🥧</span> AQI Distribution
                </h3>
                <div className="h-64">
                  <Doughnut data={aqiDistribution} options={{ ...chartOptions, scales: undefined }} />
                </div>
              </div>

              {/* Statistics */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <div className="glass p-6 rounded-xl text-center">
                  <div className="text-4xl mb-2">🌟</div>
                  <div className="text-gray-400 text-sm mb-2">Best Day</div>
                  <div className="text-white text-2xl font-bold">Wednesday</div>
                  <div className="text-green-400 text-lg mt-1">AQI: 78</div>
                </div>
                
                <div className="glass p-6 rounded-xl text-center">
                  <div className="text-4xl mb-2">⚠️</div>
                  <div className="text-gray-400 text-sm mb-2">Worst Day</div>
                  <div className="text-white text-2xl font-bold">Saturday</div>
                  <div className="text-red-400 text-lg mt-1">AQI: 112</div>
                </div>
                
                <div className="glass p-6 rounded-xl text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-gray-400 text-sm mb-2">Average AQI</div>
                  <div className="text-white text-3xl font-bold">95</div>
                  <div className="text-yellow-400 text-sm mt-1">Moderate</div>
                </div>
                
                <div className="glass p-6 rounded-xl text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <div className="text-gray-400 text-sm mb-2">Trend</div>
                  <div className="text-white text-2xl font-bold">+12%</div>
                  <div className="text-red-400 text-sm mt-1">vs Last Week</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass p-6 rounded-2xl" style={{ border: '2px solid rgba(255, 255, 255, 0.2)' }}>
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <span>💡</span> Health Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass p-4 rounded-xl border border-green-500/30">
                  <div className="text-2xl mb-2">😷</div>
                  <h4 className="text-white font-semibold mb-2">Wear Mask</h4>
                  <p className="text-gray-400 text-sm">Recommended when AQI is above 100</p>
                </div>
                <div className="glass p-4 rounded-xl border border-blue-500/30">
                  <div className="text-2xl mb-2">🏠</div>
                  <h4 className="text-white font-semibold mb-2">Stay Indoors</h4>
                  <p className="text-gray-400 text-sm">Limit outdoor activities during peak hours</p>
                </div>
                <div className="glass p-4 rounded-xl border border-purple-500/30">
                  <div className="text-2xl mb-2">🌿</div>
                  <h4 className="text-white font-semibold mb-2">Air Purifier</h4>
                  <p className="text-gray-400 text-sm">Use indoor air purifiers for better quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQIAnalysis;
