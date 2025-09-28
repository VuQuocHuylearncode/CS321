import React from 'react';
import AuthLayout from './AuthLayout';

const ForgotPassword = ({ 
  formData, 
  handleInputChange, 
  navigateToScreen 
}) => {
  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('Forgot password attempted with:', formData.email);
    navigateToScreen('pinVerification');
  };

  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle="Enter your email here"
    >
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        
        <button 
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Continue
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;