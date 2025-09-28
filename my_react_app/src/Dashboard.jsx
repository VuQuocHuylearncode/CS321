import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
  const dashboardItems = [
    {
      title: "Your Orders",
      description: "Track, return, cancel an order, download invoices & buy again"
    },
    {
      title: "Profile",
      description: "Edit login, name, mobile number, email ID & password"
    },
    {
      title: "Your products",
      description: "Manage your memberships, view or change settings"
    },
    {
      title: "Customer Service",
      description: "How it works"
    },
    {
      title: "Wishlist",
      description: "Remove or edit your wishlist"
    },
    {
      title: "Build your wardrobe",
      description: "remove or add your wishlist"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">{item.title}</h3>
              <p className="text-gray-600 text-center text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default Dashboard;