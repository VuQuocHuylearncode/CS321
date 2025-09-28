import React, { useState } from 'react';
import { Search, ShoppingBag, User, Heart, ChevronLeft, ChevronRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      id: 1,
      image: "src/images.jpg",
      alt: "Woman in patterned dress"
    },
    {
      id: 2,
      image: "src/images.jpg",
      alt: "Woman in black coat"
    }
  ];

  const occasions = [
    { name: "Casual", color: "bg-green-200" },
    { name: "Work", color: "bg-green-300" },
    { name: "Party", color: "bg-green-200" },
    { name: "Date", color: "bg-green-300" },
    { name: "Travel", color: "bg-green-200" }
  ];

  const trendingItems = [
    {
      id: 1,
      name: "Maeva",
      image: "src/images.jpg",
      price: "$89"
    },
    {
      id: 2,
      name: "Quilts",
      image: "src/images.jpg",
      price: "$145"
    },
    {
      id: 3,
      name: "Fiona's Collection",
      image: "src/images.jpg",
      price: "$199"
    },
    {
      id: 4,
      name: "French Gabrielle",
      image: "src/images.jpg",
      price: "$125"
    }
  ];

  const brands = [
    {
      id: 1,
      name: "Maeva",
      image: "src/images.jpg",
    },
    {
      id: 2,
      name: "Quilts",
      image: "src/images.jpg",
    },
    {
      id: 3,
      name: "Fiona's Collection",
      image: "src/images.jpg",
    },
    {
      id: 4,
      name: "French Gabrielle",
      image: "src/images.jpg",
    }
  ];

  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Quality Products",
      description: "We ensure premium quality in every piece of clothing we offer"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Shopping",
      description: "Your personal and payment information is always protected"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our customer service team is here to help you anytime"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-white">

      <section className="relative bg-gradient-to-r from-green-100 to-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-20 w-64 h-64 bg-green-200 rounded-full opacity-30 transform rotate-12"></div>
              <div className="absolute bottom-10 right-20 w-80 h-80 bg-green-300 rounded-full opacity-20 transform -rotate-12"></div>
            </div>
            
            <div className="relative z-10 flex items-center space-x-8">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="flex space-x-8">
                {heroImages.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`transition-all duration-500 ${
                      index === currentSlide ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                    }`}
                  >
                    <img 
                      src={item.image}
                      alt={item.alt}
                      className="w-64 h-80 object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                ))}
              </div>

              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Dress for any moment</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {occasions.map((occasion, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full text-gray-700 font-medium transition-all hover:scale-105 hover:shadow-md ${occasion.color}`}
              >
                {occasion.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Trending Style for this summer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 white bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-bold mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Choose your favourite brand</h2>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {brands.map((brand) => (
                <div key={brand.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                    <img 
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 white bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      

    </div>
  );
};

export default HomePage;