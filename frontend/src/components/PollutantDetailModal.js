import React from 'react';
import ReactDOM from 'react-dom';

const PollutantDetailModal = ({ pollutant, value, onClose }) => {
  if (!pollutant) return null;

  const pollutantInfo = {
    pm2_5: {
      name: 'PM2.5',
      fullName: 'Particulate Matter 2.5',
      icon: '🌫️',
      color: 'from-orange-400 to-red-500',
      description: 'Fine particles with diameter less than 2.5 micrometers',
      sources: ['Vehicle emissions', 'Industrial processes', 'Burning of fossil fuels', 'Wildfires'],
      healthEffects: [
        'Respiratory problems',
        'Cardiovascular diseases',
        'Reduced lung function',
        'Premature death in people with heart or lung disease'
      ],
      safeLevel: '0-12 μg/m³',
      dangerLevel: 'Above 35.5 μg/m³',
      prevention: [
        'Use air purifiers indoors',
        'Wear N95 masks outdoors',
        'Avoid outdoor activities during high pollution',
        'Keep windows closed on polluted days'
      ]
    },
    pm10: {
      name: 'PM10',
      fullName: 'Particulate Matter 10',
      icon: '💨',
      color: 'from-blue-400 to-cyan-500',
      description: 'Coarse particles with diameter less than 10 micrometers',
      sources: ['Dust from roads', 'Construction sites', 'Agriculture', 'Industrial activities'],
      healthEffects: [
        'Irritation of airways',
        'Coughing and difficulty breathing',
        'Aggravated asthma',
        'Decreased lung function'
      ],
      safeLevel: '0-54 μg/m³',
      dangerLevel: 'Above 154 μg/m³',
      prevention: [
        'Reduce outdoor activities on dusty days',
        'Use protective masks',
        'Keep indoor spaces clean',
        'Use HEPA filters'
      ]
    },
    co: {
      name: 'CO',
      fullName: 'Carbon Monoxide',
      icon: '☁️',
      color: 'from-gray-400 to-gray-600',
      description: 'Colorless, odorless gas produced by incomplete combustion',
      sources: ['Vehicle exhaust', 'Industrial processes', 'Residential heating', 'Cigarette smoke'],
      healthEffects: [
        'Reduces oxygen delivery to organs',
        'Headaches and dizziness',
        'Confusion and nausea',
        'Fatal at high concentrations'
      ],
      safeLevel: '0-4.4 ppm',
      dangerLevel: 'Above 12.5 ppm',
      prevention: [
        'Ensure proper ventilation',
        'Install CO detectors',
        'Regular vehicle maintenance',
        'Avoid idling vehicles in enclosed spaces'
      ]
    },
    so2: {
      name: 'SO₂',
      fullName: 'Sulfur Dioxide',
      icon: '🏭',
      color: 'from-purple-400 to-pink-500',
      description: 'Pungent gas produced by burning sulfur-containing fuels',
      sources: ['Coal-fired power plants', 'Industrial facilities', 'Diesel engines', 'Volcanic eruptions'],
      healthEffects: [
        'Respiratory problems',
        'Aggravated asthma',
        'Eye irritation',
        'Cardiovascular effects'
      ],
      safeLevel: '0-35 ppb',
      dangerLevel: 'Above 185 ppb',
      prevention: [
        'Stay indoors during high levels',
        'Use air conditioning with filters',
        'Avoid strenuous outdoor activities',
        'Support clean energy initiatives'
      ]
    },
    no2: {
      name: 'NO₂',
      fullName: 'Nitrogen Dioxide',
      icon: '🚗',
      color: 'from-yellow-400 to-orange-500',
      description: 'Reddish-brown gas with a sharp odor',
      sources: ['Vehicle emissions', 'Power plants', 'Industrial boilers', 'Gas stoves'],
      healthEffects: [
        'Respiratory infections',
        'Reduced lung function',
        'Increased asthma symptoms',
        'Inflammation of airways'
      ],
      safeLevel: '0-53 ppb',
      dangerLevel: 'Above 360 ppb',
      prevention: [
        'Reduce vehicle use',
        'Improve indoor ventilation',
        'Use electric appliances',
        'Support public transportation'
      ]
    },
    o3: {
      name: 'O₃',
      fullName: 'Ozone',
      icon: '☀️',
      color: 'from-green-400 to-teal-500',
      description: 'Ground-level ozone formed by chemical reactions',
      sources: ['Vehicle emissions + sunlight', 'Industrial emissions', 'Chemical solvents', 'Natural sources'],
      healthEffects: [
        'Chest pain and coughing',
        'Throat irritation',
        'Worsened asthma',
        'Reduced lung capacity'
      ],
      safeLevel: '0-54 ppb',
      dangerLevel: 'Above 125 ppb',
      prevention: [
        'Limit outdoor activities in afternoon',
        'Stay indoors on high ozone days',
        'Reduce vehicle use',
        'Avoid using gas-powered equipment'
      ]
    }
  };

  const info = pollutantInfo[pollutant];
  if (!info) return null;

  const getValueColor = (val) => {
    if (val < 50) return 'text-green-400';
    if (val < 100) return 'text-yellow-400';
    if (val < 150) return 'text-orange-400';
    return 'text-red-400';
  };

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center p-4 animate-fadeIn" style={{ zIndex: 99999 }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        style={{ zIndex: 99998 }}
      ></div>

      {/* Modal */}
      <div className="relative glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp border-2 border-white/20 shadow-2xl" style={{ zIndex: 99999 }}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${info.color} p-6 rounded-t-3xl relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl animate-bounce-slow">{info.icon}</div>
              <div>
                <h2 className="text-white text-3xl font-bold">{info.name}</h2>
                <p className="text-white/90 text-sm">{info.fullName}</p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            >
              ✕
            </button>
          </div>

          {/* Current Value */}
          <div className="mt-4 glass px-6 py-3 rounded-xl inline-block">
            <span className="text-white/80 text-sm">Current Level: </span>
            <span className={`text-2xl font-bold ${getValueColor(value)}`}>{value}</span>
            <span className="text-white/80 text-sm ml-1">μg/m³</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div className="glass p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span>📋</span> What is it?
            </h3>
            <p className="text-gray-300 text-sm">{info.description}</p>
          </div>

          {/* Sources */}
          <div className="glass p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🏭</span> Main Sources
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {info.sources.map((source, idx) => (
                <div key={idx} className="bg-white/5 px-3 py-2 rounded-lg text-gray-300 text-sm flex items-center gap-2">
                  <span className="text-blue-400">•</span>
                  {source}
                </div>
              ))}
            </div>
          </div>

          {/* Health Effects */}
          <div className="glass p-4 rounded-xl border-2 border-red-500/30">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>⚠️</span> Health Effects
            </h3>
            <div className="space-y-2">
              {info.healthEffects.map((effect, idx) => (
                <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-red-400 mt-1">▸</span>
                  <span>{effect}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safe vs Danger Levels */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-4 rounded-xl border-2 border-green-500/30">
              <h4 className="text-green-400 font-semibold mb-2 text-sm">✓ Safe Level</h4>
              <p className="text-white text-lg font-bold">{info.safeLevel}</p>
            </div>
            <div className="glass p-4 rounded-xl border-2 border-red-500/30">
              <h4 className="text-red-400 font-semibold mb-2 text-sm">✗ Danger Level</h4>
              <p className="text-white text-lg font-bold">{info.dangerLevel}</p>
            </div>
          </div>

          {/* Prevention */}
          <div className="glass p-4 rounded-xl border-2 border-blue-500/30">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🛡️</span> How to Protect Yourself
            </h3>
            <div className="space-y-2">
              {info.prevention.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use React Portal to render modal at body level
  return ReactDOM.createPortal(modalContent, document.body);
};

export default PollutantDetailModal;
