import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from './AuthLayout';

const SignUp = ({
  formData,
  showPassword,
  handleInputChange,
  togglePasswordVisibility,
  navigateToScreen,
}) => {
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Đăng ký thành công:', data);

        if (navigateToScreen) navigateToScreen('login');
      } else if (response.status === 409) {
        alert('Email đã tồn tại!');
      } else {
        const errorMsg = await response.text();
        alert('Đăng ký thất bại: ' + errorMsg);
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      alert('Không thể kết nối tới server.');
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup attempted');
  };

  const handleFacebookSignup = () => {
    console.log('Facebook signup attempted');
  };

  return (
    <AuthLayout title="Sign up">
      <form onSubmit={handleSignup} className="space-y-4">
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
            type={showPassword ? 'text' : 'password'}
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

        <input
          type="tel"
          placeholder="Phone number"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Sign up
        </button>

        <button
          type="button"
          onClick={() => navigateToScreen('forgotPassword')}
          className="w-full text-gray-600 py-2 hover:text-green-600 transition-colors"
        >
          forgot password ?
        </button>

        <div className="text-center text-gray-500 my-4">Or</div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <span className="text-blue-600">G</span>
          <span>Continue with Google</span>
        </button>

        <button
          type="button"
          onClick={handleFacebookSignup}
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <span className="text-blue-600">f</span>
          <span>Continue with Facebook</span>
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;