import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <circle cx="20" cy="20" r="14" stroke="#3b82f6" strokeWidth="3" fill="none" />
                  <line x1="28" y1="28" x2="34" y2="34" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="20" cy="15" r="2" fill="#10b981" className="animate-pulse" />
                  <circle cx="20" cy="20" r="2" fill="#f59e0b" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <circle cx="20" cy="25" r="2" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                </svg>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Qairi
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Real-time air quality and weather data around the world. Monitor, analyze, and stay informed about environmental conditions.
            </p>
          </div>

          {/* Air Quality Links */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">🌍</span>
              Air Quality
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">AQI App</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Live AQI City Ranking</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Historic AQI City Ranking</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">AQI Map</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">AQI APIs</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Weather Ranking</Link>
              </li>
            </ul>
          </div>

          {/* Rankings Links */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">📊</span>
              Rankings
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/rankings" className="text-gray-400 hover:text-blue-400 transition-colors">Live AQI City Ranking</Link>
              </li>
              <li>
                <Link to="/rankings" className="text-gray-400 hover:text-blue-400 transition-colors">Historic AQI Country Ranking</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-blue-400 transition-colors">AQI Widgets</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-blue-400 transition-colors">Air Quality Blog</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-blue-400 transition-colors">Climate Change</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">📞</span>
              Contact Us
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-gray-400">
                <span className="text-blue-400 text-lg">📞</span>
                <div>
                  <div className="text-white font-semibold mb-1">Phone</div>
                  <a href="tel:+917719984704" className="hover:text-blue-400 transition-colors">
                    +91 7719984704
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-gray-400">
                <span className="text-blue-400 text-lg">📧</span>
                <div>
                  <div className="text-white font-semibold mb-1">Email</div>
                  <a href="mailto:rehan.sheikh.career1@gmail.com" className="hover:text-blue-400 transition-colors break-all">
                    rehan.sheikh.career1@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-gray-400">
                <span className="text-blue-400 text-lg">📍</span>
                <div>
                  <div className="text-white font-semibold mb-1">Location</div>
                  <p>Hyderabad, Telangana<br />India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Countries Section */}
        <div className="pt-8 border-t border-white/10">
          <h3 className="text-white font-bold mb-6 text-center text-xl">
            🌍 Air Quality Monitoring Worldwide
          </h3>
          <p className="text-gray-400 text-center text-sm mb-6">
            Real-time air quality monitoring around the world
          </p>
          
          <div className="glass p-6 rounded-xl border border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
              {[
                { name: 'Afghanistan', code: 'AF', capital: 'Kabul' },
                { name: 'Albania', code: 'AL', capital: 'Tirana' },
                { name: 'Algeria', code: 'DZ', capital: 'Algiers' },
                { name: 'Argentina', code: 'AR', capital: 'Buenos Aires' },
                { name: 'Australia', code: 'AU', capital: 'Canberra' },
                { name: 'Austria', code: 'AT', capital: 'Vienna' },
                { name: 'Bangladesh', code: 'BD', capital: 'Dhaka' },
                { name: 'Belgium', code: 'BE', capital: 'Brussels' },
                { name: 'Brazil', code: 'BR', capital: 'Brasilia' },
                { name: 'Canada', code: 'CA', capital: 'Ottawa' },
                { name: 'China', code: 'CN', capital: 'Beijing' },
                { name: 'Colombia', code: 'CO', capital: 'Bogota' },
                { name: 'Czech Republic', code: 'CZ', capital: 'Prague' },
                { name: 'Denmark', code: 'DK', capital: 'Copenhagen' },
                { name: 'Egypt', code: 'EG', capital: 'Cairo' },
                { name: 'Finland', code: 'FI', capital: 'Helsinki' },
                { name: 'France', code: 'FR', capital: 'Paris' },
                { name: 'Germany', code: 'DE', capital: 'Berlin' },
                { name: 'Greece', code: 'GR', capital: 'Athens' },
                { name: 'Hong Kong', code: 'HK', capital: 'Hong Kong' },
                { name: 'India', code: 'IN', capital: 'New Delhi' },
                { name: 'Indonesia', code: 'ID', capital: 'Jakarta' },
                { name: 'Iran', code: 'IR', capital: 'Tehran' },
                { name: 'Iraq', code: 'IQ', capital: 'Baghdad' },
                { name: 'Ireland', code: 'IE', capital: 'Dublin' },
                { name: 'Israel', code: 'IL', capital: 'Jerusalem' },
                { name: 'Italy', code: 'IT', capital: 'Rome' },
                { name: 'Japan', code: 'JP', capital: 'Tokyo' },
                { name: 'Kenya', code: 'KE', capital: 'Nairobi' },
                { name: 'South Korea', code: 'KR', capital: 'Seoul' },
                { name: 'Malaysia', code: 'MY', capital: 'Kuala Lumpur' },
                { name: 'Mexico', code: 'MX', capital: 'Mexico City' },
                { name: 'Netherlands', code: 'NL', capital: 'Amsterdam' },
                { name: 'New Zealand', code: 'NZ', capital: 'Wellington' },
                { name: 'Nigeria', code: 'NG', capital: 'Abuja' },
                { name: 'Norway', code: 'NO', capital: 'Oslo' },
                { name: 'Pakistan', code: 'PK', capital: 'Islamabad' },
                { name: 'Philippines', code: 'PH', capital: 'Manila' },
                { name: 'Poland', code: 'PL', capital: 'Warsaw' },
                { name: 'Portugal', code: 'PT', capital: 'Lisbon' },
                { name: 'Qatar', code: 'QA', capital: 'Doha' },
                { name: 'Romania', code: 'RO', capital: 'Bucharest' },
                { name: 'Russia', code: 'RU', capital: 'Moscow' },
                { name: 'Saudi Arabia', code: 'SA', capital: 'Riyadh' },
                { name: 'Singapore', code: 'SG', capital: 'Singapore' },
                { name: 'South Africa', code: 'ZA', capital: 'Pretoria' },
                { name: 'Spain', code: 'ES', capital: 'Madrid' },
                { name: 'Sri Lanka', code: 'LK', capital: 'Colombo' },
                { name: 'Sweden', code: 'SE', capital: 'Stockholm' },
                { name: 'Switzerland', code: 'CH', capital: 'Bern' },
                { name: 'Taiwan', code: 'TW', capital: 'Taipei' },
                { name: 'Thailand', code: 'TH', capital: 'Bangkok' },
                { name: 'Turkey', code: 'TR', capital: 'Ankara' },
                { name: 'UAE', code: 'AE', capital: 'Abu Dhabi' },
                { name: 'United Kingdom', code: 'GB', capital: 'London' },
                { name: 'United States', code: 'US', capital: 'Washington' },
                { name: 'Vietnam', code: 'VN', capital: 'Hanoi' }
              ].map((country, idx) => (
                <Link
                  key={idx}
                  to={`/country/${country.code}`}
                  className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 px-3 py-2 rounded-lg transition-all text-center block"
                >
                  {country.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 Qairi. All rights reserved. | Developed by <span className="text-blue-400 font-semibold">Rehan R Sheikh</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Find us on:</span>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-blue-500/20 transition-all hover:scale-110">
                  <span className="text-blue-400">𝕏</span>
                </a>
                <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-blue-500/20 transition-all hover:scale-110">
                  <span className="text-blue-400">in</span>
                </a>
                <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-blue-500/20 transition-all hover:scale-110">
                  <span className="text-blue-400">f</span>
                </a>
                <a href="#" className="w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-blue-500/20 transition-all hover:scale-110">
                  <span className="text-blue-400">📷</span>
                </a>
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="flex gap-4 text-sm">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</Link>
            </div>
          </div>
        </div>

        {/* Support Desk Badge */}
        <div className="mt-6 flex justify-center">
          <div className="glass px-6 py-3 rounded-full border border-yellow-500/30 bg-yellow-500/5 flex items-center gap-3">
            <span className="text-2xl">👨‍💻</span>
            <div>
              <div className="text-white font-semibold text-sm">Support Desk</div>
              <div className="text-gray-400 text-xs">Available 24/7 for assistance</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
