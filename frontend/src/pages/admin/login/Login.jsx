import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/login.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Substituído import.meta.env por process.env

// Função para validar se é um email
const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpar mensagens de erro antes de tentar o login

    if (!isValidEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {email,password},{
        headers: {
          'Content-Type': 'application/json',
        },  
      });  

      // Verificando o acesso e redirecionando para o Dashboard correspondente
      if (response.data.access.toLowerCase() === 'admin') {
        localStorage.setItem('acesso', 'admin');
        navigate('/dashboardAdmin');
      } else if (response.data.access.toLowerCase() === 'user') {
        localStorage.setItem('acesso', 'user');
        navigate('/dashboardUser');
      } else {
        setError('Acesso não autorizado.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Erro ao tentar fazer login.');
      } else {
        setError('Erro ao se conectar ao servidor.');
      }
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;