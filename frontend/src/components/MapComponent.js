import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// custom blinking marker
const blinkingIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div class="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>',
  iconSize: [16, 16],
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapComponent = ({ lat, lon, locationName }) => {
  const position = [lat || 28.6139, lon || 77.2090]; // default Delhi
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showClimateInfo, setShowClimateInfo] = useState(false);
  const [showNearMe, setShowNearMe] = useState(false);

  // Climate change data for the location
  const climateData = {
    currentTemp: '14°C',
    projectedTemp2030: '16°C',
    projectedTemp2050: '18°C',
    riskLevel: 'Moderate',
    impacts: [
      { icon: '🌡️', title: 'Temperature Rise', desc: '+2-4°C by 2050', severity: 'high' },
      { icon: '💧', title: 'Water Stress', desc: 'Increased drought periods', severity: 'medium' },
      { icon: '🌊', title: 'Extreme Weather', desc: 'More frequent storms', severity: 'high' },
      { icon: '🌾', title: 'Agriculture Impact', desc: 'Crop yield changes', severity: 'medium' }
    ]
  };

  // Near me data
  const nearMeData = [
    { icon: '🏥', name: 'Hospital', distance: '2.3 km', quality: 'Good' },
    { icon: '🏫', name: 'School', distance: '1.5 km', quality: 'Excellent' },
    { icon: '🏪', name: 'Market', distance: '0.8 km', quality: 'Good' },
    { icon: '🌳', name: 'Park', distance: '1.2 km', quality: 'Excellent' },
    { icon: '🚉', name: 'Metro Station', distance: '3.1 km', quality: 'Good' }
  ];

  return (
    <>
      <div className="glass p-5 rounded-2xl overflow-hidden border-2 border-white/10 hover:border-blue-400/30 transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            Location Map
          </h3>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/10 transition-all flex items-center gap-1"
          >
            <span>⛶</span> Fullscreen
          </button>
        </div>
        
        <div className="rounded-xl overflow-hidden h-80 border-2 border-white/10 shadow-xl">
          <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <ChangeView center={position} zoom={13} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={blinkingIcon}>
              <Popup>
                <div className="text-center">
                  <strong>{locationName || 'Selected Location'}</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    {lat?.toFixed(4)}, {lon?.toFixed(4)}
                  </span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button 
            onClick={() => setIsFullscreen(true)}
            className="glass px-4 py-3 rounded-xl text-white text-sm font-semibold hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all border border-white/10 hover:border-blue-400/50 flex flex-col items-center gap-1"
          >
            <span className="text-xl">📍</span>
            <span>Map</span>
          </button>
          <button 
            onClick={() => setShowClimateInfo(true)}
            className="glass px-4 py-3 rounded-xl text-white text-sm font-semibold hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all border border-white/10 hover:border-orange-400/50 flex flex-col items-center gap-1"
          >
            <span className="text-xl">🌡️</span>
            <span>Climate</span>
          </button>
          <button 
            onClick={() => setShowNearMe(true)}
            className="glass px-4 py-3 rounded-xl text-white text-sm font-semibold hover:bg-gradient-to-r hover:from-green-500/20 hover:to-blue-500/20 transition-all border border-white/10 hover:border-green-400/50 flex flex-col items-center gap-1"
          >
            <span className="text-xl">📍</span>
            <span>Near Me</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Map Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900/90 to-purple-900/90 border-b border-white/10">
              <h2 className="text-white text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                {locationName} - Full Map View
              </h2>
              <button 
                onClick={() => setIsFullscreen(false)}
                className="text-white hover:text-red-400 text-2xl px-4 py-2 hover:bg-red-500/10 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>
            <div className="flex-1">
              <MapContainer 
                center={position} 
                zoom={15} 
                style={{ height: '100%', width: '100%' }}
              >
                <ChangeView center={position} zoom={15} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={blinkingIcon}>
                  <Popup>
                    <div className="text-center">
                      <strong>{locationName || 'Selected Location'}</strong>
                      <br />
                      <span className="text-sm text-gray-600">
                        {lat?.toFixed(4)}, {lon?.toFixed(4)}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}

      {/* Climate Change Info Modal */}
      {showClimateInfo && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass max-w-3xl w-full rounded-2xl border-2 border-orange-500/30 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-2xl font-bold flex items-center gap-3">
                  <span className="text-4xl">🌡️</span>
                  Climate Change Impact - {locationName}
                </h2>
                <button 
                  onClick={() => setShowClimateInfo(false)}
                  className="text-white hover:text-red-400 text-2xl px-3 py-1 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Temperature Projections */}
              <div className="glass p-5 rounded-xl border border-white/10">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span>📊</span> Temperature Projections
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <div className="text-blue-400 text-sm mb-1">Current</div>
                    <div className="text-white text-3xl font-bold">{climateData.currentTemp}</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <div className="text-yellow-400 text-sm mb-1">2030</div>
                    <div className="text-white text-3xl font-bold">{climateData.projectedTemp2030}</div>
                  </div>
                  <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                    <div className="text-red-400 text-sm mb-1">2050</div>
                    <div className="text-white text-3xl font-bold">{climateData.projectedTemp2050}</div>
                  </div>
                </div>
              </div>

              {/* Risk Level */}
              <div className="glass p-5 rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-red-500/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Climate Risk Level</h3>
                    <p className="text-gray-400 text-sm">Based on current projections</p>
                  </div>
                  <div className="text-orange-400 text-4xl font-bold px-6 py-3 bg-orange-500/10 rounded-xl border-2 border-orange-500/30">
                    {climateData.riskLevel}
                  </div>
                </div>
              </div>

              {/* Climate Impacts */}
              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <span>⚠️</span> Expected Climate Impacts
                </h3>
                {climateData.impacts.map((impact, idx) => (
                  <div 
                    key={idx}
                    className={`glass p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                      impact.severity === 'high' 
                        ? 'border-red-500/30 hover:border-red-500/50 bg-red-500/5' 
                        : 'border-yellow-500/30 hover:border-yellow-500/50 bg-yellow-500/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{impact.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-base">{impact.title}</h4>
                        <p className="text-gray-400 text-sm mt-1">{impact.desc}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        impact.severity === 'high' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {impact.severity.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Near Me Modal */}
      {showNearMe && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass max-w-2xl w-full rounded-2xl border-2 border-green-500/30 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-2xl font-bold flex items-center gap-3">
                  <span className="text-4xl">📍</span>
                  Near Me - {locationName}
                </h2>
                <button 
                  onClick={() => setShowNearMe(false)}
                  className="text-white hover:text-red-400 text-2xl px-3 py-1 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
              <p className="text-gray-400 text-sm mb-4">Important places and facilities near your location</p>
              {nearMeData.map((place, idx) => (
                <div 
                  key={idx}
                  className="glass p-5 rounded-xl border border-white/10 hover:border-green-400/50 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{place.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg">{place.name}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-blue-400 text-sm flex items-center gap-1">
                          <span>📏</span> {place.distance}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          place.quality === 'Excellent' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {place.quality}
                        </span>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 text-2xl hover:scale-110 transition-all">
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapComponent;
