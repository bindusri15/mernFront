import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OwnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const validEmail = 'venkataraman229@gmail.com';
    const validPassword = 'Padmavathyflats';

    if (email === validEmail && password === validPassword) {
      localStorage.setItem('isOwnerAuthenticated', true);
      navigate('/owner/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h2 style={styles.heading}>Owner Login</h2>
        <div style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button
            onClick={handleLogin}
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#703F3F'; // Darker hover color
              e.target.style.color = '#F5F1ED'; // Change text color on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#8C5A50'; // Original button color
              e.target.style.color = '#FFFFFF'; // Original text color
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: "url('https://img.freepik.com/free-vector/watercolor-light-peach-background_23-2150293769.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: 'background-color 0.3s ease',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent overlay
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    border: '1px solid #703F3F', // Border for visibility
    color: '#703F3F',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add some shadow for depth
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',
    backgroundColor: '#8C5A50', // Original button color
    color: '#FFFFFF', // Original text color
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth transition
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '10px',
  },
};

export default OwnerLogin;
