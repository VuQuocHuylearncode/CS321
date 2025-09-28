import React from 'react';
import AuthLayout from './AuthLayout';

const PasswordSuccess = ({ navigateToScreen, resetForm }) => {
  const handleLoginRedirect = () => {
    resetForm(); 
    navigateToScreen('login');
  };

  return (
    <AuthLayout title="Your password successfully reset">
      <div className="text-center">
        <p className="text-gray-600 mb-8">Please login again</p>
        
        <button
          onClick={handleLoginRedirect}
          className="text-green-600 hover:underline font-medium text-lg"
        >
          Login
        </button>
      </div>
    </AuthLayout>
  );
};

export default PasswordSuccess;