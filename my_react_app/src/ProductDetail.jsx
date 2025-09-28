import React, { useState } from 'react';
import { Star, Heart, ArrowLeft, ArrowRight } from 'lucide-react';

const ProductDetail = ({ product, onAddToCart, onAddToWishlist, isInWishlist, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [rentalDuration, setRentalDuration] = useState('4');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sizes = ['8', '10', '12', '14', '16'];
  const durations = ['4', '8', '20'];
  const productImages = [product.image, product.image, product.image];

  const relatedProducts = [
    {
      id: 101,
      name: 'Skinny Fit Jeans',
      price: 240,
      image: '/api/placeholder/200/300'
    },
    {
      id: 102,
      name: 'Blythe Top - Nori Green',
      price: 180,
      image: '/api/placeholder/200/300'
    },
    {
      id: 103,
      name: 'Sleeve Striped T-shirt',
      price: 130,
      image: '/api/placeholder/200/300'
    },
    {
      id: 104,
      name: 'Elegant Silk Dress',
      price: 290,
      image: '/api/placeholder/200/300'
    }
  ];

  const customerFeedback = [
    {
      id: 1,
      name: 'Sarah Anderson',
      rating: 5,
      comment: 'Perfect fit and beautiful design! The quality exceeded my expectations.',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      rating: 4,
      comment: 'Great dress for the occasion. The rental process was smooth and easy.',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Lisa Wong',
      rating: 5,
      comment: 'Absolutely gorgeous! Received so many compliments at the event.',
      date: '2 weeks ago'
    }
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const productWithDetails = {
      ...product,
      size: selectedSize,
      rentalDuration: rentalDuration,
      rentalDays: rentalDuration === '4' ? '4 days' : rentalDuration === '8' ? '8 days' : '20 days'
    };
    
    onAddToCart(productWithDetails);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={productImages[currentImageIndex]} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-1 ${
                  index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">(4.5 - 128 reviews)</span>
              </div>
              <button
                onClick={() => onAddToWishlist(product)}
                className={`p-2 rounded-full ${
                  isInWishlist 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-colors`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-6">${product.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Size</h3>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg font-medium ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Rental Duration</h3>
            <div className="flex space-x-2">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => setRentalDuration(duration)}
                  className={`px-4 py-2 border rounded-lg font-medium ${
                    rentalDuration === duration
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {duration} days
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              This elegant dress is perfect for special occasions. Crafted from premium materials with attention to detail, 
              it offers both comfort and style. The timeless design ensures you'll look sophisticated at any event.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Try On
            </button>
          </div>

          <div className="border-t pt-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Material:</span>
                <span className="font-medium">100% Silk</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Care:</span>
                <span className="font-medium">Dry Clean Only</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Availability:</span>
                <span className="font-medium text-green-600">In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {customerFeedback.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{review.name}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3">
                <h3 className="font-medium text-gray-900">{relatedProduct.name}</h3>
                <p className="text-gray-600">${relatedProduct.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductDetailDemo = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const sampleProduct = {
    id: 1,
    name: "Elegant Evening Dress",
    price: 320,
    image: "/api/placeholder/400/500"
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`Added ${product.name} (Size: ${product.size}, ${product.rentalDays}) to cart!`);
  };

  const handleAddToWishlist = (product) => {
    const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
    if (isAlreadyInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = wishlist.some(item => item.id === sampleProduct.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetail 
        product={sampleProduct}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        isInWishlist={isInWishlist}
        onClose={() => {}}
      />
    </div>
  );
};

export default ProductDetailDemo;