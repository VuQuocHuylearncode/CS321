import React, { useState } from 'react';
import { Heart, X, ShoppingBag } from 'lucide-react';
import Footer from './Footer';
import Header from './Header';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Skinny Fit Jeans",
      brand: "Gucci",
      size: "M",
      price: 240,
      originalPrice: 260,
      image: "src/images.jpg",
    },
    {
      id: 2,
      name: "Blythe Top - Mint Green",
      brand: "Gucci",
      size: "L",
      price: 180,
      image: "src/images.jpg",
    },
    {
      id: 3,
      name: "Sleeve Striped T-shirt",
      brand: "Gucci",
      size: "M",
      price: 130,
      originalPrice: 160,
      image: "src/images.jpg",
    }
  ]);

  const [cartItems, setCartItems] = useState([]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">My Wishlist</h2>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Your wishlist is empty</p>
            <p className="text-gray-400 text-sm mt-2">Start adding items you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative group">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {item.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      SALE
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    Size: <span className="font-medium">{item.size}</span> • Brand: <span className="font-medium">{item.brand}</span>
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-green-600 font-bold text-xl">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">${item.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              {cartItems.length} item{cartItems.length > 1 ? 's' : ''} added to cart!
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Wishlist;