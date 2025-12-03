import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span>© 2025 ResumeForge. Todos os direitos reservados.</span>
        
        <div className={styles.links}>
          <button className={styles.link}>Política de Privacidade</button>
          <button className={styles.link}>Termos de Serviço</button>
        </div>
      </div>
    </footer>
  );
};