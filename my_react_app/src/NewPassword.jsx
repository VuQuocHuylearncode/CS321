import React, { useState } from 'react';
import AuthLayout from './AuthLayout';

const NewPassword= ({ 
  formData, 
  handleInputChange, 
  navigateToScreen 
}) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validatePasswords = () => {
    const newErrors = {};
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,         
          newPassword: formData.password,
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        alert("Change password failed: " + msg);
      } else {
        alert("Password changed successfully!");
        navigateToScreen('passwordSuccess');
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (field, value) => {
    handleInputChange(field, value);
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <AuthLayout title="Reset Your Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            placeholder="New password"
            value={formData.password}
            onChange={(e) => handlePasswordChange('password', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.password ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.confirmPassword ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        
        <button 
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
          disabled={!formData.password || !formData.confirmPassword || loading}
        >
          {loading ? "Changing..." : "Change"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default NewPassword;