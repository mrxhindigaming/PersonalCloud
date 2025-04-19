import React, { useState } from "react";
import { auth, googleProvider } from './firebase'; // Ensure firebase is properly configured
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaGoogle, FaEnvelope, FaLock, FaCloud } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      toast.success('Login Successful!');
      onLogin(userCredential.user.uid); // Send the user's UID upon successful login
    } catch (error) {
      toast.error('Invalid credentials. Please check your email and password.');
      console.error("Login Error:", error); // Log the error for debugging
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome, ${result.user.displayName}`);
      onLogin(result.user.uid);
    } catch (error) {
      toast.error('Google sign-in failed!');
      console.error("Google Sign-in Error:", error); // Log the error
    }
  };

  const pageStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    background: darkMode
      ? 'radial-gradient(circle, #141e30, #243b55)'
      : 'linear-gradient(to right, #e0eafc, #cfdef3)',
    transition: 'all 0.5s ease-in-out',
    position: 'relative',
  };

  const formStyle = {
    background: darkMode ? '#1f2937' : '#ffffff',
    color: darkMode ? '#ffffff' : '#222',
    padding: '50px 40px',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    width: '90%',
    maxWidth: '420px',
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
  };

  const inputWrapperStyle = {
    position: 'relative',
    marginBottom: '15px',
  };

  const inputIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    color: darkMode ? '#ccc' : '#555',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 12px 12px 40px',
    background: darkMode ? '#374151' : '#f3f3f3',
    color: darkMode ? '#fff' : '#000',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '15px',
    transition: '0.3s ease',
    boxSizing: 'border-box',
  };

  const inputFocusStyle = {
    border: '1px solid #00e6e6',
    boxShadow: '0 0 6px #00e6e6',
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    color: '#fff',
    padding: '12px',
    width: '100%',
    fontSize: '16px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '15px',
    transition: 'transform 0.2s ease, box-shadow 0.2s',
    boxShadow: '0 4px 12px rgba(0, 198, 255, 0.3)',
  };

  const buttonHover = {
    transform: 'scale(1.03)',
    boxShadow: '0 6px 18px rgba(0, 198, 255, 0.4)',
  };

  const toggleStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    border: 'none',
    background: darkMode ? '#4fd1c5' : '#333',
    color: darkMode ? '#000' : '#fff',
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '20px',
    cursor: 'pointer',
  };

  const headingStyle = {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '25px',
    textAlign: 'center',
    color: darkMode ? '#00e6e6' : '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  };

  return (
    <div style={pageStyle}>
      <ToastContainer />
      <button onClick={() => setDarkMode(!darkMode)} style={toggleStyle}>
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>

      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={headingStyle}><FaCloud /> Welcome to MyCloud</h2>

        <div style={inputWrapperStyle}>
          <FaEnvelope style={inputIconStyle} />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              ...inputStyle,
              ...(email ? inputFocusStyle : {}),
            }}
          />
        </div>

        <div style={inputWrapperStyle}>
          <FaLock style={inputIconStyle} />
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Enter your password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{
              ...inputStyle,
              paddingRight: '40px',
              ...(pass ? inputFocusStyle : {}),
            }}
          />
          <span
            onClick={() => setShowPass(!showPass)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: darkMode ? '#ccc' : '#555',
            }}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" style={buttonStyle}>
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          style={{
            ...buttonStyle,
            background: '#de5246',
            marginTop: '10px',
            boxShadow: '0 4px 12px rgba(222, 82, 70, 0.4)',
          }}
        >
          <FaGoogle style={{ marginRight: '8px' }} />
        </button>
      </form>
    </div>
  );
}

export default Login;