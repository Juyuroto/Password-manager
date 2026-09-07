import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import '../assets/css/Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    try {
      await authService.register(email, password);
      navigate('/login', { state: { message: 'Compte créé avec succès ! Connectez-vous.' } });
    } catch (err) {
      setError(err.message || 'Erreur lors de la création du compte');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">Créer un compte</h1>
          <p className="signup-subtitle">Votre coffre-fort sécurisé vous attend</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <Input
            label="Adresse email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="exemple@domaine.com"
            required
          />
          <Input
            label="Mot de passe maître"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Input
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" isLoading={isLoading}>
            S'inscrire
          </Button>
        </form>

        <p className="signup-footer">
          Déjà un compte ?{' '}
          <Link to="/login" className="auth-link">Se connecter</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
