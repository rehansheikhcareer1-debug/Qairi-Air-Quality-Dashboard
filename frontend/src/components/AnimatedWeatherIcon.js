import React from 'react';

const AnimatedWeatherIcon = ({ condition, temp }) => {
  const getWeatherGraphic = () => {
    switch (condition) {
      case 'Clear':
        return (
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <radialGradient id="sunGradIcon">
                  <stop offset="0%" stopColor="#FFFEF0" />
                  <stop offset="30%" stopColor="#FEF3C7" />
                  <stop offset="60%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </radialGradient>
              </defs>
              
              {/* Rotating sun rays - wavy style */}
              <g className="animate-spin-slow" style={{ transformOrigin: '50px 50px', animationDuration: '15s' }}>
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 50 + Math.cos(angle) * 22;
                  const y1 = 50 + Math.sin(angle) * 22;
                  const x2 = 50 + Math.cos(angle) * 40;
                  const y2 = 50 + Math.sin(angle) * 40;
                  
                  const midX = (x1 + x2) / 2 + Math.cos(angle + Math.PI/2) * 3;
                  const midY = (y1 + y2) / 2 + Math.sin(angle + Math.PI/2) * 3;
                  
                  return (
                    <path
                      key={i}
                      d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                      stroke="#F59E0B"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                  );
                })}
              </g>
              
              <circle cx="50" cy="50" r="20" fill="url(#sunGradIcon)" />
              <ellipse cx="45" cy="43" rx="7" ry="9" fill="#FFFFFF" opacity="0.6" />
              <ellipse cx="47" cy="45" rx="4" ry="5" fill="#FFFFFF" opacity="0.4" />
              <circle cx="50" cy="50" r="24" fill="#FCD34D" opacity="0.2" className="animate-pulse" style={{ animationDuration: '3s' }} />
            </svg>
          </div>
        );

      case 'Clouds':
        return (
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <g className="animate-drift" style={{ animationDuration: '4s' }}>
                <ellipse cx="35" cy="45" rx="18" ry="12" fill="#E2E8F0" opacity="0.9" />
                <ellipse cx="50" cy="40" rx="22" ry="15" fill="#CBD5E0" />
                <ellipse cx="65" cy="45" rx="18" ry="12" fill="#E2E8F0" opacity="0.9" />
              </g>
              <g className="animate-drift" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                <ellipse cx="30" cy="60" rx="15" ry="10" fill="#F1F5F9" opacity="0.8" />
                <ellipse cx="45" cy="58" rx="18" ry="12" fill="#E2E8F0" opacity="0.9" />
                <ellipse cx="60" cy="60" rx="15" ry="10" fill="#F1F5F9" opacity="0.8" />
              </g>
            </svg>
          </div>
        );

      case 'Rain':
        return (
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <ellipse cx="35" cy="35" rx="20" ry="13" fill="#64748B" opacity="0.9" />
              <ellipse cx="50" cy="32" rx="24" ry="16" fill="#475569" />
              <ellipse cx="65" cy="35" rx="20" ry="13" fill="#64748B" opacity="0.9" />
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1={25 + i * 7}
                  y1="50"
                  x2={22 + i * 7}
                  y2="70"
                  stroke="#60A5FA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.7"
                  className="animate-fall"
                  style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1s' }}
                />
              ))}
            </svg>
          </div>
        );

      case 'Snow':
        return (
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <ellipse cx="35" cy="35" rx="20" ry="13" fill="#E2E8F0" />
              <ellipse cx="50" cy="32" rx="24" ry="16" fill="#F1F5F9" />
              <ellipse cx="65" cy="35" rx="20" ry="13" fill="#E2E8F0" />
              {[...Array(6)].map((_, i) => (
                <g key={i} className="animate-snowfall" style={{ animationDelay: `${i * 0.3}s` }}>
                  <circle cx={30 + i * 8} cy="50" r="2" fill="#FFFFFF" />
                  <line x1={30 + i * 8} y1="48" x2={30 + i * 8} y2="52" stroke="#FFFFFF" strokeWidth="0.5" />
                  <line x1={28 + i * 8} y1="50" x2={32 + i * 8} y2="50" stroke="#FFFFFF" strokeWidth="0.5" />
                </g>
              ))}
            </svg>
          </div>
        );

      case 'Thunderstorm':
        return (
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <ellipse cx="35" cy="30" rx="22" ry="14" fill="#1E293B" opacity="0.95" />
              <ellipse cx="50" cy="28" rx="26" ry="17" fill="#0F172A" />
              <ellipse cx="65" cy="30" rx="22" ry="14" fill="#1E293B" opacity="0.95" />
              <path
                d="M 50 45 L 45 60 L 50 60 L 43 75"
                stroke="#FCD34D"
                strokeWidth="2.5"
                fill="none"
                className="animate-pulse"
                style={{ animationDuration: '0.5s' }}
              />
            </svg>
          </div>
        );

      default:
        return (
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <ellipse cx="40" cy="45" rx="20" ry="13" fill="#CBD5E0" opacity="0.8" />
              <ellipse cx="55" cy="42" rx="22" ry="15" fill="#E2E8F0" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {getWeatherGraphic()}
      
      {/* Enhanced Temperature Display */}
      <div className="mt-4 relative">
        <div className="text-white text-7xl font-bold tracking-tight relative">
          {Math.round(temp)}
          <span className="text-5xl align-top">°C</span>
          
          {/* Glow effect */}
          <div className="absolute inset-0 text-7xl font-bold text-blue-400 blur-xl opacity-30 animate-pulse">
            {Math.round(temp)}
          </div>
        </div>
      </div>
      
      {/* Enhanced Condition Display */}
      <div className="mt-3 glass px-6 py-2 rounded-full border border-white/20">
        <div className="text-white text-base font-semibold tracking-wide">{condition}</div>
      </div>
    </div>
  );
};

export default AnimatedWeatherIcon;
