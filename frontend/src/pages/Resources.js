import React from 'react';
import Navbar from '../components/Navbar';

const Resources = () => {
  const resources = [
    {
      title: 'Understanding AQI',
      description: 'Learn what Air Quality Index means and how it affects your health',
      icon: '📚',
      link: '#'
    },
    {
      title: 'Health Guidelines',
      description: 'Recommendations for different AQI levels and vulnerable groups',
      icon: '🏥',
      link: '#'
    },
    {
      title: 'Pollution Sources',
      description: 'Common sources of air pollution and how to reduce them',
      icon: '🏭',
      link: '#'
    },
    {
      title: 'Indoor Air Quality',
      description: 'Tips to improve air quality inside your home',
      icon: '🏠',
      link: '#'
    },
    {
      title: 'Climate Change',
      description: 'Connection between air quality and climate change',
      icon: '🌍',
      link: '#'
    },
    {
      title: 'Research Papers',
      description: 'Latest scientific studies on air pollution',
      icon: '🔬',
      link: '#'
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
              <h1 className="text-white text-3xl font-bold mb-2">Resources</h1>
              <p className="text-gray-400 mb-8">Educational materials about air quality</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, idx) => (
                  <div 
                    key={idx}
                    className="glass p-6 rounded-xl hover:scale-105 cursor-pointer"
                  >
                    <div className="text-5xl mb-4">{resource.icon}</div>
                    <h3 className="text-white font-semibold text-lg mb-2">{resource.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                    <button className="text-blue-400 hover:text-blue-300 font-semibold">
                      Learn More →
                    </button>
                  </div>
                ))}
              </div>

              {/* Feedback Section */}
              <div className="mt-12 glass p-6 rounded-xl">
                <h3 className="text-white text-xl font-semibold mb-4">Send Feedback</h3>
                <form className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input 
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <textarea 
                    placeholder="Your Message"
                    rows="4"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-lg text-white hover:shadow-lg hover:scale-105"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
