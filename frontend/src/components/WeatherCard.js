import React from 'react';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';
import WeatherLandscape from './WeatherLandscape';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const getWeatherBackground = () => {
    const condition = weather.condition;
    
    // Using Unsplash images for weather backgrounds
    const backgrounds = {
      'Clear': 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&q=80', // Clear sky with sun
      'Clouds': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80', // Dramatic clouds
      'Rain': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&q=80', // Rain on window
      'Drizzle': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&q=80', // Rain
      'Snow': 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80', // Snowy scene
      'Mist': 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&q=80', // Misty field
      'Haze': 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&q=80', // Hazy
      'Fog': 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=800&q=80', // Foggy
      'Thunderstorm': 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80' // Storm
    };
    
    return backgrounds[condition] || backgrounds['Clouds'];
  };

  return (
    <div className="glass p-6 rounded-2xl relative overflow-hidden min-h-[300px] transition-all duration-300 hover:scale-[1.02]" 
         style={{
           border: '2px solid rgba(255, 255, 255, 0.2)',
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(96, 165, 250, 0.15)'
         }}>
      {/* Weather background image with foggy effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getWeatherBackground()})`,
          filter: 'blur(3px)',
          opacity: 0.3
        }}
      />
      
      {/* Colorful gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10" />
      
      {/* Animated landscape background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-60">
        <WeatherLandscape condition={weather.condition} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <AnimatedWeatherIcon condition={weather.condition} temp={weather.temp} />
          
          <div className="text-right space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">💧 Humidity</span>
              <span className="text-white font-semibold">{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">💨 Wind Speed</span>
              <span className="text-white font-semibold">{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">☀️ UV Index</span>
              <span className="text-white font-semibold">{weather.uvIndex || 7}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
