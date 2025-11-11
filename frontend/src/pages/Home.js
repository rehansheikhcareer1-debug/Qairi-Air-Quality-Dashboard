import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AQICard from '../components/AQICard';
import WeatherCard from '../components/WeatherCard';
import WeatherAnimation from '../components/WeatherAnimation';
import MapComponent from '../components/MapComponent';
import PollutantsCard from '../components/PollutantsCard';
import AQIGraph from '../components/AQIGraph';
import NewsCard from '../components/NewsCard';
import LocationInfoSidebar from '../components/LocationInfoSidebar';
import SeasonCard from '../components/SeasonCard';
import TouristPlacesCard from '../components/TouristPlacesCard';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aqiData, setAqiData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ name: 'Delhi', lat: 28.6139, lon: 77.2090 });
  const [currentCountry, setCurrentCountry] = useState('IN');

  useEffect(() => {
    // load default location data
    fetchData('Delhi', 'IN');
  }, []);

  const fetchData = async (city, country) => {
    setLoading(true);
    console.log('fetchData called with country:', country);
    setCurrentCountry(country);
    console.log('currentCountry updated to:', country);
    try {
      // get coordinates first
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );

      if (geoResponse.data.length === 0) {
        alert('Location not found!');
        setLoading(false);
        return;
      }

      const { lat, lon, name } = geoResponse.data[0];
      setLocation({ name, lat, lon });

      // fetch AQI data
      const aqiResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );

      // fetch weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );

      const aqiInfo = aqiResponse.data.list[0];
      const weatherInfo = weatherResponse.data;

      setAqiData({
        aqi: aqiInfo.main.aqi * 50, // convert to US AQI scale
        pollutants: {
          pm2_5: aqiInfo.components.pm2_5.toFixed(1),
          pm10: aqiInfo.components.pm10.toFixed(1),
          co: aqiInfo.components.co.toFixed(1),
          so2: aqiInfo.components.so2.toFixed(1),
          no2: aqiInfo.components.no2.toFixed(1),
          o3: aqiInfo.components.o3.toFixed(1)
        }
      });

      setWeatherData({
        temp: weatherInfo.main.temp,
        condition: weatherInfo.weather[0].main,
        humidity: weatherInfo.main.humidity,
        windSpeed: (weatherInfo.wind.speed * 3.6).toFixed(1), // convert to km/h
        uvIndex: 7 // placeholder
      });

      setLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
      alert('Failed to fetch data. Please try again.');
      setLoading(false);
    }
  };

  const getWeatherBackground = () => {
    if (!weatherData) return 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1920';
    
    switch (weatherData.condition) {
      case 'Clear':
        return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1920'; // Sunny sky
      case 'Clouds':
        return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920'; // Cloudy sky
      case 'Rain':
      case 'Drizzle':
        return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1920'; // Rainy scene
      case 'Snow':
        return 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920'; // Snowy landscape
      case 'Thunderstorm':
        return 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1920'; // Storm
      case 'Mist':
      case 'Haze':
      case 'Fog':
        return 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920'; // Misty
      default:
        return 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1920';
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url('${getWeatherBackground()}')`,
            opacity: 0.25
          }}
        ></div>
      </div>

      {/* Weather Animation */}
      {weatherData && <WeatherAnimation condition={weatherData.condition} />}

      {/* Content */}
      <div className="relative z-20">
        <div className="pt-24 px-6 pb-12">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Search */}
            <SearchBar onSearch={fetchData} loading={loading} currentCountry={currentCountry} />

            {/* Season Card - Top Position (Full Width) */}
            {aqiData && weatherData && (
              <SeasonCard weather={weatherData} location={location.name} />
            )}

            {/* Main Content */}
            {aqiData && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">
                  {/* AQI Card + Weather Card */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AQICard 
                      aqi={aqiData.aqi} 
                      location={location.name}
                      pollutants={aqiData.pollutants}
                      weather={weatherData}
                    />
                    <WeatherCard weather={weatherData} />
                  </div>

                  {/* Map */}
                  <MapComponent 
                    lat={location.lat} 
                    lon={location.lon}
                    locationName={location.name}
                  />

                  {/* Pollutants */}
                  <PollutantsCard 
                    pollutants={aqiData.pollutants}
                    location={location.name}
                  />

                  {/* Graph */}
                  <AQIGraph onViewDetails={(type) => navigate(`/aqi-analysis?view=${type}`)} />

                  {/* Tourist Places */}
                  <TouristPlacesCard country={currentCountry} location={location.name} />

                  {/* News */}
                  <NewsCard country={currentCountry} location={location.name} />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <LocationInfoSidebar 
                    location={location}
                    aqi={aqiData.aqi}
                    weather={weatherData}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
