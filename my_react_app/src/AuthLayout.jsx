import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
        {subtitle && (
          <p className="text-center text-gray-600 mb-8">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;