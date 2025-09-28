import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const YourWardrobe = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Skinny Fit Jeans',
      date: 'Rented: 25 May 2025',
      image: '/api/placeholder/150/200',
      price: '$120'
    },
    {
      id: 2,
      title: 'Blythe Top - Mint Green',
      date: 'Rented: 25 May 2025',
      image: '/api/placeholder/150/200',
      price: '$120'
    },
    {
      id: 3,
      title: 'Sleeve Straight T-shirt',
      date: 'Rented: 25 May 2025',
      image: '/api/placeholder/150/200',
      price: '$120'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handleEdit = (id) => {
    console.log(`Edit item ${id}`);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-amber-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Wardrobe</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover bg-gray-200"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.date}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">{item.price}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(item.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-2 mb-8">
          <button 
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {renderPagination()}
          <button 
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>

    </div>
  );
};

export default YourWardrobe;