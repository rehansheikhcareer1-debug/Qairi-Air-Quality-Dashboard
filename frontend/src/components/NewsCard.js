import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsCard = ({ country = 'IN', location = 'Delhi' }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [country, location]);

  const getCountryName = (code) => {
    const countryNames = {
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
    return countryNames[code] || 'World';
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const countryName = getCountryName(country);
      
      // Try multiple search queries for better results
      const queries = [
        `"${location}" AND (air quality OR pollution OR AQI)`,
        `"${countryName}" AND (weather OR climate OR pollution)`,
        `air quality ${location}`,
        `pollution ${countryName}`
      ];
      
      let articles = [];
      
      // Try each query until we get results
      for (const query of queries) {
        try {
          console.log('Trying query:', query);
          const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=10&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
          );
          
          if (response.data.articles && response.data.articles.length > 0) {
            articles = response.data.articles;
            break;
          }
        } catch (err) {
          console.log('Query failed:', query, err.message);
          continue;
        }
      }
      
      if (articles.length > 0) {
        // Filter out articles without images or URLs
        const validArticles = articles.filter(a => a.url && a.urlToImage).slice(0, 6);
        if (validArticles.length > 0) {
          setNews(validArticles);
          setLoading(false);
          return;
        }
      }
      
      throw new Error('No valid articles found');
    } catch (error) {
      console.log('All queries failed, using fallback:', error);
      // fallback to dynamic dummy data based on location
      const countryName = getCountryName(country);
      
      // Different image sets for variety
      const imagePool = [
        'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80',
        'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800&q=80',
        'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
        'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80'
      ];
      
      // Use country code to generate consistent but different images
      const countryHash = country.charCodeAt(0) + country.charCodeAt(1);
      
      // Country-specific news sources
      const newsUrls = {
        'IN': 'https://www.hindustantimes.com/environment',
        'US': 'https://www.epa.gov/newsreleases',
        'GB': 'https://www.bbc.com/news/science-environment',
        'CN': 'https://www.chinadaily.com.cn/environment',
        'JP': 'https://www.japantimes.co.jp/environment/',
        'AU': 'https://www.abc.net.au/news/environment/',
        'CA': 'https://www.cbc.ca/news/climate',
        'DE': 'https://www.dw.com/en/environment/s-11798',
        'FR': 'https://www.france24.com/en/environment/',
        'default': 'https://www.reuters.com/business/environment/'
      };
      
      const newsUrl = newsUrls[country] || newsUrls['default'];
      
      setNews([
        {
          title: `${location} Reports Rising Air Pollution Levels`,
          description: `Environmental agencies in ${countryName} monitor increasing pollution in ${location} and surrounding areas...`,
          urlToImage: imagePool[countryHash % imagePool.length],
          publishedAt: new Date().toISOString(),
          source: { name: 'Environmental News' },
          url: newsUrl
        },
        {
          title: `Weather Alert: ${countryName} Faces Climate Challenges`,
          description: `Meteorological departments issue warnings as ${location} experiences unusual weather patterns...`,
          urlToImage: imagePool[(countryHash + 1) % imagePool.length],
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          source: { name: 'Climate Watch' },
          url: 'https://www.bbc.com/news/science-environment'
        },
        {
          title: `${location} Launches Air Quality Improvement Initiative`,
          description: `Government of ${countryName} announces new measures to combat pollution in ${location}...`,
          urlToImage: imagePool[(countryHash + 2) % imagePool.length],
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          source: { name: 'Policy News' },
          url: 'https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health'
        },
        {
          title: `Seasonal Weather Forecast for ${location}`,
          description: `Experts predict significant weather changes in ${location}, ${countryName} for upcoming season...`,
          urlToImage: imagePool[(countryHash + 3) % imagePool.length],
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
          source: { name: 'Weather Today' },
          url: 'https://www.weather.com/news'
        }
      ]);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="glass p-6 rounded-2xl">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-1/4"></div>
          <div className="h-32 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-6 rounded-2xl">
      <h3 className="text-white text-xl font-semibold mb-6">Latest AQI News</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((article, idx) => (
          <div 
            key={idx}
            onClick={() => {
              if (article.url) {
                window.open(article.url, '_blank', 'noopener,noreferrer');
              }
            }}
            className="glass rounded-2xl overflow-hidden hover:scale-102 cursor-pointer border border-white/10 group relative transition-all hover:border-blue-400/50"
          >
            {article.urlToImage && (
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={article.urlToImage} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30">
                    <span className="text-white">🔖</span>
                  </button>
                </div>
              </div>
            )}
            
            <div className="p-6 relative -mt-20">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                  {article.source.name}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <h4 className="text-white font-bold text-lg mb-3 line-clamp-2 leading-tight">
                {article.title}
              </h4>
              
              <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                {article.description}
              </p>
              
              <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm group-hover:gap-3 transition-all">
                Read Full Story
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
