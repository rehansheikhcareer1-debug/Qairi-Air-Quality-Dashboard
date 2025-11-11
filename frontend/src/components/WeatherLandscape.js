import React from 'react';

const WeatherLandscape = ({ condition }) => {
  const getLandscape = () => {
    switch (condition) {
      case 'Clear':
        return (
          <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
            {/* Sky gradient */}
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
              </linearGradient>
              <radialGradient id="sunGlowLandscape">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#FEF3C7" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#FCD34D" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sunCoreLandscape">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FEF3C7" />
                <stop offset="70%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
              </radialGradient>
            </defs>
            <rect width="400" height="150" fill="url(#skyGrad)" />
            
            {/* Mountains */}
            <path d="M 0 120 Q 80 60 160 100 T 320 110 L 400 120 L 400 150 L 0 150 Z" fill="#94A3B8" opacity="0.3" />
            <path d="M 0 130 Q 100 80 200 110 T 400 125 L 400 150 L 0 150 Z" fill="#64748B" opacity="0.2" />
            
            {/* Enhanced Big Realistic Sun */}
            <g>
              {/* Multiple glow layers */}
              <circle cx="340" cy="100" r="80" fill="url(#sunGlowLandscape)" className="animate-pulse" style={{ animationDuration: '3s' }} opacity="0.4" />
              <circle cx="340" cy="100" r="60" fill="url(#sunGlowLandscape)" className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} opacity="0.6" />
              
              {/* Outer rotating rays (slow) */}
              <g className="animate-spin-slow" style={{ transformOrigin: '340px 100px', animationDuration: '30s' }}>
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 340 + Math.cos(angle) * 32;
                  const y1 = 100 + Math.sin(angle) * 32;
                  const x2 = 340 + Math.cos(angle) * 58;
                  const y2 = 100 + Math.sin(angle) * 58;
                  
                  // Create wavy ray
                  const midX = (x1 + x2) / 2 + Math.cos(angle + Math.PI/2) * 4;
                  const midY = (y1 + y2) / 2 + Math.sin(angle + Math.PI/2) * 4;
                  
                  return (
                    <path
                      key={i}
                      d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                      stroke="#FCD34D"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                  );
                })}
              </g>
              
              {/* Inner rotating rays (fast, opposite direction) */}
              <g className="animate-spin" style={{ transformOrigin: '340px 100px', animationDuration: '20s', animationDirection: 'reverse' }}>
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const x1 = 340 + Math.cos(angle) * 28;
                  const y1 = 100 + Math.sin(angle) * 28;
                  const x2 = 340 + Math.cos(angle) * 45;
                  const y2 = 100 + Math.sin(angle) * 45;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#FBBF24"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.6"
                    />
                  );
                })}
              </g>
              
              {/* Sun core with gradient */}
              <circle cx="340" cy="100" r="30" fill="url(#sunCoreLandscape)" />
              
              {/* Glossy highlights */}
              <ellipse cx="333" cy="93" rx="10" ry="12" fill="#FFFFFF" opacity="0.7" />
              <ellipse cx="336" cy="96" rx="6" ry="7" fill="#FFFFFF" opacity="0.5" />
              <circle cx="330" cy="90" r="3" fill="#FFFFFF" opacity="0.9" />
              
              {/* Subtle inner glow */}
              <circle cx="340" cy="100" r="25" fill="#FEF3C7" opacity="0.3" className="animate-pulse" style={{ animationDuration: '2s' }} />
            </g>
          </svg>
        );

      case 'Clouds':
        return (
          <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
            <rect width="400" height="150" fill="#E2E8F0" opacity="0.1" />
            
            {/* Animated clouds moving across */}
            {[...Array(3)].map((_, i) => (
              <g
                key={i}
                style={{
                  animation: `moveCloudAcross ${10 + i * 3}s linear infinite`,
                  animationDelay: `${i * -5}s`
                }}
              >
                <ellipse cx="50" cy={40 + i * 20} rx="40" ry="15" fill="#CBD5E0" opacity="0.4" />
                <ellipse cx="80" cy={35 + i * 20} rx="50" ry="20" fill="#E2E8F0" opacity="0.5" />
                <ellipse cx="110" cy={40 + i * 20} rx="40" ry="15" fill="#CBD5E0" opacity="0.4" />
              </g>
            ))}
            
            {/* Hills */}
            <path d="M 0 120 Q 100 90 200 110 T 400 120 L 400 150 L 0 150 Z" fill="#94A3B8" opacity="0.2" />
          </svg>
        );

      case 'Rain':
        return (
          <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
            <rect width="400" height="150" fill="#64748B" opacity="0.1" />
            
            {/* Rain drops */}
            {[...Array(30)].map((_, i) => (
              <line
                key={i}
                x1={i * 15}
                y1="0"
                x2={i * 15 - 5}
                y2="30"
                stroke="#60A5FA"
                strokeWidth="1.5"
                opacity="0.5"
                className="animate-fall"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
            
            {/* Tree in rain */}
            <g opacity="0.3">
              <rect x="50" y="100" width="15" height="50" fill="#8B4513" />
              <ellipse cx="57" cy="90" rx="30" ry="25" fill="#22C55E" />
            </g>
            
            {/* Wavy ground */}
            <path d="M 0 130 Q 50 120 100 130 T 200 130 T 300 130 T 400 130 L 400 150 L 0 150 Z" fill="#3B82F6" opacity="0.2" />
          </svg>
        );

      case 'Snow':
        return (
          <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
            <rect width="400" height="150" fill="#F1F5F9" opacity="0.2" />
            
            {/* Snowflakes */}
            {[...Array(20)].map((_, i) => (
              <g
                key={i}
                className="animate-snowfall"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '4s'
                }}
              >
                <circle cx={i * 20} cy="10" r="2" fill="#FFFFFF" opacity="0.8" />
                <line x1={i * 20} y1="8" x2={i * 20} y2="12" stroke="#FFFFFF" strokeWidth="0.5" />
                <line x1={i * 20 - 2} y1="10" x2={i * 20 + 2} y2="10" stroke="#FFFFFF" strokeWidth="0.5" />
              </g>
            ))}
            
            {/* Snowy tree */}
            <g opacity="0.4">
              <rect x="60" y="100" width="12" height="50" fill="#8B4513" />
              <ellipse cx="66" cy="90" rx="25" ry="20" fill="#10B981" />
              <ellipse cx="66" cy="85" rx="20" ry="15" fill="#FFFFFF" opacity="0.7" />
            </g>
            
            {/* Snowy waves */}
            <path d="M 0 130 Q 50 125 100 130 T 200 130 T 300 130 T 400 130 L 400 150 L 0 150 Z" fill="#E0F2FE" opacity="0.4" />
            <path d="M 0 140 Q 60 135 120 140 T 240 140 T 360 140 T 400 140 L 400 150 L 0 150 Z" fill="#FFFFFF" opacity="0.3" />
          </svg>
        );

      case 'Mist':
      case 'Haze':
        return (
          <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
            <rect width="400" height="150" fill="#94A3B8" opacity="0.1" />
            
            {/* Wind turbines */}
            {[80, 200, 320].map((x, i) => (
              <g key={i} opacity="0.4">
                {/* Tower */}
                <rect x={x - 3} y="80" width="6" height="70" fill="#64748B" />
                {/* Rotating blades */}
                <g
                  className="animate-spin"
                  style={{
                    transformOrigin: `${x}px 80px`,
                    animationDuration: `${2 + i * 0.5}s`
                  }}
                >
                  <rect x={x - 2} y="50" width="4" height="30" rx="2" fill="#475569" />
                  <rect x={x - 15} y="78" width="30" height="4" rx="2" fill="#475569" />
                  <rect x={x - 2} y="80" width="4" height="30" rx="2" fill="#475569" />
                </g>
              </g>
            ))}
            
            {/* Misty waves */}
            <path d="M 0 120 Q 100 110 200 120 T 400 120 L 400 150 L 0 150 Z" fill="#CBD5E0" opacity="0.2" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
            <path d="M 0 120 Q 100 90 200 110 T 400 120 L 400 150 L 0 150 Z" fill="#94A3B8" opacity="0.2" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-32 overflow-hidden">
      {getLandscape()}
    </div>
  );
};

export default WeatherLandscape;
