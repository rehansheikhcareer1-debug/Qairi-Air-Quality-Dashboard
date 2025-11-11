import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const SetAlert = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { location: cityLocation, aqi } = location.state || {};

  const [alertSettings, setAlertSettings] = useState({
    aqiThreshold: 100,
    email: '',
    phone: '',
    notifyEmail: true,
    notifySMS: false
  });

  const getAQIColor = (value) => {
    if (value <= 50) return 'text-green-400';
    if (value <= 100) return 'text-yellow-400';
    if (value <= 150) return 'text-orange-400';
    return 'text-red-400';
  };

  const handleSaveAlert = () => {
    localStorage.setItem('aqiAlert', JSON.stringify(alertSettings));
    alert('Alert set successfully! You will be notified when AQI exceeds ' + alertSettings.aqiThreshold);
    navigate('/');
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      </div>

      <div className="relative z-20">
        <div className="pt-32 px-6 pb-12">
          <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <button 
              onClick={() => navigate(-1)}
              className="glass px-6 py-3 rounded-lg text-white hover:bg-white/10 transition-all mb-6 flex items-center gap-2"
            >
              <span>←</span> Back
            </button>

            {/* Header */}
            <div className="glass p-8 rounded-2xl border-2 border-white/20 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  🔔
                </div>
                <div>
                  <h1 className="text-white text-3xl font-bold">Set AQI Alert</h1>
                  <p className="text-gray-400">Get notified when air quality changes</p>
                </div>
              </div>

              {/* Location Info */}
              {cityLocation && (
                <div className="glass p-4 rounded-xl border border-blue-500/30 mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400 text-xl">📍</span>
                    <span className="text-white font-semibold text-lg">{cityLocation.name}</span>
                  </div>
                  <div className="text-gray-400">Current AQI: <span className={`font-bold text-xl ${getAQIColor(aqi)}`}>{aqi}</span></div>
                </div>
              )}
            </div>

            {/* Alert Settings */}
            <div className="glass p-8 rounded-2xl border-2 border-white/20 space-y-6">
              {/* AQI Threshold */}
              <div>
                <label className="text-white font-bold text-lg mb-4 block">Alert When AQI Exceeds:</label>
                <div className="flex items-center gap-4 mb-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="300" 
                    value={alertSettings.aqiThreshold}
                    onChange={(e) => setAlertSettings({...alertSettings, aqiThreshold: parseInt(e.target.value)})}
                    className="flex-1 h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #f59e0b 33%, #f97316 66%, #ef4444 100%)`
                    }}
                  />
                  <div className={`glass px-6 py-3 rounded-xl font-bold text-2xl ${getAQIColor(alertSettings.aqiThreshold)} border-2 border-white/20`}>
                    {alertSettings.aqiThreshold}
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Good (0)</span>
                  <span>Moderate (100)</span>
                  <span>Unhealthy (200)</span>
                  <span>Hazardous (300)</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6"></div>

              {/* Email Notification */}
              <div className="glass p-6 rounded-xl border-2 border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📧</span>
                    <div>
                      <div className="text-white font-bold text-lg">Email Notification</div>
                      <div className="text-gray-400 text-sm">Receive alerts via email</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={alertSettings.notifyEmail}
                      onChange={(e) => setAlertSettings({...alertSettings, notifyEmail: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                {alertSettings.notifyEmail && (
                  <input 
                    type="email"
                    placeholder="Enter your email address"
                    value={alertSettings.email}
                    onChange={(e) => setAlertSettings({...alertSettings, email: e.target.value})}
                    className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-400 border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                  />
                )}
              </div>

              {/* SMS Notification */}
              <div className="glass p-6 rounded-xl border-2 border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📱</span>
                    <div>
                      <div className="text-white font-bold text-lg">SMS Notification</div>
                      <div className="text-gray-400 text-sm">Receive alerts via SMS</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={alertSettings.notifySMS}
                      onChange={(e) => setAlertSettings({...alertSettings, notifySMS: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                {alertSettings.notifySMS && (
                  <input 
                    type="tel"
                    placeholder="Enter your phone number"
                    value={alertSettings.phone}
                    onChange={(e) => setAlertSettings({...alertSettings, phone: e.target.value})}
                    className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-400 border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button 
                  onClick={() => navigate(-1)}
                  className="flex-1 glass px-8 py-4 rounded-xl text-white hover:bg-white/10 transition-all border-2 border-white/20 font-semibold text-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveAlert}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-xl text-white hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all font-bold text-lg"
                >
                  Set Alert 🔔
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default SetAlert;
