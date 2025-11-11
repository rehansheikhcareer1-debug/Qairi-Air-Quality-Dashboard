import React from 'react';
import Navbar from '../components/Navbar';

const Products = () => {
  const products = [
    {
      name: 'Air Purifier Pro',
      description: 'HEPA filter removes 99.97% of pollutants',
      price: '$299',
      image: '🌬️',
      rating: 4.8
    },
    {
      name: 'Smart Air Monitor',
      description: 'Real-time air quality tracking device',
      price: '$149',
      image: '📊',
      rating: 4.6
    },
    {
      name: 'N95 Mask Pack',
      description: 'Premium protection masks (50 pack)',
      price: '$49',
      image: '😷',
      rating: 4.9
    },
    {
      name: 'Indoor Plants Set',
      description: 'Natural air purifying plants',
      price: '$79',
      image: '🌿',
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900"></div>
      </div>

      <div className="relative z-20">
        <Navbar />
        
        <div className="pt-24 px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="glass p-8 rounded-3xl">
              <h1 className="text-white text-3xl font-bold mb-2">Recommended Products</h1>
              <p className="text-gray-400 mb-8">Protect yourself from air pollution</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, idx) => (
                  <div 
                    key={idx}
                    className="glass p-6 rounded-xl hover:scale-105 cursor-pointer"
                  >
                    <div className="text-6xl mb-4 text-center">{product.image}</div>
                    <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-blue-400 font-bold text-xl">{product.price}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white text-sm">{product.rating}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-2 rounded-lg text-white hover:shadow-lg">
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
