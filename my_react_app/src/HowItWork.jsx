import React from 'react';
import { Search, Heart, User, ArrowLeft } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-green-600" />,
      title: 'Browse',
      description: 'Explore our curated designer collections for every occasion'
    },
    {
      icon: <Heart className="w-12 h-12 text-green-600" />,
      title: 'Select & Book',
      description: 'Select your favourite, choose your size & rental duration'
    },
    {
      icon: <User className="w-12 h-12 text-green-600" />,
      title: 'Wear & Shine',
      description: 'Receive your outfit, look stunning and enjoy your event'
    },
    {
      icon: <ArrowLeft className="w-12 h-12 text-green-600" />,
      title: 'Return Free',
      description: 'Pack and return with free postage. We handle the cleaning!'
    }
  ];

  return (
    <div>
    <div className="bg-cream-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default HowItWorks;