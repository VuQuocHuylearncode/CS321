import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold mb-4">Fitsera</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400">About us</a></li>
            <li><a href="#" className="hover:text-green-400">Blog</a></li>
            <li><a href="#" className="hover:text-green-400">Careers</a></li>
            <li><a href="#" className="hover:text-green-400">Press</a></li>
            <li><a href="#" className="hover:text-green-400">Contact</a></li>
            <li><a href="#" className="hover:text-green-400">Size Guide</a></li>
            <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-400">Returns</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow us</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400">Instagram</a></li>
            <li><a href="#" className="hover:text-green-400">Facebook</a></li>
            <li><a href="#" className="hover:text-green-400">Twitter</a></li>
            <li><a href="#" className="hover:text-green-400">Pinterest</a></li>
            <li><a href="#" className="hover:text-green-400">YouTube</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400">Help Center</a></li>
            <li><a href="#" className="hover:text-green-400">Size Guide</a></li>
            <li><a href="#" className="hover:text-green-400">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-green-400">Shipping Info</a></li>
            <li><a href="#" className="hover:text-green-400">FAQ</a></li>
            <li><a href="#" className="hover:text-green-400">Customer Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 Fitsera. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-green-400">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-green-400">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-green-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;