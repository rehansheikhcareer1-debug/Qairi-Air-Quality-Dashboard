import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);

  const countries = {
    'AF': { name: 'Afghanistan', capital: 'Kabul', flag: '🇦🇫' },
    'AL': { name: 'Albania', capital: 'Tirana', flag: '🇦🇱' },
    'DZ': { name: 'Algeria', capital: 'Algiers', flag: '🇩🇿' },
    'AR': { name: 'Argentina', capital: 'Buenos Aires', flag: '🇦🇷' },
    'AU': { name: 'Australia', capital: 'Canberra', flag: '🇦🇺' },
    'AT': { name: 'Austria', capital: 'Vienna', flag: '🇦🇹' },
    'BD': { name: 'Bangladesh', capital: 'Dhaka', flag: '🇧🇩' },
    'BE': { name: 'Belgium', capital: 'Brussels', flag: '🇧🇪' },
    'BR': { name: 'Brazil', capital: 'Brasilia', flag: '🇧🇷' },
    'CA': { name: 'Canada', capital: 'Ottawa', flag: '🇨🇦' },
    'CN': { name: 'China', capital: 'Beijing', flag: '🇨🇳' },
    'CO': { name: 'Colombia', capital: 'Bogota', flag: '🇨🇴' },
    'CZ': { name: 'Czech Republic', capital: 'Prague', flag: '🇨🇿' },
    'DK': { name: 'Denmark', capital: 'Copenhagen', flag: '🇩🇰' },
    'EG': { name: 'Egypt', capital: 'Cairo', flag: '🇪🇬' },
    'FI': { name: 'Finland', capital: 'Helsinki', flag: '🇫🇮' },
    'FR': { name: 'France', capital: 'Paris', flag: '🇫🇷' },
    'DE': { name: 'Germany', capital: 'Berlin', flag: '🇩🇪' },
    'GR': { name: 'Greece', capital: 'Athens', flag: '🇬🇷' },
    'HK': { name: 'Hong Kong', capital: 'Hong Kong', flag: '🇭🇰' },
    'IN': { name: 'India', capital: 'New Delhi', flag: '🇮🇳' },
    'ID': { name: 'Indonesia', capital: 'Jakarta', flag: '🇮🇩' },
    'IR': { name: 'Iran', capital: 'Tehran', flag: '🇮🇷' },
    'IQ': { name: 'Iraq', capital: 'Baghdad', flag: '🇮🇶' },
    'IE': { name: 'Ireland', capital: 'Dublin', flag: '🇮🇪' },
    'IL': { name: 'Israel', capital: 'Jerusalem', flag: '🇮🇱' },
    'IT': { name: 'Italy', capital: 'Rome', flag: '🇮🇹' },
    'JP': { name: 'Japan', capital: 'Tokyo', flag: '🇯🇵' },
    'KE': { name: 'Kenya', capital: 'Nairobi', flag: '🇰🇪' },
    'KR': { name: 'South Korea', capital: 'Seoul', flag: '🇰🇷' },
    'MY': { name: 'Malaysia', capital: 'Kuala Lumpur', flag: '🇲🇾' },
    'MX': { name: 'Mexico', capital: 'Mexico City', flag: '🇲🇽' },
    'NL': { name: 'Netherlands', capital: 'Amsterdam', flag: '🇳🇱' },
    'NZ': { name: 'New Zealand', capital: 'Wellington', flag: '🇳🇿' },
    'NG': { name: 'Nigeria', capital: 'Abuja', flag: '🇳🇬' },
    'NO': { name: 'Norway', capital: 'Oslo', flag: '🇳🇴' },
    'PK': { name: 'Pakistan', capital: 'Islamabad', flag: '🇵🇰' },
    'PH': { name: 'Philippines', capital: 'Manila', flag: '🇵🇭' },
    'PL': { name: 'Poland', capital: 'Warsaw', flag: '🇵🇱' },
    'PT': { name: 'Portugal', capital: 'Lisbon', flag: '🇵🇹' },
    'QA': { name: 'Qatar', capital: 'Doha', flag: '🇶🇦' },
    'RO': { name: 'Romania', capital: 'Bucharest', flag: '🇷🇴' },
    'RU': { name: 'Russia', capital: 'Moscow', flag: '🇷🇺' },
    'SA': { name: 'Saudi Arabia', capital: 'Riyadh', flag: '🇸🇦' },
    'SG': { name: 'Singapore', capital: 'Singapore', flag: '🇸🇬' },
    'ZA': { name: 'South Africa', capital: 'Pretoria', flag: '🇿🇦' },
    'ES': { name: 'Spain', capital: 'Madrid', flag: '🇪🇸' },
    'LK': { name: 'Sri Lanka', capital: 'Colombo', flag: '🇱🇰' },
    'SE': { name: 'Sweden', capital: 'Stockholm', flag: '🇸🇪' },
    'CH': { name: 'Switzerland', capital: 'Bern', flag: '🇨🇭' },
    'TW': { name: 'Taiwan', capital: 'Taipei', flag: '🇹🇼' },
    'TH': { name: 'Thailand', capital: 'Bangkok', flag: '🇹🇭' },
    'TR': { name: 'Turkey', capital: 'Ankara', flag: '🇹🇷' },
    'AE': { name: 'UAE', capital: 'Abu Dhabi', flag: '🇦🇪' },
    'GB': { name: 'United Kingdom', capital: 'London', flag: '🇬🇧' },
    'US': { name: 'United States', capital: 'Washington', flag: '🇺🇸' },
    'VN': { name: 'Vietnam', capital: 'Hanoi', flag: '🇻🇳' }
  };

  useEffect(() => {
    fetchCountryData();
  }, [countryCode]);

  const fetchCountryData = async () => {
    setLoading(true);
    const country = countries[countryCode] || countries['IN'];
    setCountryData(country);

    try {
      // Get coordinates
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${countryCode}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );

      if (geoResponse.data.length > 0) {
        const { lat, lon } = geoResponse.data[0];

        // Fetch AQI
        const aqiResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        );

        // Fetch Weather
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        );

        setAqiData(aqiResponse.data.list[0]);
        setWeatherData(weatherResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (aqi <= 150) return { level: 'Unhealthy (SG)', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-400', bg: 'bg-red-500/20' };
    return { level: 'Very Unhealthy', color: 'text-purple-400', bg: 'bg-purple-500/20' };
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'AQI',
      data: [85, 92, 78, 105, 98, 112, 95],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  };

  if (loading || !countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const aqiLevel = getAQILevel(aqiData?.main?.aqi * 50 || 0);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      </div>

      <div className="relative z-20">
        <Navbar currentCountry={countryCode} />
        
        <div className="pt-32 px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                {/* Circular Flag */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img 
                    src={`https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`}
                    alt={countryData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{countryData.name}</h1>
                  <p className="text-gray-400">Capital: {countryData.capital}</p>
                </div>
              </div>
              <Link to="/" className="glass px-6 py-3 rounded-lg text-white hover:bg-white/10 transition-all">
                ← Back to Home
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* AQI Card */}
              <div className={`glass p-6 rounded-xl border-2 ${aqiLevel.bg}`}>
                <div className="text-gray-400 text-sm mb-2">Current AQI</div>
                <div className={`text-5xl font-bold ${aqiLevel.color} mb-2`}>
                  {aqiData?.main?.aqi * 50 || 'N/A'}
                </div>
                <div className="text-white font-semibold">{aqiLevel.level}</div>
              </div>

              {/* Temperature Card */}
              <div className="glass p-6 rounded-xl border-2 border-blue-500/30">
                <div className="text-gray-400 text-sm mb-2">Temperature</div>
                <div className="text-5xl font-bold text-blue-400 mb-2">
                  {Math.round(weatherData?.main?.temp || 0)}°C
                </div>
                <div className="text-white font-semibold">{weatherData?.weather[0]?.main || 'N/A'}</div>
              </div>

              {/* Humidity Card */}
              <div className="glass p-6 rounded-xl border-2 border-purple-500/30">
                <div className="text-gray-400 text-sm mb-2">Humidity</div>
                <div className="text-5xl font-bold text-purple-400 mb-2">
                  {weatherData?.main?.humidity || 0}%
                </div>
                <div className="text-white font-semibold">Moisture Level</div>
              </div>
            </div>

            {/* Chart */}
            <div className="glass p-6 rounded-xl mb-8">
              <h3 className="text-white text-xl font-bold mb-4">Weekly AQI Trend</h3>
              <div className="h-64">
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            {/* Pollutants */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-white text-xl font-bold mb-4">Air Pollutants</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'PM2.5', value: aqiData?.components?.pm2_5 || 0, unit: 'μg/m³', icon: '🌫️' },
                  { name: 'PM10', value: aqiData?.components?.pm10 || 0, unit: 'μg/m³', icon: '💨' },
                  { name: 'CO', value: aqiData?.components?.co || 0, unit: 'μg/m³', icon: '☁️' },
                  { name: 'NO2', value: aqiData?.components?.no2 || 0, unit: 'μg/m³', icon: '🏭' }
                ].map((pollutant, idx) => (
                  <div key={idx} className="glass p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">{pollutant.icon}</div>
                    <div className="text-gray-400 text-xs mb-1">{pollutant.name}</div>
                    <div className="text-white text-2xl font-bold">{pollutant.value.toFixed(1)}</div>
                    <div className="text-gray-500 text-xs">{pollutant.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default CountryDetail;
