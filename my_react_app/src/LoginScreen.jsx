import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from './AuthLayout';

const LoginScreen = ({ navigateToScreen }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Gọi API login backend Spring Boot
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        alert('Login failed: ' + errorMsg);
        return;
      }

      const userData = await response.json();
      console.log('Login success:', userData);

      if (userData.token) {
        localStorage.setItem('token', userData.token);
      }

      if (navigateToScreen) navigateToScreen('homePage');

    } catch (error) {
      console.error('Error logging in:', error);
      alert('Could not connect to server');
    }
  };

  return (
    <AuthLayout title={"Log in"} >
      <div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3.5 text-gray-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => navigateToScreen && navigateToScreen('signup')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Create an account
          </button>

          <button
            type="button"
            onClick={() => navigateToScreen && navigateToScreen('forgotPassword')}
            className="w-full text-gray-600 py-2 hover:text-green-600 transition-colors"
          >
            forgot password ?
          </button>

          <div className="text-center text-gray-500 my-4">Or</div>

          <button
            type="button"
            onClick={() => alert('Google login not implemented')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span className="text-blue-600">G</span>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Facebook login not implemented')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span className="text-blue-600">f</span>
            <span>Continue with Facebook</span>
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;