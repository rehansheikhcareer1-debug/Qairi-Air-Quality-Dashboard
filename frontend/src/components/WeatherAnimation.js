import React, { useEffect, useState } from 'react';

const WeatherAnimation = ({ condition }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticles = () => {
      const count = condition === 'Rain' ? 50 : condition === 'Snow' ? 30 : 0;
      const newParticles = [];
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 2 + Math.random() * 3
        });
      }
      setParticles(newParticles);
    };

    createParticles();
  }, [condition]);

  if (condition === 'Rain') {
    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        {particles.map(p => (
          <div
            key={p.id}
            className="rain"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}
      </div>
    );
  }

  if (condition === 'Snow') {
    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        {particles.map(p => (
          <div
            key={p.id}
            className="snow"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}
      </div>
    );
  }

  if (condition === 'Clouds' || condition === 'Mist' || condition === 'Haze') {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Multiple clouds moving across full screen */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${10 + i * 15}%`,
              animation: `moveCloudFullScreen ${20 + i * 5}s linear infinite`,
              animationDelay: `${i * -8}s`,
              left: '-15%'
            }}
          >
            <svg width="150" height="60" viewBox="0 0 150 60" className="opacity-25">
              <ellipse cx="35" cy="30" rx="30" ry="18" fill="#E2E8F0" />
              <ellipse cx="65" cy="25" rx="35" ry="22" fill="#CBD5E0" />
              <ellipse cx="95" cy="30" rx="30" ry="18" fill="#E2E8F0" />
              <ellipse cx="115" cy="32" rx="25" ry="16" fill="#F1F5F9" />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  if (condition === 'Clear') {
    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Subtle sun glow - much smaller and lighter */}
        <div className="absolute top-32 right-32 w-16 h-16 bg-yellow-300 rounded-full opacity-5 animate-pulse blur-xl"></div>
      </div>
    );
  }

  return null;
};

export default WeatherAnimation;
