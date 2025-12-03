import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Logo */}
        <button 
          className={styles.logoBtn}
          onClick={() => navigate('/')}
        >
          ResumeForge
        </button>

        {/* Botões da Direita */}
        <div className={styles.actions}>
          <button 
            className={styles.navLink}
            onClick={() => navigate('/plans')}
          >
            Planos
          </button>
          
          <button 
            className={styles.navLink}
            onClick={() => navigate('/templates')}
          >
            Templates
          </button>
          
          <button 
            className={styles.navLink}
            onClick={() => navigate('/contato')}
          >
            Contato
          </button>

          {/* Se estiver logado: mostra nome do usuário e Sair */}
          {isLoggedIn ? (
            <>
              {/* Nome do usuário */}
              <span className={styles.userName}>
                {user?.name || 'Usuário'}
              </span>

              {/* Botão Sair */}
              <button 
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              {/* Botão Login */}
              <button 
                className={styles.loginBtn}
                onClick={() => navigate('/login')}
              >
                Login
              </button>

              {/* Botão de Configuração - só aparece quando NÃO logado */}
              <button 
                className={styles.configBtn} 
                aria-label="Configurações"
                onClick={() => navigate('/config')}
              >
                <img 
                  src="/src/assets/config.svg" 
                  alt="Config" 
                  className={styles.icon} 
                />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
