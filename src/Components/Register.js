import React, { useState } from 'react';
import { auth } from './firebase'; // Firebase setup
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock, FaCloud } from 'react-icons/fa';

const Register = ({ onRegister, switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (pass !== confirmPass) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      toast.success('Registration Successful!');
      onRegister(userCredential.user.uid);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.info('An account with this email already exists. Redirecting to login...');
        setTimeout(() => {
          switchToLogin();
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error('Registration Failed! ' + error.message);
      }
    }
  };

  const pageStyle = {
    // Similar style to your login page (you'll likely want to define these in a separate CSS or shared object)
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
    // Similar style to your login page
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

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '15px',
    border: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s',
    boxShadow: '0 4px 12px rgba(0, 198, 255, 0.3)',
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
      <form onSubmit={handleRegister} style={formStyle}>
        <h2 style={headingStyle}><FaCloud /> Create an Account</h2>

        <div style={inputWrapperStyle}>
          <FaEnvelope style={inputIconStyle} />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputWrapperStyle}>
          <FaLock style={inputIconStyle} />
          <input
            type="password"
            placeholder="Enter your password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputWrapperStyle}>
          <FaLock style={inputIconStyle} />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Register
        </button>
        <p style={{ marginTop: '10px', textAlign: 'center', color: darkMode ? '#ccc' : '#555' }}>
          Already have an account? <button type="button" onClick={switchToLogin} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>Log in</button>
        </p>
      </form>
    </div>
  );
};

export default Register;