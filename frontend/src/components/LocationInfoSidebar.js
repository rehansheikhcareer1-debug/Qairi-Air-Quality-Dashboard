import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LocationInfoSidebar = ({ location, aqi, weather }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getAQIColor = (value) => {
    if (value <= 50) return 'text-green-400';
    if (value <= 100) return 'text-yellow-400';
    if (value <= 150) return 'text-orange-400';
    return 'text-red-400';
  };

  const locationInfo = {
    'Delhi': { famous: 'Capital of India, Red Fort, India Gate', timezone: 'IST' },
    'Mumbai': { famous: 'Financial capital, Gateway of India', timezone: 'IST' },
    'Bangalore': { famous: 'IT Hub, Garden City', timezone: 'IST' },
    'default': { famous: 'Beautiful location', timezone: 'Local Time' }
  };

  const info = locationInfo[location?.name] || locationInfo.default;

  return (
    <div className="glass p-6 rounded-2xl space-y-6 sticky top-24 transition-all duration-300" 
         style={{
           border: '2px solid rgba(255, 255, 255, 0.2)',
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(139, 92, 246, 0.15)'
         }}>
      {/* Live Clock - Super Enhanced */}
      <div className="text-center pb-6 border-b border-white/10 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-ping" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
          <div className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-ping" style={{ top: '60%', right: '15%', animationDelay: '1s' }}></div>
          <div className="absolute w-2 h-2 bg-pink-400/30 rounded-full animate-ping" style={{ top: '40%', left: '80%', animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10">
          {/* Header with live indicator */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2 glass px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
              <span className="text-green-400 text-xs font-bold tracking-wider">LIVE</span>
            </div>
            <div className="text-gray-400 text-xs font-semibold tracking-wide">LOCAL TIME</div>
          </div>
          
          {/* Analog Clock Visual */}
          <div className="relative w-40 h-40 mx-auto mb-4">
            {/* Clock face */}
            <div className="absolute inset-0 rounded-full border-4 border-white/30 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl shadow-2xl">
              {/* Hour markers with numbers */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const dotRadius = 42; // radius for dots (outer edge)
                const numRadius = 33; // radius for numbers
                const dotX = 50 + dotRadius * Math.cos(angle);
                const dotY = 50 + dotRadius * Math.sin(angle);
                const numX = 50 + numRadius * Math.cos(angle);
                const numY = 50 + numRadius * Math.sin(angle);
                const number = i === 0 ? 12 : i;
                
                return (
                  <React.Fragment key={i}>
                    {/* Dot marker */}
                    <div
                      className="absolute w-2 h-2 bg-white/50 rounded-full"
                      style={{
                        left: `${dotX}%`,
                        top: `${dotY}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    ></div>
                    {/* Number */}
                    <div
                      className="absolute text-white font-bold"
                      style={{
                        left: `${numX}%`,
                        top: `${numY}%`,
                        transform: 'translate(-50%, -50%)',
                        fontSize: '12px'
                      }}
                    >
                      {number}
                    </div>
                  </React.Fragment>
                );
              })}
              
              {/* Hour hand */}
              <div
                className="absolute left-1/2 top-1/2 origin-bottom"
                style={{
                  width: '6px',
                  height: '35%',
                  marginLeft: '-3px',
                  marginTop: '-35%',
                  transform: `rotate(${((currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5)}deg)`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-blue-500 to-blue-300 shadow-lg" style={{ borderRadius: '999px' }}></div>
              </div>
              
              {/* Minute hand */}
              <div
                className="absolute left-1/2 top-1/2 origin-bottom"
                style={{
                  width: '4px',
                  height: '45%',
                  marginLeft: '-2px',
                  marginTop: '-45%',
                  transform: `rotate(${currentTime.getMinutes() * 6}deg)`,
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-purple-500 to-purple-300 shadow-lg" style={{ borderRadius: '999px' }}></div>
              </div>
              
              {/* Second hand */}
              <div
                className="absolute left-1/2 top-1/2 origin-bottom"
                style={{
                  width: '2px',
                  height: '48%',
                  marginLeft: '-1px',
                  marginTop: '-48%',
                  transform: `rotate(${currentTime.getSeconds() * 6}deg)`,
                  transition: 'transform 0.1s linear'
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-red-500 to-pink-400 shadow-lg" style={{ borderRadius: '999px' }}></div>
              </div>
              
              {/* Clock center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg z-20 border-2 border-white/50"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl animate-pulse"></div>
            </div>
          </div>
          
          {/* Digital Time Display */}
          <div className="glass px-5 py-3 inline-block shadow-2xl relative z-30" style={{ borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.3)' }}>
            <div className="text-white text-3xl font-bold font-mono tracking-wider drop-shadow-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: true 
              })}
            </div>
          </div>
          
          {/* Date and timezone */}
          <div className="mt-4 space-y-1">
            <div className="text-white text-sm font-semibold">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-gray-400 text-xs font-semibold">{info.timezone}</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400 text-xs">Week {Math.ceil((currentTime.getDate()) / 7)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Name - Enhanced */}
      <div className="glass p-4 rounded-xl border-2 border-blue-500/30 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl animate-bounce-slow">📍</div>
            <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {location?.name || 'Select Location'}
            </h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{info.famous}</p>
        </div>
      </div>

      {/* AQI Quick View - Enhanced */}
      <div className="glass p-5 rounded-xl border-2 border-white/20 relative overflow-hidden">
        {/* Glow effect */}
        <div className={`absolute inset-0 ${getAQIColor(aqi)} opacity-5 blur-2xl`}></div>
        
        <div className="relative z-10">
          <div className="text-gray-400 text-xs mb-3 font-semibold tracking-wide">CURRENT AQI</div>
          <div className="flex items-end gap-3 mb-4">
            <div className={`text-6xl font-bold ${getAQIColor(aqi)} drop-shadow-lg`}>
              {aqi || '--'}
            </div>
            <div className="text-gray-400 text-sm mb-2">AQI-US</div>
          </div>
          
          {/* Enhanced progress bar */}
          <div className="relative">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-600 transition-all duration-1000 ease-out relative"
                style={{ width: `${Math.min((aqi / 300) * 100, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            {/* Scale markers */}
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>50</span>
              <span>100</span>
              <span>150</span>
              <span>200</span>
              <span>300+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Map Preview - Enhanced */}
      <div className="glass p-4 rounded-xl border-2 border-white/10 hover:border-blue-400/50 transition-all cursor-pointer group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-bold text-sm tracking-wide">LOCATION</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50 rounded-xl h-36 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
          {/* Animated radar circles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border-2 border-blue-400/50 rounded-full animate-ping"></div>
              <div className="w-24 h-24 border-2 border-purple-400/50 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-16 h-16 border-2 border-pink-400/50 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
          <div className="relative z-10 text-center">
            <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">🗺️</div>
            <div className="glass px-3 py-1 rounded-full inline-block">
              <div className="text-white text-xs font-mono">
                {location?.lat?.toFixed(2)}°, {location?.lon?.toFixed(2)}°
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Quick Info */}
      {weather && (
        <div className="glass p-4 rounded-xl border border-white/10">
          <div className="text-gray-400 text-sm mb-3">Weather</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-3xl font-bold">{Math.round(weather.temp)}°C</div>
              <div className="text-gray-400 text-xs mt-1">{weather.condition}</div>
            </div>
            <div className="text-5xl">
              {weather.condition === 'Clear' ? '☀️' : 
               weather.condition === 'Clouds' ? '☁️' : 
               weather.condition === 'Rain' ? '🌧️' : '🌤️'}
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="glass px-4 py-1 text-xs text-gray-400 rounded-full">Forecasts & Insights</span>
        </div>
      </div>

      {/* Air Quality Forecast - Next 3 Days */}
      <div className="glass p-5 rounded-xl border-2 border-blue-500/30 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📅</div>
            <div>
              <h4 className="text-white font-bold">3-Day Forecast</h4>
              <span className="text-xs text-gray-400">AQI Predictions</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { day: 'Tomorrow', date: 'Nov 12', aqi: 88, trend: '↓', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
              { day: 'Day 2', date: 'Nov 13', aqi: 75, trend: '↓', color: 'text-green-400', bg: 'bg-green-500/10' },
              { day: 'Day 3', date: 'Nov 14', aqi: 92, trend: '↑', color: 'text-yellow-400', bg: 'bg-yellow-500/10' }
            ].map((forecast, idx) => (
              <div key={idx} className={`flex items-center justify-between p-3 glass rounded-xl hover:scale-[1.02] transition-all cursor-pointer ${forecast.bg} border border-white/10`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{idx === 0 ? '🌅' : idx === 1 ? '🌤️' : '🌆'}</div>
                  <div>
                    <div className="text-white font-semibold text-sm">{forecast.day}</div>
                    <div className="text-gray-400 text-xs">{forecast.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`${forecast.color} font-bold text-2xl`}>{forecast.aqi}</div>
                  <div className={`${forecast.color} text-3xl animate-bounce-slow`}>{forecast.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Tips Based on AQI */}
      <div className="glass p-5 rounded-xl border-2 border-purple-500/30 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
              💊
            </div>
            <div>
              <h4 className="text-white font-bold">Health Recommendations</h4>
              <span className="text-xs text-purple-300">Based on current AQI</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {aqi <= 50 ? (
              <>
                <div className="flex items-start gap-3 p-3 glass rounded-lg border border-green-500/30 bg-green-500/5">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <div className="text-white font-semibold text-sm">Perfect for outdoor activities</div>
                    <div className="text-gray-400 text-xs mt-1">Air quality is excellent</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 glass rounded-lg border border-green-500/30 bg-green-500/5">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <div className="text-white font-semibold text-sm">Great time for exercise</div>
                    <div className="text-gray-400 text-xs mt-1">No health concerns</div>
                  </div>
                </div>
              </>
            ) : aqi <= 100 ? (
              <>
                <div className="flex items-start gap-3 p-3 glass rounded-lg border border-yellow-500/30 bg-yellow-500/5">
                  <span className="text-yellow-400 text-xl">!</span>
                  <div>
                    <div className="text-white font-semibold text-sm">Moderate air quality</div>
                    <div className="text-gray-400 text-xs mt-1">Sensitive groups should limit prolonged outdoor exertion</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 p-3 glass rounded-lg border border-red-500/30 bg-red-500/5">
                  <span className="text-red-400 text-xl">⚠</span>
                  <div>
                    <div className="text-white font-semibold text-sm">Wear N95 mask outdoors</div>
                    <div className="text-gray-400 text-xs mt-1">Essential protection required</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 glass rounded-lg border border-red-500/30 bg-red-500/5">
                  <span className="text-red-400 text-xl">⚠</span>
                  <div>
                    <div className="text-white font-semibold text-sm">Avoid outdoor exercise</div>
                    <div className="text-gray-400 text-xs mt-1">Stay indoors if possible</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="glass px-4 py-1 text-xs text-gray-400 rounded-full">Live Activity</span>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="glass p-5 rounded-xl border-2 border-green-500/30 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-xl shadow-lg animate-pulse">
                📡
              </div>
              <div>
                <h4 className="text-white font-bold">Live Updates</h4>
                <span className="text-xs text-green-300">Real-time monitoring</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              <span className="text-green-400 text-xs font-semibold">LIVE</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 glass rounded-lg hover:bg-white/5 transition-all border border-blue-500/20">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-lg">
                🔄
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Data Refreshed</div>
                <div className="text-gray-400 text-xs mt-1">Latest readings updated</div>
                <div className="text-blue-400 text-xs mt-1">2 minutes ago</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 glass rounded-lg hover:bg-white/5 transition-all border border-green-500/20">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-lg">
                📈
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">AQI Improved</div>
                <div className="text-gray-400 text-xs mt-1">Air quality getting better</div>
                <div className="text-green-400 text-xs mt-1">15 minutes ago</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 glass rounded-lg hover:bg-white/5 transition-all border border-purple-500/20">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-lg">
                🌤️
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Weather Update</div>
                <div className="text-gray-400 text-xs mt-1">Conditions changed</div>
                <div className="text-purple-400 text-xs mt-1">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="glass px-4 py-1 text-xs text-gray-400 rounded-full">Reference Guide</span>
        </div>
      </div>

      {/* Air Quality Index Scale Reference */}
      <div className="glass p-5 rounded-xl border-2 border-white/20 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📊</div>
            <div>
              <h4 className="text-white font-bold">AQI Scale Guide</h4>
              <span className="text-xs text-gray-400">Understanding air quality levels</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { range: '0-50', label: 'Good', color: 'bg-green-500', emoji: '😊', desc: 'Air quality is satisfactory' },
              { range: '51-100', label: 'Moderate', color: 'bg-yellow-500', emoji: '😐', desc: 'Acceptable for most people' },
              { range: '101-150', label: 'Unhealthy (SG)', color: 'bg-orange-500', emoji: '😷', desc: 'Sensitive groups affected' },
              { range: '151-200', label: 'Unhealthy', color: 'bg-red-500', emoji: '😨', desc: 'Everyone may experience effects' },
              { range: '201-300', label: 'Very Unhealthy', color: 'bg-purple-500', emoji: '🤢', desc: 'Health alert conditions' },
              { range: '301+', label: 'Hazardous', color: 'bg-red-900', emoji: '☠️', desc: 'Emergency conditions' }
            ].map((scale, idx) => (
              <div key={idx} className="glass p-3 rounded-lg hover:scale-[1.02] transition-all border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-16 h-3 ${scale.color} rounded-full shadow-lg`}></div>
                  <span className="text-gray-400 text-xs font-mono w-14">{scale.range}</span>
                  <span className="text-2xl">{scale.emoji}</span>
                </div>
                <div className="ml-1">
                  <div className="text-white font-semibold text-sm">{scale.label}</div>
                  <div className="text-gray-400 text-xs mt-1">{scale.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="glass px-4 py-1 text-xs text-gray-400 rounded-full">Quick Actions</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <button className="w-full glass px-5 py-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 flex items-center justify-between transition-all hover:scale-[1.02] border-2 border-white/10 hover:border-blue-400/50 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
              📱
            </div>
            <div className="text-left">
              <div className="font-semibold">Get Mobile App</div>
              <div className="text-xs text-gray-400">Download for iOS & Android</div>
            </div>
          </div>
          <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
        </button>
        
        <button 
          onClick={() => navigate('/set-alert', { state: { location, aqi } })}
          className="w-full glass px-5 py-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 flex items-center justify-between transition-all hover:scale-[1.02] border-2 border-white/10 hover:border-orange-400/50 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
              🔔
            </div>
            <div className="text-left">
              <div className="font-semibold">Set Alert</div>
              <div className="text-xs text-gray-400">Get notified on AQI changes</div>
            </div>
          </div>
          <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default LocationInfoSidebar;
