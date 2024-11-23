// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      setUser(response.data);
    } catch (error) {
      console.error('Erro no login', error);
    }
  };

  // Estilos em JS
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#f4f6f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#333',
    },
    inputField: {
      width: '100%',
      padding: '12px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
    },
    submitButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s',
    },
    submitButtonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.inputField}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.inputField}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          style={{ ...styles.submitButton, ...(email && password ? {} : styles.submitButtonDisabled) }}
          type="submit"
          disabled={!email || !password}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
