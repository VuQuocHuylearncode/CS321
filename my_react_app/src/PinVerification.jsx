import React, { useRef, useEffect } from 'react';
import AuthLayout from './AuthLayout';

const PinVerification = ({ 
  formData, 
  handlePinChange, 
  navigateToScreen 
}) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    handlePinChange(index, value);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !formData.pinCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pin = formData.pinCode.join('');
    
    if (pin.length === 6) {
      console.log('PIN verification attempted with:', pin);
      navigateToScreen('newPassword');
    }
  };

  const handleResendPIN = () => {
    console.log('Resend PIN requested');
  };

  const subtitle = (
    <div className="text-center text-gray-600 mb-8">
      <p className="mb-2">Enter the 6-digit PIN we just sent to your email</p>
      <p>
        Didn't get it?{' '}
        <button 
          onClick={handleResendPIN}
          className="text-green-600 hover:underline"
        >
          Resend PIN
        </button>
      </p>
    </div>
  );

  return (
    <AuthLayout title="Reset Your Password">
      {subtitle}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-2">
          {formData.pinCode.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              maxLength="1"
              pattern="[0-9]"
            />
          ))}
        </div>
        
        <button 
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
          disabled={formData.pinCode.join('').length !== 6}
        >
          Continue
        </button>
      </form>
    </AuthLayout>
  );
};

export default PinVerification;