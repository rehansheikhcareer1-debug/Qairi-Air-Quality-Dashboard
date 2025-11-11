import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Rankings = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    // sample ranking data
    const sampleData = [
      { rank: 1, city: 'Reykjavik', country: 'Iceland', aqi: 12, status: 'Good' },
      { rank: 2, city: 'Helsinki', country: 'Finland', aqi: 18, status: 'Good' },
      { rank: 3, city: 'Zurich', country: 'Switzerland', aqi: 22, status: 'Good' },
      { rank: 4, city: 'Stockholm', country: 'Sweden', aqi: 25, status: 'Good' },
      { rank: 5, city: 'Copenhagen', country: 'Denmark', aqi: 28, status: 'Good' },
      { rank: 6, city: 'Wellington', country: 'New Zealand', aqi: 32, status: 'Good' },
      { rank: 7, city: 'Oslo', country: 'Norway', aqi: 35, status: 'Good' },
      { rank: 8, city: 'Vancouver', country: 'Canada', aqi: 38, status: 'Good' },
      { rank: 9, city: 'Sydney', country: 'Australia', aqi: 42, status: 'Good' },
      { rank: 10, city: 'Tokyo', country: 'Japan', aqi: 48, status: 'Good' }
    ];
    setRankings(sampleData);
  }, []);

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-400';
    if (aqi <= 100) return 'text-yellow-400';
    if (aqi <= 150) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900"></div>
      </div>

      <div className="relative z-20">
        <Navbar />
        
        <div className="pt-24 px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="glass p-8 rounded-3xl">
              <h1 className="text-white text-3xl font-bold mb-2">City Rankings</h1>
              <p className="text-gray-400 mb-8">Top cities with best air quality worldwide</p>

              <div className="space-y-3">
                {rankings.map((item) => (
                  <div 
                    key={item.rank}
                    className="glass p-4 rounded-xl hover:scale-102 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        #{item.rank}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{item.city}</div>
                        <div className="text-gray-400 text-sm">{item.country}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getAQIColor(item.aqi)}`}>
                        {item.aqi}
                      </div>
                      <div className="text-gray-400 text-sm">{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rankings;
