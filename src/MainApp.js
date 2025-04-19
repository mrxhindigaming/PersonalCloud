import React, { useState } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import App from './App';

const MainApp = () => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoginPage, setIsLoginPage] = useState(false); // Track whether login or register is being displayed

  const handleLogin = (token) => {
    setAuthToken(token);
  };

  const handleRegister = (token) => {
    setAuthToken(token);
  };

  const switchToRegister = () => {
    setIsLoginPage(false); // Show the Register page
  };

  const switchToLogin = () => {
    setIsLoginPage(true); // Show the Login page
  };

  return (
    <>
      {authToken ? (
        <App />
      ) : isLoginPage ? (
        <Login onLogin={handleLogin} switchToRegister={switchToRegister} />
      ) : (
        <Register onRegister={handleRegister} switchToLogin={switchToLogin} />
      )}
    </>
  );
};

export default MainApp;
