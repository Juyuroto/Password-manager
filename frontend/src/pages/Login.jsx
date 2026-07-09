// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. On importe le hook
import { authService } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.login(name, password);
      
      localStorage.setItem('lockbox_token', response.token);
      
      console.log('Connexion réussie', response.user);
      
      navigate('/dashboard'); 
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">Lockbox</h1>
        <p className="login-subtitle">Accédez à votre coffre-fort</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Nom d'utilisateur"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrez votre nom"
            required={true}
          />
          
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required={true}
          />

          <Button type="submit" isLoading={isLoading}>
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;