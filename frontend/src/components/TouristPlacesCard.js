import React from 'react';

const TouristPlacesCard = ({ country = 'IN', location = 'Delhi' }) => {
  
  const getTouristPlaces = () => {
    const places = {
      // India
      'Delhi': [
        { name: 'Red Fort', image: '/images/tourist-places/delhi/red-fort.jpg', info: 'Historic fort complex, UNESCO World Heritage Site' },
        { name: 'India Gate', image: '/images/tourist-places/delhi/india-gate.jpg', info: 'War memorial and iconic landmark' },
        { name: 'Qutub Minar', image: '/images/tourist-places/delhi/qutub-minar.jpg', info: 'Tallest brick minaret in the world' },
        { name: 'Lotus Temple', image: '/images/tourist-places/delhi/lotus-temple.jpg', info: 'Baháʼí House of Worship' }
      ],
      'Mumbai': [
        { name: 'Gateway of India', image: '/images/tourist-places/mumbai/gateway-of-india.jpg', info: 'Iconic arch monument' },
        { name: 'Haji Ali Dargah', image: '/images/tourist-places/mumbai/haji-ali.jpg', info: 'Mosque and dargah on an islet' },
        { name: 'Juhu Beach', image: '/images/tourist-places/mumbai/juhu-beach.jpg', info: 'Popular beach destination' },
        { name: 'Marine Drive', image: '/images/tourist-places/mumbai/marine-drive.jpg', info: 'Beautiful seaside promenade' }
      ],
      // Afghanistan
      'Kabul': [
        { name: 'Babur Gardens', image: 'https://source.unsplash.com/400x300/?babur-gardens-kabul', info: 'Historic Mughal garden' },
        { name: 'Darul Aman Palace', image: 'https://source.unsplash.com/400x300/?darul-aman-palace-kabul', info: 'Neoclassical palace' },
        { name: 'National Museum', image: 'https://source.unsplash.com/400x300/?kabul-museum-afghanistan', info: 'Afghan cultural heritage' },
        { name: 'Kabul Zoo', image: 'https://source.unsplash.com/400x300/?kabul-zoo-afghanistan', info: 'Historic city zoo' }
      ],
      // USA
      'Washington': [
        { name: 'White House', image: 'https://source.unsplash.com/400x300/?white-house-washington-dc', info: 'Official residence of US President' },
        { name: 'Lincoln Memorial', image: 'https://source.unsplash.com/400x300/?lincoln-memorial-washington', info: 'Iconic monument' },
        { name: 'Smithsonian Museums', image: 'https://source.unsplash.com/400x300/?smithsonian-museum-washington', info: 'World-class museums' },
        { name: 'Capitol Building', image: 'https://source.unsplash.com/400x300/?capitol-building-washington-dc', info: 'US Congress building' }
      ],
      'New York': [
        { name: 'Statue of Liberty', image: 'https://source.unsplash.com/400x300/?statue-of-liberty-new-york', info: 'Iconic symbol of freedom' },
        { name: 'Central Park', image: 'https://source.unsplash.com/400x300/?central-park-new-york', info: 'Urban park oasis' },
        { name: 'Times Square', image: 'https://source.unsplash.com/400x300/?times-square-new-york', info: 'Bustling commercial hub' },
        { name: 'Empire State Building', image: 'https://source.unsplash.com/400x300/?empire-state-building-new-york', info: 'Iconic skyscraper' }
      ],
      // UK
      'London': [
        { name: 'Big Ben', image: 'https://source.unsplash.com/400x300/?big-ben-london', info: 'Iconic clock tower' },
        { name: 'Tower Bridge', image: 'https://source.unsplash.com/400x300/?tower-bridge-london', info: 'Famous bridge landmark' },
        { name: 'Buckingham Palace', image: 'https://source.unsplash.com/400x300/?buckingham-palace-london', info: 'Royal residence' },
        { name: 'London Eye', image: 'https://source.unsplash.com/400x300/?london-eye-ferris-wheel', info: 'Giant observation wheel' }
      ],
      // France
      'Paris': [
        { name: 'Eiffel Tower', image: 'https://source.unsplash.com/400x300/?eiffel-tower-paris', info: 'Iconic iron tower' },
        { name: 'Louvre Museum', image: 'https://source.unsplash.com/400x300/?louvre-museum-paris', info: 'World famous art museum' },
        { name: 'Notre-Dame', image: 'https://source.unsplash.com/400x300/?notre-dame-cathedral-paris', info: 'Gothic cathedral' },
        { name: 'Arc de Triomphe', image: 'https://source.unsplash.com/400x300/?arc-de-triomphe-paris', info: 'Monumental arch' }
      ],
      // Japan
      'Tokyo': [
        { name: 'Tokyo Tower', image: 'https://source.unsplash.com/400x300/?tokyo-tower-japan', info: 'Communications tower' },
        { name: 'Senso-ji Temple', image: 'https://source.unsplash.com/400x300/?sensoji-temple-tokyo', info: 'Ancient Buddhist temple' },
        { name: 'Shibuya Crossing', image: 'https://source.unsplash.com/400x300/?shibuya-crossing-tokyo', info: 'Busiest intersection' },
        { name: 'Imperial Palace', image: 'https://source.unsplash.com/400x300/?imperial-palace-tokyo', info: 'Emperor residence' }
      ],
      // Default
      'default': [
        { name: 'City Center', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400', info: 'Main city attraction' },
        { name: 'Historic District', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400', info: 'Cultural heritage area' },
        { name: 'Local Museum', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400', info: 'City museum' },
        { name: 'Public Park', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400', info: 'Green space' }
      ]
    };

    return places[location] || places['default'];
  };

  const places = getTouristPlaces();

  const handlePlaceClick = (place) => {
    const searchQuery = `${place.name} ${location}`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="glass p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-xl font-semibold">Popular Places in {location}</h3>
        <span className="text-gray-400 text-sm">📍 {location}</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {places.map((place, idx) => (
          <div 
            key={idx}
            onClick={() => handlePlaceClick(place)}
            className="glass rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all border border-white/10 hover:border-blue-400/50 group"
          >
            <div className="h-32 overflow-hidden relative">
              <img 
                src={place.image} 
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="text-white font-bold text-sm mb-1">{place.name}</h4>
                <p className="text-gray-300 text-xs line-clamp-1">{place.info}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => window.open(`https://www.google.com/search?q=tourist+places+in+${encodeURIComponent(location)}`, '_blank')}
          className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
        >
          Explore More Places in {location} →
        </button>
      </div>
    </div>
  );
};

export default TouristPlacesCard;
