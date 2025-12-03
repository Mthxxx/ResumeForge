import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DashboardSidebar } from './DashboardSidebar';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // Se não estiver logado, renderiza só o conteúdo
  if (!isLoggedIn) {
    return <>{children}</>;
  }

  // Se estiver logado, renderiza com o sidebar
  return (
    <div className={styles.layoutContainer}>
      <DashboardSidebar />
      <div className={styles.contentArea}>
        {children}
      </div>
    </div>
  );
};

