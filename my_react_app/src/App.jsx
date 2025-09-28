import React from 'react';
import Header from './Header';
import Footer from './Footer';

import LoginScreen from './LoginScreen';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import PinVerification from './PinVerification';
import NewPassword from './NewPassword';
import PasswordSuccess from './PasswordSuccess';
import UseAuth from './UseAuth';
import HomePage from './HomePage';
import WishList from './WishList';
import HowItWorks from './HowItWork';
import Brand from './Brand';
import Occasion from './Occasion';
import FilterSidebar from './FilterSidebar';
import Cart from './Cart';
import Profile from './Profile';

const App = () => {
  const {
    currentScreen,
    showPassword,
    formData,
    isAuthenticated,
    user,
    handleInputChange,
    handlePinChange,
    resetForm,
    navigateToScreen,
    togglePasswordVisibility,
    handleLogin,
    handleLogout,
    handleSignUp,
  } = UseAuth();

  const renderScreen = () => {
    const commonProps = {
      formData,
      handleInputChange,
      navigateToScreen,
    };

    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            {...commonProps}
            showPassword={showPassword}
            handleLogin={handleLogin}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        );
      case 'signup':
        return (
          <SignUp
            {...commonProps}
            showPassword={showPassword}
            handleSignUp={handleSignUp}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        );
      case 'forgotPassword':
        return <ForgotPassword {...commonProps} />;
      case 'pinVerification':
        return (
          <PinVerification
            {...commonProps}
            handlePinChange={handlePinChange}
          />
        );
      case 'newPassword':
        return <NewPassword {...commonProps} />;
      case 'passwordSuccess':
        return (
          <PasswordSuccess
            navigateToScreen={navigateToScreen}
            resetForm={resetForm}
          />
        );
      case 'homePage':
        return <HomePage navigateToScreen={navigateToScreen} />;
      case 'wishList':
        return <WishList navigateToScreen={navigateToScreen} />;
      case 'occasions':
        return <Occasion navigateToScreen={navigateToScreen} />;
      case 'howItWorks':
        return <HowItWorks navigateToScreen={navigateToScreen} />;
      case 'brands':
        return <Brand navigateToScreen={navigateToScreen} />;
      case 'oneTimeRental':
        return <FilterSidebar navigateToScreen={navigateToScreen} />;
      case 'profile':
        return <Profile navigateToScreen={navigateToScreen} user={user} />;
      case 'cart':
        return <Cart navigateToScreen={navigateToScreen} />;
      default:
        return (
          <LoginScreen
            {...commonProps}
            showPassword={showPassword}
            handleLogin={handleLogin}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {!['login', 'signup', 'forgotPassword', 'newPassword', 'passwordSuccess'].includes(
        currentScreen
      ) && <Header
        navigateToScreen={navigateToScreen}
        currentScreen={currentScreen}
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
      />}

      <div className="flex-1 p-4">{renderScreen()}</div>

      {!['login', 'signup', 'forgotPassword', 'newPassword', 'passwordSuccess'].includes(
        currentScreen
      ) && <Footer />}
    </div>
  );
};

export default App;