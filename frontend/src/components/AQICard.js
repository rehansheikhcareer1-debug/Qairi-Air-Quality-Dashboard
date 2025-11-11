import React from 'react';
import AQICharacter from './AQICharacter';

const AQICard = ({ aqi, location, pollutants, weather }) => {
  
  const getWeatherBackground = () => {
    if (!weather) return null;
    
    const condition = weather.condition;
    
    if (condition === 'Clear') {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Mountain/Hill curves */}
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-20" viewBox="0 0 400 150" preserveAspectRatio="none">
            <path d="M 0 150 Q 100 80 200 100 T 400 120 L 400 150 Z" fill="url(#grad1)" />
            <path d="M 0 150 Q 80 100 160 110 T 320 130 L 400 150 Z" fill="url(#grad2)" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#F59E0B', stopOpacity: 0.1 }} />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FBBF24', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 0.05 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
    
    if (condition === 'Clouds') {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated clouds moving left to right */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${15 + i * 12}%`,
                animation: `moveCloud ${15 + i * 3}s linear infinite`,
                animationDelay: `${i * -5}s`,
                left: '-20%'
              }}
            >
              <svg width="120" height="50" viewBox="0 0 120 50" className="opacity-30">
                <ellipse cx="30" cy="25" rx="25" ry="15" fill="#E2E8F0" />
                <ellipse cx="55" cy="20" rx="30" ry="18" fill="#CBD5E0" />
                <ellipse cx="80" cy="25" rx="25" ry="15" fill="#E2E8F0" />
              </svg>
            </div>
          ))}
          
          {/* Hill curves */}
          <svg className="absolute bottom-0 left-0 w-full h-40 opacity-15" viewBox="0 0 400 120" preserveAspectRatio="none">
            <path d="M 0 120 Q 100 60 200 80 T 400 100 L 400 120 Z" fill="#94A3B8" />
          </svg>
        </div>
      );
    }
    
    if (condition === 'Rain') {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-400 animate-fall"
              style={{
                left: `${i * 5}%`,
                top: '-10%',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      );
    }
    
    if (condition === 'Snow') {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-snowfall"
              style={{
                left: `${i * 6}%`,
                top: '-5%',
                animationDelay: `${i * 0.3}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      );
    }
    
    return null;
  };
  const getAQILevel = (value) => {
    if (value <= 50) return { level: 'Good', color: 'from-green-400 to-green-600', bg: 'bg-green-500/20' };
    if (value <= 100) return { level: 'Moderate', color: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-500/20' };
    if (value <= 150) return { level: 'Unhealthy for Sensitive', color: 'from-orange-400 to-orange-600', bg: 'bg-orange-500/20' };
    if (value <= 200) return { level: 'Unhealthy', color: 'from-red-400 to-red-600', bg: 'bg-red-500/20' };
    if (value <= 300) return { level: 'Very Unhealthy', color: 'from-purple-400 to-purple-600', bg: 'bg-purple-500/20' };
    return { level: 'Hazardous', color: 'from-red-700 to-red-900', bg: 'bg-red-700/20' };
  };

  const aqiInfo = getAQILevel(aqi);

  return (
    <div className={`glass p-8 rounded-3xl ${aqiInfo.bg} relative overflow-hidden transition-all duration-300 hover:scale-[1.02]`} 
         style={{
           border: '2px solid rgba(255, 255, 255, 0.2)',
           boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px ${aqi <= 50 ? 'rgba(34, 197, 94, 0.2)' : aqi <= 100 ? 'rgba(234, 179, 8, 0.2)' : aqi <= 150 ? 'rgba(249, 115, 22, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
         }}>
      {getWeatherBackground()}
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm">Live AQI</span>
          </div>
          <h2 className="text-white text-2xl font-semibold">{location}</h2>
        </div>
        
        <div className="flex items-center gap-6">
          <AQICharacter aqi={aqi} />
          
          <div className="text-right">
            <div className={`text-6xl font-bold bg-gradient-to-r ${aqiInfo.color} bg-clip-text text-transparent`}>
              {aqi}
            </div>
            <div className="text-gray-300 text-sm mt-1">AQI-US</div>
          </div>
        </div>
      </div>

      <div className={`bg-gradient-to-r ${aqiInfo.color} px-4 py-2 rounded-lg inline-block mb-6 relative z-10`}>
        <span className="text-white font-semibold">Air Quality is {aqiInfo.level}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="glass p-4 rounded-xl">
          <div className="text-gray-400 text-sm mb-1">PM10</div>
          <div className="text-white text-2xl font-bold">{pollutants?.pm10 || 'N/A'}</div>
          <div className="text-gray-400 text-xs">μg/m³</div>
        </div>
        
        <div className="glass p-4 rounded-xl">
          <div className="text-gray-400 text-sm mb-1">PM2.5</div>
          <div className="text-white text-2xl font-bold">{pollutants?.pm2_5 || 'N/A'}</div>
          <div className="text-gray-400 text-xs">μg/m³</div>
        </div>
      </div>

      {/* AQI Scale */}
      <div className="mt-10 relative z-10">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Good</span>
          <span>Moderate</span>
          <span>Poor</span>
          <span>Unhealthy</span>
          <span>Severe</span>
          <span>Hazardous</span>
        </div>
        
        {/* Current AQI Indicator - Above scale */}
        <div className="relative mb-3">
          <div 
            className="absolute -top-2 transform -translate-x-1/2 flex flex-col items-center z-20 transition-all duration-500"
            style={{ left: `${Math.min((aqi / 301) * 100, 100)}%` }}
          >
            <div className={`px-3 py-1.5 rounded-lg text-white text-xs font-bold bg-gradient-to-r ${aqiInfo.color} shadow-xl whitespace-nowrap animate-bounce-slow`}>
              {aqiInfo.level}
            </div>
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent" 
                 style={{ borderTopColor: aqi <= 50 ? '#22c55e' : aqi <= 100 ? '#eab308' : aqi <= 150 ? '#f97316' : aqi <= 200 ? '#ef4444' : aqi <= 300 ? '#a855f7' : '#991b1b' }}>
            </div>
          </div>
        </div>
        
        <div className="h-2 rounded-full overflow-hidden flex relative">
          <div className="flex-1 bg-green-500"></div>
          <div className="flex-1 bg-yellow-500"></div>
          <div className="flex-1 bg-orange-500"></div>
          <div className="flex-1 bg-red-500"></div>
          <div className="flex-1 bg-purple-500"></div>
          <div className="flex-1 bg-red-900"></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>300</span>
          <span>301+</span>
        </div>
      </div>
    </div>
  );
};

export default AQICard;
