import React from 'react';
import Footer from './Footer';
import Header from './Header';

const OccasionSelector = ({ onOccasionSelect }) => {
  
  const occasions = [
    'WEDDING', 'BIRTHDAY', 'PARTY', 'DATE NIGHT',
    'COCKTAIL', 'FORMAL', 'FESTIVAL', 'BRIDESMAID'
  ];

  return (
    <div>
        <div className="bg-cream-50 py-16">
      
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Find your perfect dress for any occasion</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {occasions.map((occasion, index) => (
            <button
              key={index}
              onClick={() => onOccasionSelect(occasion)}
              className="bg-green-200 hover:bg-green-300 text-green-800 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>
      
    </div>

    </div>
    
  );
  
};

export default OccasionSelector;