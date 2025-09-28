import React, { useState } from 'react';
import { Star, Search, ShoppingCart, User, Menu } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const FilterSidebar = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);

  const products = [
    {
      id: 1,
      name: "Summer's Linen Dress",
      price: 45,
      originalPrice: 65,
      image: "src/images.jpg",
      rating: 4.5,
      colors: ['white']
    },
    {
      id: 2,
      name: "Floral Print Midi Dress",
      price: 52,
      originalPrice: null,
      image: "src/images.jpg",
      rating: 4.2,
      colors: ['green', 'pink']
    },
    {
      id: 3,
      name: "Classic Striped T-shirt",
      price: 28,
      originalPrice: 35,
      image: "src/images.jpg",
      rating: 4.8,
      colors: ['yellow']
    },
    {
      id: 4,
      name: "Bohemian Maxi Dress",
      price: 68,
      originalPrice: null,
      image: "src/images.jpg",
      rating: 4.3,
      colors: ['white']
    },
    {
      id: 5,
      name: "Vintage Denim Jacket",
      price: 89,
      originalPrice: null,
      image: "src/images.jpg",
      rating: 4.6,
      colors: ['blue']
    },
    {
      id: 6,
      name: "Elegant Evening Dress",
      price: 120,
      originalPrice: 150,
      image: "src/images.jpg",
      rating: 4.7,
      colors: ['black']
    }
  ];

  const colors = [
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
    { name: 'Yellow', value: 'yellow', color: 'bg-yellow-500' },
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-500' },
    { name: 'White', value: 'white', color: 'bg-gray-100 border' },
    { name: 'Black', value: 'black', color: 'bg-black' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Filters</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-green-600" />
                    <span className="ml-2 text-sm">Dresses</span>
                    <span className="ml-auto text-xs text-gray-500">24</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-green-600" />
                    <span className="ml-2 text-sm">Tops</span>
                    <span className="ml-auto text-xs text-gray-500">18</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-green-600" />
                    <span className="ml-2 text-sm">Jeans</span>
                    <span className="ml-auto text-xs text-gray-500">12</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Price</h3>
                <div className="space-y-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Color</h3>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => toggleColor(color.value)}
                      className={`w-8 h-8 rounded-full ${color.color} ${
                        selectedColors.includes(color.value) ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-green-600" />
                    <span className="ml-2 text-sm">Zara</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-green-600" />
                    <span className="ml-2 text-sm">H&M</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-green-600" />
                    <span className="ml-2 text-sm">Nike</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-2 text-sm border rounded ${
                        selectedSizes.includes(size)
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            

\            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-w-3 aspect-h-4 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <nav className="flex space-x-2">
                <button className="px-3 py-2 border rounded hover:bg-gray-50">Previous</button>
                <button className="px-3 py-2 bg-green-600 text-white rounded">1</button>
                <button className="px-3 py-2 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-2 border rounded hover:bg-gray-50">Next</button>
              </nav>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;