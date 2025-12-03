import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  // Estados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redireciona se já estiver logado
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  // Função de submit do formulário - MODO TESTE (aceita qualquer coisa)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validação básica
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      setError('Email inválido');
      return;
    }

    setIsLoading(true);

    // Simula um pequeno delay como se fosse uma API real
    await new Promise(resolve => setTimeout(resolve, 500));

    // MODO TESTE: Cria um usuário fake com os dados informados
    const fakeUser = {
      id: '1',
      email: email,
      name: email.split('@')[0], // Usa parte do email como nome
      provider: 'local'
    };

    const fakeToken = 'fake-token-' + Date.now();

    // Faz login e redireciona para o Dashboard
    login(fakeUser, fakeToken);
    navigate('/dashboard');

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {/* Título */}
        <div className={styles.header}>
          <h1 className={styles.title}>Bem-vindo de volta!</h1>
          <p className={styles.subtitle}>
            Faça login para continuar criando currículos incríveis
          </p>
        </div>

        {/* Badge de Modo Teste */}
        <div className={styles.testModeBadge}>
          🧪 Modo Teste - Use qualquer email/senha
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
          {/* Campo Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          {/* Campo Senha */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {/* Link "Esqueceu a senha?" */}
          <div className={styles.forgotPassword}>
            <Link to="/recuperar-senha" className={styles.forgotLink}>
              Esqueceu a senha?
            </Link>
          </div>

          {/* Botão de Submit */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinner}>⏳</span>
            ) : (
              'ENTRAR'
            )}
          </button>
        </form>

        {/* Link para cadastro */}
        <div className={styles.link}>
          Não tem uma conta?{' '}
          <Link to="/cadastro">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};
