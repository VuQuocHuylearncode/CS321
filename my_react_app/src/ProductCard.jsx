import React from 'react';
import { Heart, Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={product.imageUrl}   
          alt={product.title}      
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => onAddToWishlist(product)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.title}</h3>  
        <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
        <div className="flex items-center mb-2">
          <span className="text-lg font-bold text-green-600">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= (product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          {product.reviews && (
            <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
          )}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;