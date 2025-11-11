import React from 'react';

const WeatherIllustration = ({ condition }) => {
  const getIllustration = () => {
    switch (condition) {
      case 'Clear':
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full">
            {/* Sun */}
            <circle cx="30" cy="25" r="12" fill="#FFD700" className="animate-pulse" />
            <g className="animate-spin-slow" style={{ transformOrigin: '30px 25px' }}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <line
                  key={i}
                  x1="30"
                  y1="25"
                  x2={30 + Math.cos((angle * Math.PI) / 180) * 18}
                  y2={25 + Math.sin((angle * Math.PI) / 180) * 18}
                  stroke="#FFD700"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
            </g>
            {/* Mountains */}
            <path d="M 0 70 L 30 40 L 50 60 L 70 35 L 90 55 L 120 45 L 120 80 L 0 80 Z" fill="#4A5568" opacity="0.6" />
            <path d="M 10 80 L 40 50 L 60 65 L 80 45 L 110 60 L 120 55 L 120 80 Z" fill="#2D3748" opacity="0.4" />
          </svg>
        );

      case 'Clouds':
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full">
            {/* Moving clouds */}
            <g className="animate-drift">
              <ellipse cx="30" cy="25" rx="15" ry="10" fill="#E2E8F0" opacity="0.8" />
              <ellipse cx="45" cy="25" rx="18" ry="12" fill="#CBD5E0" opacity="0.9" />
              <ellipse cx="38" cy="20" rx="12" ry="8" fill="#F7FAFC" opacity="0.7" />
            </g>
            <g className="animate-drift" style={{ animationDelay: '2s', animationDuration: '8s' }}>
              <ellipse cx="70" cy="40" rx="20" ry="13" fill="#E2E8F0" opacity="0.7" />
              <ellipse cx="85" cy="38" rx="15" ry="10" fill="#CBD5E0" opacity="0.8" />
            </g>
            {/* Mountains */}
            <path d="M 0 70 L 30 45 L 50 60 L 70 40 L 90 55 L 120 50 L 120 80 L 0 80 Z" fill="#4A5568" opacity="0.5" />
          </svg>
        );

      case 'Rain':
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full">
            {/* Dark clouds */}
            <ellipse cx="35" cy="20" rx="20" ry="12" fill="#718096" opacity="0.9" />
            <ellipse cx="50" cy="18" rx="22" ry="14" fill="#4A5568" opacity="0.95" />
            <ellipse cx="65" cy="20" rx="18" ry="11" fill="#718096" opacity="0.9" />
            {/* Rain drops */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1={15 + i * 8}
                y1="35"
                x2={12 + i * 8}
                y2="50"
                stroke="#4299E1"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
                className="animate-fall"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
            {/* Ground */}
            <rect x="0" y="75" width="120" height="5" fill="#2D3748" opacity="0.3" />
          </svg>
        );

      case 'Snow':
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full">
            {/* Clouds */}
            <ellipse cx="40" cy="20" rx="22" ry="13" fill="#E2E8F0" opacity="0.95" />
            <ellipse cx="60" cy="18" rx="25" ry="15" fill="#F7FAFC" opacity="0.9" />
            {/* Snowflakes */}
            {[...Array(15)].map((_, i) => (
              <g key={i} className="animate-snowfall" style={{ animationDelay: `${i * 0.3}s` }}>
                <circle cx={10 + i * 7} cy="30" r="2" fill="#FFFFFF" opacity="0.9" />
                <line x1={10 + i * 7} y1="28" x2={10 + i * 7} y2="32" stroke="#FFFFFF" strokeWidth="0.5" />
                <line x1={8 + i * 7} y1="30" x2={12 + i * 7} y2="30" stroke="#FFFFFF" strokeWidth="0.5" />
              </g>
            ))}
            {/* Snowy ground */}
            <path d="M 0 70 L 120 70 L 120 80 L 0 80 Z" fill="#F7FAFC" opacity="0.8" />
          </svg>
        );

      case 'Thunderstorm':
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full">
            {/* Dark storm clouds */}
            <ellipse cx="40" cy="18" rx="25" ry="14" fill="#2D3748" opacity="0.95" />
            <ellipse cx="60" cy="16" rx="28" ry="16" fill="#1A202C" opacity="0.98" />
            {/* Lightning */}
            <path d="M 55 30 L 50 45 L 55 45 L 48 60" stroke="#FCD34D" strokeWidth="3" fill="none" className="animate-pulse" />
            {/* Rain */}
            {[...Array(10)].map((_, i) => (
              <line
                key={i}
                x1={20 + i * 9}
                y1="35"
                x2={17 + i * 9}
                y2="50"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
                className="animate-fall"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 120 80" className="w-full h-full">
            <ellipse cx="40" cy="30" rx="20" ry="12" fill="#CBD5E0" opacity="0.7" />
            <ellipse cx="60" cy="28" rx="22" ry="14" fill="#E2E8F0" opacity="0.8" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-32">
      {getIllustration()}
    </div>
  );
};

export default WeatherIllustration;
