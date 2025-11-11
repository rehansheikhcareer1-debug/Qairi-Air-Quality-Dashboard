import React from 'react';

const AQICharacter = ({ aqi }) => {
  const getCharacterStyle = () => {
    if (aqi <= 50) {
      return { 
        shirt: '#10B981', 
        pants: '#3B82F6',
        expression: 'happy',
        badge: 'Good'
      };
    } else if (aqi <= 100) {
      return { 
        shirt: '#F59E0B', 
        pants: '#3B82F6',
        expression: 'neutral',
        badge: 'Moderate'
      };
    } else if (aqi <= 200) {
      return { 
        shirt: '#F97316', 
        pants: '#3B82F6',
        expression: 'worried',
        badge: 'Unhealthy',
        mask: true
      };
    } else {
      return { 
        shirt: '#DC2626', 
        pants: '#1E40AF',
        expression: 'sick',
        badge: 'Danger',
        mask: true
      };
    }
  };

  const style = getCharacterStyle();
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-32 h-40 transition-all duration-700 ease-in-out hover:scale-105">
        <svg viewBox="0 0 100 140" className="w-full h-full">
          {/* Subtle Shadow */}
          <ellipse cx="50" cy="135" rx="20" ry="4" fill="#000" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.15;0.2" dur="3s" repeatCount="indefinite" />
          </ellipse>
          
          {/* Legs */}
          <rect x="42" y="95" width="7" height="30" rx="3" fill={style.pants} />
          <rect x="51" y="95" width="7" height="30" rx="3" fill={style.pants} />
          
          {/* Shoes */}
          <ellipse cx="45" cy="127" rx="5" ry="3" fill="#1E293B" />
          <ellipse cx="54" cy="127" rx="5" ry="3" fill="#1E293B" />
          
          {/* Body/Shirt - subtle breathing */}
          <rect x="38" y="55" width="24" height="45" rx="12" fill={style.shirt}>
            <animate attributeName="opacity" values="1;0.95;1" dur="3s" repeatCount="indefinite" />
          </rect>
          
          {/* Arms - very subtle movement */}
          <rect x="28" y="60" width="8" height="5" rx="2.5" fill="#FCD34D" transform="rotate(-15 32 62.5)">
            <animateTransform attributeName="transform" type="rotate" values="-15 32 62.5;-17 32 62.5;-15 32 62.5" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="64" y="60" width="8" height="5" rx="2.5" fill="#FCD34D" transform="rotate(15 68 62.5)">
            <animateTransform attributeName="transform" type="rotate" values="15 68 62.5;17 68 62.5;15 68 62.5" dur="4s" repeatCount="indefinite" />
          </rect>
          
          {/* Neck */}
          <rect x="46" y="48" width="8" height="8" rx="2" fill="#FCD34D" />
          
          {/* Head - very subtle movement */}
          <circle cx="50" cy="35" r="18" fill="#FCD34D">
            <animate attributeName="cy" values="35;34.5;35" dur="3s" repeatCount="indefinite" />
          </circle>
          
          {/* Hair */}
          <path d="M 38 25 Q 42 18 46 22 Q 50 16 54 22 Q 58 18 62 25" fill="#4A3728" />
          
          {style.expression === 'happy' && (
            <>
              <circle cx="43" cy="33" r="2" fill="#000">
                <animate attributeName="r" values="2;1.8;2" dur="5s" repeatCount="indefinite" />
              </circle>
              <circle cx="57" cy="33" r="2" fill="#000">
                <animate attributeName="r" values="2;1.8;2" dur="5s" repeatCount="indefinite" />
              </circle>
              <path d="M 40 40 Q 50 47 60 40" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Subtle sparkles */}
              <circle cx="30" cy="25" r="1" fill="#FCD34D" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="70" cy="25" r="1" fill="#FCD34D" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" begin="1s" />
              </circle>
            </>
          )}
          
          {style.expression === 'neutral' && (
            <>
              <circle cx="43" cy="33" r="2" fill="#000" />
              <circle cx="57" cy="33" r="2" fill="#000" />
              <line x1="42" y1="42" x2="58" y2="42" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
          
          {(style.expression === 'worried' || style.expression === 'sick') && (
            <>
              <path d="M 40 30 Q 43 28 46 30" stroke="#000" strokeWidth="1.5" fill="none" />
              <path d="M 54 30 Q 57 28 60 30" stroke="#000" strokeWidth="1.5" fill="none" />
              <circle cx="43" cy="33" r="2" fill="#000" />
              <circle cx="57" cy="33" r="2" fill="#000" />
            </>
          )}
          
          {style.mask && (
            <>
              <rect x="38" y="38" width="24" height="10" rx="2" fill="#4A90E2" opacity="0.95" />
              <line x1="38" y1="43" x2="33" y2="40" stroke="#3B82F6" strokeWidth="1" />
              <line x1="62" y1="43" x2="67" y2="40" stroke="#3B82F6" strokeWidth="1" />
            </>
          )}
          
          {style.expression === 'sick' && (
            <>
              <circle cx="70" cy="40" r="2" fill="#EF4444" opacity="0.6" className="animate-ping" />
              <circle cx="75" cy="37" r="1.5" fill="#F87171" opacity="0.5" className="animate-ping" style={{ animationDelay: '0.3s' }} />
            </>
          )}
        </svg>
        
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 rounded-full shadow-lg transition-all duration-300">
          <span className="text-white text-xs font-bold">{style.badge}</span>
        </div>
      </div>
    </div>
  );
};

export default AQICharacter;
