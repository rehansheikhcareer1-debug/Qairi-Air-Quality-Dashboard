import React, { useState } from 'react';
import PollutantDetailModal from './PollutantDetailModal';

const PollutantsCard = ({ pollutants, location }) => {
  const [selectedPollutant, setSelectedPollutant] = useState(null);
  
  if (!pollutants) return null;

  const pollutantData = [
    { 
      name: 'Particulate Matter (PM2.5)', 
      key: 'pm2_5',
      value: pollutants.pm2_5, 
      unit: 'μg/m³',
      icon: '🌫️',
      color: 'from-orange-400 to-red-500'
    },
    { 
      name: 'Particulate Matter (PM10)', 
      key: 'pm10',
      value: pollutants.pm10, 
      unit: 'μg/m³',
      icon: '💨',
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      name: 'Carbon Monoxide (CO)', 
      key: 'co',
      value: pollutants.co, 
      unit: 'μg/m³',
      icon: '☁️',
      color: 'from-gray-400 to-gray-600'
    },
    { 
      name: 'Sulfur Dioxide (SO₂)', 
      key: 'so2',
      value: pollutants.so2, 
      unit: 'μg/m³',
      icon: '🏭',
      color: 'from-purple-400 to-pink-500'
    },
    { 
      name: 'Nitrogen Dioxide (NO₂)', 
      key: 'no2',
      value: pollutants.no2, 
      unit: 'μg/m³',
      icon: '🚗',
      color: 'from-yellow-400 to-orange-500'
    },
    { 
      name: 'Ozone (O₃)', 
      key: 'o3',
      value: pollutants.o3, 
      unit: 'μg/m³',
      icon: '☀️',
      color: 'from-green-400 to-teal-500'
    }
  ];

  return (
    <div className="glass p-6 rounded-2xl transition-all duration-300" 
         style={{
           border: '2px solid rgba(255, 255, 255, 0.2)',
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(168, 85, 247, 0.15)'
         }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-xl font-semibold flex items-center gap-2">
          <span className="text-2xl">🔬</span>
          Major Air Pollutants
        </h3>
        <span className="text-gray-400 text-sm">{location}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pollutantData.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedPollutant({ pollutant: item.key, value: item.value })}
            className="glass p-4 rounded-xl hover:scale-105 cursor-pointer border border-white/10 hover:border-blue-400/50 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`text-3xl bg-gradient-to-r ${item.color} p-2 rounded-lg`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="text-gray-400 text-xs">{item.name.split('(')[0]}</div>
                <div className="text-gray-300 text-sm font-semibold">({item.name.match(/\(([^)]+)\)/)?.[1]})</div>
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.value || 'N/A'}
                </div>
                <div className="text-gray-400 text-xs mt-1">{item.unit}</div>
              </div>
              <button className="text-blue-400 group-hover:text-blue-300 text-sm group-hover:translate-x-1 transition-transform">→</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 glass p-4 rounded-xl">
        <button className="w-full text-center text-blue-400 hover:text-blue-300 font-semibold">
          📱 Get AQI App
        </button>
      </div>

      {/* Pollutant Detail Modal */}
      {selectedPollutant && (
        <PollutantDetailModal
          pollutant={selectedPollutant.pollutant}
          value={selectedPollutant.value}
          onClose={() => setSelectedPollutant(null)}
        />
      )}
    </div>
  );
};

export default PollutantsCard;
