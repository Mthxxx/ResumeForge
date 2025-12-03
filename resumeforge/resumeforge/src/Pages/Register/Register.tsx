import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authApi, ApiError } from '../../services/api';
import styles from './Register.module.css';

// Google OAuth Client ID
const GOOGLE_CLIENT_ID = '779782752512-kmen8qshcn8s4bsanol5kmshtrnhgf9u.apps.googleusercontent.com';

// Declaração do tipo global do Google
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            config: {
              theme?: string;
              size?: string;
              width?: number;
              text?: string;
              shape?: string;
              locale?: string;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  // Estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoaded, setGoogleLoaded] = useState(false);

  // Redireciona se já estiver logado
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Carrega o script do Google Sign-In
  useEffect(() => {
    if (window.google) {
      initializeGoogle();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initializeGoogle();
    };
    document.head.appendChild(script);
  }, []);

  // Inicializa o Google Sign-In
  const initializeGoogle = () => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    const googleBtnContainer = document.getElementById('google-signup-btn');
    if (googleBtnContainer) {
      window.google.accounts.id.renderButton(googleBtnContainer, {
        theme: 'outline',
        size: 'large',
        width: 370,
        text: 'signup_with',
        shape: 'rectangular',
        locale: 'pt-BR',
      });
    }

    setGoogleLoaded(true);
  };

  // Callback do Google Sign-In
  const handleGoogleResponse = async (response: { credential: string }) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await authApi.googleLogin(response.credential);

      if (result.success && result.data) {
        login(result.data.user, result.data.token);
        navigate('/');
      } else {
        setError('Erro ao fazer cadastro com Google');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Erro ao conectar com o servidor');
      }
      console.error('Erro Google Signup:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Função de validação
  const validateForm = (): boolean => {
    if (!name.trim()) {
      setError('Por favor, informe seu nome completo');
      return false;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, informe um email válido');
      return false;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return false;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    if (!acceptTerms) {
      setError('Você precisa aceitar os Termos de Uso');
      return false;
    }

    return true;
  };

  // Função de submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await authApi.register({
        name: name.trim(),
        email: email.trim(),
        password
      });

      if (result.success && result.data) {
        login(result.data.user, result.data.token);
        navigate('/');
      } else {
        setError('Erro ao criar conta');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
      }
      console.error('Erro Register:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerCard}>
        {/* Título */}
        <div className={styles.header}>
          <span className={styles.icon}>🚀</span>
          <h1 className={styles.title}>Cadastre-se e Comece Agora!</h1>
          <p className={styles.subtitle}>
            Crie sua conta em segundos e acesse todas as ferramentas<br />
            para montar currículo perfeito.
          </p>
        </div>

        {/* Botão Google OAuth */}
        <div className={styles.oauthButtons}>
          {/* Placeholder enquanto carrega */}
          {!googleLoaded && (
            <button
              type="button"
              className={`${styles.oauthBtn} ${styles.google}`}
              disabled
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className={styles.oauthIcon}
              />
              Carregando...
            </button>
          )}
          {/* Container para o botão do Google - separado do placeholder */}
          <div 
            id="google-signup-btn" 
            className={styles.googleBtnContainer}
            style={{ 
              display: googleLoaded ? 'flex' : 'none', 
              justifyContent: 'center',
              minHeight: '44px'
            }}
          />
        </div>

        {/* Divisor */}
        <div className={styles.divider}>
          <span>CADASTRO RÁPIDO</span>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className={styles.errorBox}>
            <span className={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Formulário */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Nome */}
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Nome <span className={styles.required}>*</span>
            </label>
            <input
              id="name"
              type="text"
              className={styles.input}
              placeholder="Seu Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          {/* Senha */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha <span className={styles.required}>*</span>
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          {/* Confirmar Senha */}
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmar Senha <span className={styles.required}>*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.input}
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="new-password"
            />
          </div>

          {/* Checkbox Termos */}
          <div className={styles.checkboxGroup}>
            <input
              id="terms"
              type="checkbox"
              className={styles.checkbox}
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              disabled={isLoading}
            />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              Li e concordo em Termos de Uso e Política de Privacidade
            </label>
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}>⏳</span>
            ) : (
              'CADASTRAR'
            )}
          </button>
        </form>

        {/* Link para Login */}
        <div className={styles.link}>
          Já tenho conta? <Link to="/login">Entrar</Link>
        </div>
      </div>
    </div>
  );
};
