import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: 'archerbarringer@gmail.com',
    mobile: '',
    password: '••••••••••••••',
    twoFactor: false
  });

  const addresses = [
    {
      type: 'HOME',
      address: '841 ABC at, Somewhere, 2300, India'
    },
    {
      type: 'WORK',
      address: '841 ABC at, Somewhere, 2300, India'
    },
    {
      type: 'WORK',
      address: '841 ABC at, Somewhere, 2300, India'
    },
    {
      type: 'WORK',
      address: '841 ABC at, Somewhere, 2300, India'
    }
  ];

  const handleEdit = (field) => {
    console.log(`Edit ${field}`);
  };

  const handleAddressAction = (index, action) => {
    console.log(`${action} address at index ${index}`);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled
                  />
                </div>
                <button 
                  onClick={() => handleEdit('name')}
                  className="ml-4 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled
                  />
                </div>
                <button 
                  onClick={() => handleEdit('email')}
                  className="ml-4 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile number</label>
                  <input
                    type="tel"
                    value={profileData.mobile}
                    placeholder="Enter mobile number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled
                  />
                </div>
                <button 
                  onClick={() => handleEdit('mobile')}
                  className="ml-4 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={profileData.password}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled
                  />
                </div>
                <button 
                  onClick={() => handleEdit('password')}
                  className="ml-4 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  Edit
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">2-step verification</label>
                  <p className="text-sm text-gray-500">Keep your account secure</p>
                </div>
                <button 
                  onClick={() => handleEdit('twoFactor')}
                  className="ml-4 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Addresses</h3>
            <div className="space-y-4">
              {addresses.map((address, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium mb-2">
                        {address.type}
                      </span>
                      <p className="text-sm text-gray-600">{address.address}</p>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      {index === 0 && (
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors">
                          Default
                        </button>
                      )}
                      <button 
                        onClick={() => handleAddressAction(index, 'use')}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                      >
                        Use
                      </button>
                      <button 
                        onClick={() => handleAddressAction(index, 'edit')}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Profile;