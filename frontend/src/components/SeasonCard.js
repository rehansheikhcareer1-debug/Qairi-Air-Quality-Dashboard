import React from 'react';

const SeasonCard = ({ weather, location }) => {
  const getSeason = () => {
    if (!weather) return { name: 'Spring', icon: '🌸', color: 'from-pink-400 to-green-400' };
    
    const temp = weather.temp;
    const condition = weather.condition;
    
    // Determine season based on temperature and condition
    if (temp < 10 || condition === 'Snow') {
      return {
        name: 'Winter',
        icon: '❄️',
        color: 'from-blue-400 to-cyan-300',
        bg: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=600&q=80',
        description: 'Cold & Crisp'
      };
    } else if (temp > 25 && condition === 'Clear') {
      return {
        name: 'Summer',
        icon: '☀️',
        color: 'from-orange-400 to-yellow-300',
        bg: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&q=80',
        description: 'Hot & Sunny'
      };
    } else if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') {
      return {
        name: 'Monsoon',
        icon: '🌧️',
        color: 'from-gray-600 to-blue-500',
        bg: 'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?w=600&q=80',
        description: 'Rainy & Fresh'
      };
    } else {
      return {
        name: 'Spring',
        icon: '🌸',
        color: 'from-green-400 to-emerald-300',
        bg: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
        description: 'Pleasant & Mild'
      };
    }
  };

  const season = getSeason();

  return (
    <div className="glass p-6 rounded-2xl relative overflow-hidden h-32">
      {/* Background image with blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${season.bg})`,
          filter: 'blur(2px)',
          opacity: 0.25
        }}
      />
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${season.color} opacity-20`} />
      
      {/* Animated particles based on season */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {season.name === 'Winter' && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-snowfall opacity-60"
                style={{
                  left: `${i * 12}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: '4s'
                }}
              />
            ))}
          </>
        )}
        
        {season.name === 'Monsoon' && (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-6 bg-blue-400 animate-fall opacity-50"
                style={{
                  left: `${i * 15}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </>
        )}
      </div>
      
      {/* Content - Horizontal Layout */}
      <div className="relative z-10 flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl animate-bounce-slow" style={{ animationDuration: '3s' }}>
            {season.icon}
          </div>
          
          <div>
            <h3 className={`text-2xl font-bold bg-gradient-to-r ${season.color} bg-clip-text text-transparent`}>
              {season.name}
            </h3>
            <p className="text-gray-300 text-sm">{season.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="glass px-6 py-3 rounded-full">
            <span className="text-white text-2xl font-bold">
              {Math.round(weather?.temp || 20)}°C
            </span>
          </div>
          
          {location && (
            <div className="text-gray-300 text-sm">
              📍 {location}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;
