import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

// Dados fake de currículos para teste
const fakeCurriculos = [
  { id: '1', titulo: 'Currículo de Exemplo - Moderno', data: '10/10/2025' },
  { id: '2', titulo: 'Moderno 1', data: '12/12/2025' },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboardContent}>
      <h1 className={styles.pageTitle}>Dashboard</h1>

      {/* Card Criar Novo Currículo */}
      <div className={styles.createCard}>
        <div className={styles.createCardContent}>
          <h2 className={styles.createCardTitle}>Criar novo currículo</h2>
          <p className={styles.createCardText}>
            Comece a criar seu currículo em segundos escolhendo um template.
          </p>
          <button 
            className={styles.createBtn}
            onClick={() => navigate('/templates')}
          >
            Criar novo currículo
          </button>
        </div>
      </div>

      {/* Seção de Currículos Recentes */}
      <section className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>Seus currículos recentes</h2>

        {/* Tabela de Currículos */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Data de criação</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {fakeCurriculos.map((curriculo) => (
                <tr key={curriculo.id}>
                  <td>{curriculo.titulo}</td>
                  <td>{curriculo.data}</td>
                  <td>
                    <button 
                      className={styles.editBtn}
                      onClick={() => navigate(`/editor/${curriculo.id}`)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
