import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MyRentals = () => {
  const rentals = [
    {
      id: 1,
      title: 'Skinny Fit Jeans',
      brand: 'Gucci',
      image: '/api/placeholder/120/150',
      rentalPeriod: 'May 26, 2025 - May 31, 2025',
      tracking: 'RTCGR570',
      status: 'shipped'
    },
    {
      id: 2,
      title: 'Skinny Fit Jeans',
      brand: 'Gucci',
      image: '/api/placeholder/120/150',
      rentalPeriod: 'May 26, 2025 - May 31, 2025',
      tracking: 'RTCGR570',
      status: 'shipped'
    },
    {
      id: 3,
      title: 'Skinny Fit Jeans',
      brand: 'Gucci',
      image: '/api/placeholder/120/150',
      rentalPeriod: 'May 26, 2025 - May 31, 2025',
      tracking: 'RTCGR570',
      status: 'shipped'
    }
  ];

  const handleTrackShipment = (id) => {
    console.log(`Track shipment for rental ${id}`);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Rentals</h1>
        
        <div className="space-y-6">
          {rentals.map((rental) => (
            <div key={rental.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <img 
                    src={rental.image} 
                    alt={rental.title}
                    className="w-24 h-32 object-cover rounded-lg bg-gray-200"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{rental.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{rental.brand}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Rental Period</p>
                      <p className="text-sm text-gray-600">{rental.rentalPeriod}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Tracking</p>
                      <p className="text-sm text-gray-600">{rental.tracking}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Status</p>
                      <p className="text-sm text-gray-600 capitalize">{rental.status}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleTrackShipment(rental.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Track Shipment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Return Instruction</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p> Keep the box and the shipment packaging. Additional charges if return package is not pack.</p>
            <p>Return items the same day the product reaches to your residential address. If return after 3 days,</p>
            <p>&nbsp;&nbsp;charges will be applied for every items.</p>
            <p> The prepaid return shipping label is inside the box for easy return.</p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default MyRentals;