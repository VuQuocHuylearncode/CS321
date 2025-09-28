import React from 'react';
import Header from './Header';
import Footer from './Footer';

const BrandShowcase = () => {
  const brands = [
    { name: 'Gucci', logo: 'GG' },
    { name: 'Prada', logo: 'PR' },
    { name: 'H&M', logo: 'H&M' },
    { name: 'Zara', logo: 'Z' }
  ];

  return (
    <div>
    <div className="bg-cream-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore your favourite brand</h2>
        <p className="text-center text-gray-600 mb-8">Explore hundreds of brands we stocked with you in mind</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="text-3xl font-bold mb-4">{brand.logo}</div>
                <p className="text-gray-700 font-medium">{brand.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BrandShowcase;