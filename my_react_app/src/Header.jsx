import React from 'react';
import { User, ShoppingCart, Search } from 'lucide-react';

const Header = ({ navigateToScreen, user, isAuthenticated, handleLogout, currentScreen }) => {
  return (
    <div style={{ backgroundColor: '#ADC178' }} className="px-6 py-4 flex items-center justify-between border-b">
      <div 
        className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigateToScreen(isAuthenticated ? 'homePage' : 'login')}
      >
        Fitsera
      </div>

      <nav style={{ color: '#000000' }} className="flex space-x-8">
        <button
          onClick={() => navigateToScreen('howItWorks')}
          className={`hover:text-green-800 transition-colors ${
            currentScreen === 'howItWorks' ? 'text-green-800 font-semibold' : ''
          }`}
        >
          How it works
        </button>
        
        <button
          type = "button"
          onClick={() => navigateToScreen('oneTimeRental')}
          className={`hover:text-green-800 transition-colors ${
            currentScreen === 'oneTimeRental' ? 'text-green-800 font-semibold' : ''
          }`}
        >
          One time rental
        </button>
        
        <button
          type = "button"
          onClick={() => navigateToScreen('brands')}
          className={`hover:text-green-800 transition-colors ${
            currentScreen === 'brands' ? 'text-green-800 font-semibold' : ''
          }`}>
          Brands
        </button>
        
        <button
          type = "button"

          onClick={() => navigateToScreen('occasions')}
          className={`hover:text-green-800 transition-colors ${
            currentScreen === 'occasions' ? 'text-green-800 font-semibold' : ''
          }`}
        >
          Occasion
        </button>
        
        <button
          type = "button"

          onClick={() => navigateToScreen('wishList')}
          className={`hover:text-green-800 transition-colors ${
            currentScreen === 'wishList' ? 'text-green-800 font-semibold' : ''
          }`}
        >
          Wishlist
        </button>
      </nav>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                navigateToScreen('searchResults');
              }
            }}
          />
          <Search 
            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" 
            onClick={() => navigateToScreen('searchResults')}
          />
        </div>

        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-green-200 px-3 py-2 rounded-md transition-colors"
              onClick={() => navigateToScreen('profile')}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="h-6 w-6 rounded-full" />
              ) : (
                <User className="h-6 w-6 text-gray-600" />
              )}
              <span className="text-sm text-gray-700 hidden md:block">
                {user?.firstName || 'Profile'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigateToScreen('profile')}
            className="cursor-pointer hover:bg-green-200 p-2 rounded-md transition-colors"
          >
            <User className="h-6 w-6 text-gray-600" />
          </button>
        )}

        <button
          onClick={() => navigateToScreen('cart')}
          className="cursor-pointer hover:bg-green-200 p-2 rounded-md transition-colors relative"
        >
          <ShoppingCart className="h-6 w-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;