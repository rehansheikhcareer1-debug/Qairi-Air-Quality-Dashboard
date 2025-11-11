import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ currentCountry = 'IN', onCountryChange }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Load profile image
      const savedImage = localStorage.getItem(`profile_image_${userData.id}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show navbar at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
  const countries = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AL', name: 'Albania' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CA', name: 'Canada' },
    { code: 'CN', name: 'China' },
    { code: 'CO', name: 'Colombia' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EG', name: 'Egypt' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'GR', name: 'Greece' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IR', name: 'Iran' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'JP', name: 'Japan' },
    { code: 'KE', name: 'Kenya' },
    { code: 'KR', name: 'South Korea' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MX', name: 'Mexico' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'NO', name: 'Norway' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RO', name: 'Romania' },
    { code: 'RU', name: 'Russia' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'ES', name: 'Spain' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TR', name: 'Turkey' },
    { code: 'AE', name: 'UAE' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'VN', name: 'Vietnam' }
  ];
  
  const selectedCountry = countries.find(c => c.code === currentCountry) || countries[0];
  const getFlagUrl = (code) => `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-white';
  };

  return (
    <nav 
      className={`fixed w-full z-50 px-6 py-3 transition-all duration-300 ${
        isVisible ? 'top-0' : '-top-24'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 50%, rgba(51, 65, 85, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.1) inset'
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all"></div>
            <svg viewBox="0 0 40 40" className="w-full h-full relative z-10">
              {/* Q with air quality wave */}
              <circle cx="20" cy="20" r="14" stroke="#3b82f6" strokeWidth="3" fill="none" />
              <line x1="28" y1="28" x2="34" y2="34" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
              {/* Air quality indicator dots */}
              <circle cx="20" cy="15" r="2" fill="#10b981" className="animate-pulse" />
              <circle cx="20" cy="20" r="2" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
              <circle cx="20" cy="25" r="2" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
            </svg>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all">
            Qairi
          </div>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Link 
            to="/" 
            className={`${isActive('/')} px-5 py-2 rounded-lg transition-all duration-300 ease-in-out font-semibold hover:bg-white/10 hover:scale-105 active:scale-95 relative group`}
            style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <span className="relative z-10">Home</span>
            {location.pathname === '/' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg transition-all duration-300"></div>
            )}
          </Link>
          <Link 
            to="/rankings" 
            className={`${isActive('/rankings')} px-5 py-2 rounded-lg transition-all duration-300 ease-in-out font-semibold hover:bg-white/10 hover:scale-105 active:scale-95 relative group`}
            style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <span className="relative z-10">Rankings</span>
            {location.pathname === '/rankings' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg transition-all duration-300"></div>
            )}
          </Link>
          <Link 
            to="/products" 
            className={`${isActive('/products')} px-5 py-2 rounded-lg transition-all duration-300 ease-in-out font-semibold hover:bg-white/10 hover:scale-105 active:scale-95 relative group`}
            style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <span className="relative z-10">Products</span>
            {location.pathname === '/products' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg transition-all duration-300"></div>
            )}
          </Link>
          <Link 
            to="/resources" 
            className={`${isActive('/resources')} px-5 py-2 rounded-lg transition-all duration-300 ease-in-out font-semibold hover:bg-white/10 hover:scale-105 active:scale-95 relative group`}
            style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <span className="relative z-10">Resources</span>
            {location.pathname === '/resources' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg transition-all duration-300"></div>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="px-4 py-2 rounded-lg flex items-center gap-2 border border-white/20 hover:border-blue-400/50 transition-all cursor-pointer font-semibold"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <img 
                src={getFlagUrl(selectedCountry.code)} 
                alt={selectedCountry.name}
                className="w-6 h-4 object-cover rounded shadow-sm"
              />
              <span className="text-white text-sm">{selectedCountry.name}</span>
              <span className="text-blue-400 text-xs">{isCountryDropdownOpen ? '▲' : '▼'}</span>
            </button>
            
            {isCountryDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsCountryDropdownOpen(false)}
                ></div>
                <div className="absolute top-full right-0 mt-2 w-48 max-h-64 overflow-y-auto bg-slate-900/95 backdrop-blur-lg rounded-lg border border-white/20 shadow-2xl z-50">
                  {countries.map(c => (
                    <button
                      key={c.code}
                      onClick={() => {
                        if (onCountryChange) {
                          onCountryChange(c.code);
                        }
                        setIsCountryDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-500/20 transition-all text-left ${
                        currentCountry === c.code ? 'bg-blue-500/30' : ''
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
          
          <button className="relative text-gray-300 hover:text-white p-2 glass rounded-lg hover:bg-white/10 hover:scale-110 transition-all duration-200 group">
            <span className="text-xl group-hover:animate-bounce">🔔</span>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
              3
            </span>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          </button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/profile"
                className="text-white font-semibold px-3 py-2 glass rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all flex items-center gap-3"
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-400/50"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{user.username}</span>
              </Link>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  setUser(null);
                  window.location.href = '/';
                }}
                className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-2 rounded-full text-white hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login"
                className="px-6 py-2 rounded-full text-white font-semibold border-2 border-blue-500/50 hover:bg-blue-500/10 transition-all"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all font-semibold"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
