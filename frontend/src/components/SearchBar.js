import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, loading, currentCountry = 'IN' }) => {
  const [city, setCity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80');
  
  // Use currentCountry directly from props instead of local state
  const country = currentCountry;

  // Update background when city changes
  useEffect(() => {
    if (city && city.trim().length > 2) {
      const timer = setTimeout(() => {
        setBackgroundImage(`https://source.unsplash.com/1200x400/?${encodeURIComponent(city)}-city-skyline,${encodeURIComponent(city)}-landmark`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [city]);

  // Fetch live suggestions from OpenWeather Geocoding API
  const fetchSuggestions = async (query) => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      console.log('Fetching suggestions for:', query);
      // Search globally, not just in current country
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=10&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );
      
      const data = await response.json();
      console.log('Suggestions received:', data);
      
      if (data && data.length > 0) {
        const formattedSuggestions = data.map(item => ({
          name: item.name,
          state: item.state || '',
          country: item.country,
          lat: item.lat,
          lon: item.lon,
          displayName: `${item.name}${item.state ? ', ' + item.state : ''}, ${item.country}`
        }));
        setSuggestions(formattedSuggestions);
        setShowSuggestions(true);
        console.log('Showing suggestions:', formattedSuggestions.length);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  // Handle city input change with debounce
  const handleCityChange = (value) => {
    setCity(value);
    
    // Debounce API calls
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    
    window.searchTimeout = setTimeout(() => {
      fetchSuggestions(value);
    }, 300); // Wait 300ms after user stops typing
  };

  // Get country code from country name
  const getCountryCode = (countryName) => {
    const countryMap = {
      'IN': 'India',
      'US': 'United States',
      'GB': 'United Kingdom',
      'CN': 'China',
      'JP': 'Japan',
      'AU': 'Australia',
      'CA': 'Canada',
      'DE': 'Germany',
      'FR': 'France',
      'BR': 'Brazil',
      'AF': 'Afghanistan',
      'AL': 'Albania',
      'DZ': 'Algeria',
      'AR': 'Argentina',
      'AT': 'Austria',
      'BD': 'Bangladesh',
      'BE': 'Belgium',
      'CO': 'Colombia',
      'CZ': 'Czech Republic',
      'DK': 'Denmark',
      'EG': 'Egypt',
      'FI': 'Finland',
      'GR': 'Greece',
      'HK': 'Hong Kong',
      'ID': 'Indonesia',
      'IR': 'Iran',
      'IQ': 'Iraq',
      'IE': 'Ireland',
      'IL': 'Israel',
      'IT': 'Italy',
      'KE': 'Kenya',
      'KR': 'South Korea',
      'MY': 'Malaysia',
      'MX': 'Mexico',
      'NL': 'Netherlands',
      'NZ': 'New Zealand',
      'NG': 'Nigeria',
      'NO': 'Norway',
      'PK': 'Pakistan',
      'PH': 'Philippines',
      'PL': 'Poland',
      'PT': 'Portugal',
      'QA': 'Qatar',
      'RO': 'Romania',
      'RU': 'Russia',
      'SA': 'Saudi Arabia',
      'SG': 'Singapore',
      'ZA': 'South Africa',
      'ES': 'Spain',
      'LK': 'Sri Lanka',
      'SE': 'Sweden',
      'CH': 'Switzerland',
      'TW': 'Taiwan',
      'TH': 'Thailand',
      'TR': 'Turkey',
      'AE': 'UAE',
      'VN': 'Vietnam'
    };
    
    // Find country code by matching country name
    for (const [code, name] of Object.entries(countryMap)) {
      if (name.toLowerCase() === countryName.toLowerCase() || code === countryName) {
        return code;
      }
    }
    
    // If not found, return the country code as is (it might already be a code)
    return countryName;
  };

  // Select suggestion
  const selectSuggestion = (suggestion) => {
    setCity(suggestion.name);
    setShowSuggestions(false);
    
    // Update background image immediately
    setBackgroundImage(`https://source.unsplash.com/1200x400/?${encodeURIComponent(suggestion.name)}-city-skyline,${encodeURIComponent(suggestion.name)}-landmark`);
    
    // Get the country code from suggestion
    const suggestedCountryCode = getCountryCode(suggestion.country);
    
    // Search with the city and its actual country
    onSearch(suggestion.name, suggestedCountryCode);
  };

  const countries = [
    { code: 'AF', name: 'Afghanistan', capital: 'Kabul' },
    { code: 'AL', name: 'Albania', capital: 'Tirana' },
    { code: 'DZ', name: 'Algeria', capital: 'Algiers' },
    { code: 'AR', name: 'Argentina', capital: 'Buenos Aires' },
    { code: 'AU', name: 'Australia', capital: 'Canberra' },
    { code: 'AT', name: 'Austria', capital: 'Vienna' },
    { code: 'BD', name: 'Bangladesh', capital: 'Dhaka' },
    { code: 'BE', name: 'Belgium', capital: 'Brussels' },
    { code: 'BR', name: 'Brazil', capital: 'Brasilia' },
    { code: 'CA', name: 'Canada', capital: 'Ottawa' },
    { code: 'CN', name: 'China', capital: 'Beijing' },
    { code: 'CO', name: 'Colombia', capital: 'Bogota' },
    { code: 'CZ', name: 'Czech Republic', capital: 'Prague' },
    { code: 'DK', name: 'Denmark', capital: 'Copenhagen' },
    { code: 'EG', name: 'Egypt', capital: 'Cairo' },
    { code: 'FI', name: 'Finland', capital: 'Helsinki' },
    { code: 'FR', name: 'France', capital: 'Paris' },
    { code: 'DE', name: 'Germany', capital: 'Berlin' },
    { code: 'GR', name: 'Greece', capital: 'Athens' },
    { code: 'HK', name: 'Hong Kong', capital: 'Hong Kong' },
    { code: 'IN', name: 'India', capital: 'New Delhi' },
    { code: 'ID', name: 'Indonesia', capital: 'Jakarta' },
    { code: 'IR', name: 'Iran', capital: 'Tehran' },
    { code: 'IQ', name: 'Iraq', capital: 'Baghdad' },
    { code: 'IE', name: 'Ireland', capital: 'Dublin' },
    { code: 'IL', name: 'Israel', capital: 'Jerusalem' },
    { code: 'IT', name: 'Italy', capital: 'Rome' },
    { code: 'JP', name: 'Japan', capital: 'Tokyo' },
    { code: 'KE', name: 'Kenya', capital: 'Nairobi' },
    { code: 'KR', name: 'South Korea', capital: 'Seoul' },
    { code: 'MY', name: 'Malaysia', capital: 'Kuala Lumpur' },
    { code: 'MX', name: 'Mexico', capital: 'Mexico City' },
    { code: 'NL', name: 'Netherlands', capital: 'Amsterdam' },
    { code: 'NZ', name: 'New Zealand', capital: 'Wellington' },
    { code: 'NG', name: 'Nigeria', capital: 'Abuja' },
    { code: 'NO', name: 'Norway', capital: 'Oslo' },
    { code: 'PK', name: 'Pakistan', capital: 'Islamabad' },
    { code: 'PH', name: 'Philippines', capital: 'Manila' },
    { code: 'PL', name: 'Poland', capital: 'Warsaw' },
    { code: 'PT', name: 'Portugal', capital: 'Lisbon' },
    { code: 'QA', name: 'Qatar', capital: 'Doha' },
    { code: 'RO', name: 'Romania', capital: 'Bucharest' },
    { code: 'RU', name: 'Russia', capital: 'Moscow' },
    { code: 'SA', name: 'Saudi Arabia', capital: 'Riyadh' },
    { code: 'SG', name: 'Singapore', capital: 'Singapore' },
    { code: 'ZA', name: 'South Africa', capital: 'Pretoria' },
    { code: 'ES', name: 'Spain', capital: 'Madrid' },
    { code: 'LK', name: 'Sri Lanka', capital: 'Colombo' },
    { code: 'SE', name: 'Sweden', capital: 'Stockholm' },
    { code: 'CH', name: 'Switzerland', capital: 'Bern' },
    { code: 'TW', name: 'Taiwan', capital: 'Taipei' },
    { code: 'TH', name: 'Thailand', capital: 'Bangkok' },
    { code: 'TR', name: 'Turkey', capital: 'Ankara' },
    { code: 'AE', name: 'UAE', capital: 'Abu Dhabi' },
    { code: 'GB', name: 'United Kingdom', capital: 'London' },
    { code: 'US', name: 'United States', capital: 'Washington' },
    { code: 'VN', name: 'Vietnam', capital: 'Hanoi' }
  ];

  const getFlagUrl = (code) => `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;

  const handleSearch = (e) => {
    e.preventDefault();
    const searchCity = city.trim() || selectedCountry?.capital;
    if (searchCity) {
      onSearch(searchCity, country);
    }
  };

  const handleCountryChange = (newCountry) => {
    setIsDropdownOpen(false);
    // Auto-load capital city when country changes
    const selected = countries.find(c => c.code === newCountry);
    if (selected) {
      const cityToSearch = city.trim() || selected.capital;
      onSearch(cityToSearch, newCountry);
    }
  };

  const selectedCountry = countries.find(c => c.code === country);

  return (
    <div className="p-6 rounded-2xl max-w-3xl mx-auto relative" style={{ 
      zIndex: 30,
      border: '2px solid rgba(255, 255, 255, 0.15)',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 50%, rgba(51, 65, 85, 0.85) 100%)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1) inset'
    }}>
      {/* Dynamic City Background - Very subtle */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          filter: 'blur(12px) brightness(0.15)',
          opacity: 0.2,
          transform: 'scale(1.1)',
          zIndex: -1
        }}
      >
        {/* Loading shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-shimmer"></div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none" style={{ zIndex: -1 }}></div>
      
      <form onSubmit={handleSearch} className="flex items-center gap-4 relative z-10">
        <div className="relative" style={{ zIndex: 90 }}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer min-w-[200px] flex items-center justify-between hover:bg-white/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <img 
                src={getFlagUrl(country)} 
                alt={selectedCountry?.name}
                className="w-6 h-4 object-cover rounded"
              />
              <span className="font-medium">{selectedCountry?.name}</span>
            </div>
            <span className="text-xs ml-2">{isDropdownOpen ? '▲' : '▼'}</span>
          </button>
          
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute top-full mt-2 w-full max-h-64 overflow-y-auto bg-slate-900/95 backdrop-blur-lg rounded-lg border border-white/20 shadow-2xl z-50">
                {countries.map(c => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleCountryChange(c.code)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-500/20 transition-all text-left ${
                      country === c.code ? 'bg-blue-500/30' : ''
                    }`}
                  >
                    <img 
                      src={getFlagUrl(c.code)} 
                      alt={c.name}
                      className="w-6 h-4 object-cover rounded"
                    />
                    <span className="text-white font-medium">{c.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="flex-1 relative" style={{ zIndex: 9999 }}>
          <input
            type="text"
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
            onFocus={() => {
              console.log('Input focused, city:', city, 'suggestions:', suggestions.length);
              if (city.trim().length > 0 && suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            placeholder={`Search location or press Enter for ${selectedCountry?.capital}`}
            className="w-full bg-white/10 text-white px-6 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 placeholder-gray-400 transition-all duration-200 hover:bg-white/15 hover:border-white/30"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          />
          
          {/* Live Suggestions Dropdown - Right below input */}
          {showSuggestions && suggestions.length > 0 && (
            <>
              <div 
                className="fixed inset-0" 
                style={{ zIndex: 9998 }}
                onClick={() => setShowSuggestions(false)}
              ></div>
              <div 
                className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-xl shadow-2xl border-2" 
                style={{ 
                  zIndex: 9999,
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
                  backdropFilter: 'blur(20px)',
                  borderColor: 'rgba(96, 165, 250, 0.4)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)'
                }}
              >
                <div className="px-4 py-3 border-b border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <span className="text-blue-300 text-xs font-bold tracking-wider">🌍 CITY SUGGESTIONS</span>
                </div>
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full px-5 py-4 flex items-center gap-4 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 text-left border-b border-white/5 last:border-0 group"
                  >
                    <span className="text-blue-400 text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-200">📍</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-base truncate group-hover:text-blue-200 transition-colors">{suggestion.name}</div>
                      <div className="text-gray-400 text-sm truncate mt-0.5">
                        {suggestion.state && <span className="text-blue-300">{suggestion.state}, </span>}
                        <span className="text-gray-500">{suggestion.country}</span>
                      </div>
                    </div>
                    <div className="text-blue-400 text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                      <span>→</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-lg text-white font-semibold hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 disabled:opacity-50 flex items-center gap-2 transition-all duration-200"
          style={{
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
          }}
        >
          <span className={loading ? 'animate-spin-slow' : ''}>🌍</span>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
