import { useState } from 'react';

const UseAuth = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    pinCode: ['', '', '', '', '', '']
  });

  const handleLogin = () => {
    if (formData.email === 'huy@gmail.com' && formData.password === '12345678') {
      setCurrentScreen("home");
    } else {
      alert('Invalid email or password');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePinChange = (index, value) => {
    if (value.length <= 1) {
      const newPin = [...formData.pinCode];
      newPin[index] = value;
      setFormData(prev => ({
        ...prev,
        pinCode: newPin
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      pinCode: ['', '', '', '', '', '']
    });
  };

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    currentScreen,
    showPassword,
    formData,
    handleInputChange,
    handlePinChange,
    resetForm,
    navigateToScreen,
    togglePasswordVisibility,
    handleLogin
  };
};

export default UseAuth;