import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MeusCurriculos.module.css';

// Tipos
interface Curriculo {
  id: string;
  titulo: string;
  template: string;
  dataCriacao: string;
  preview: string;
}

// Dados fake para teste
const fakeCurriculos: Curriculo[] = [
  {
    id: '1',
    titulo: 'Currículo Moderno',
    template: 'moderno',
    dataCriacao: '10/10/2025',
    preview: '/previews/moderno.png',
  },
  {
    id: '2',
    titulo: 'John Doe - Minimalista',
    template: 'minimalista',
    dataCriacao: '12/11/2025',
    preview: '/previews/minimalista.png',
  },
  {
    id: '3',
    titulo: 'Creative',
    template: 'creative',
    dataCriacao: '01/12/2025',
    preview: '/previews/creative.png',
  },
];

export const MeusCurriculos: React.FC = () => {
  const navigate = useNavigate();
  const [curriculos, setCurriculos] = useState<Curriculo[]>(fakeCurriculos);

  // Handlers
  const handleEditar = (id: string) => {
    navigate(`/editor/${id}`);
  };

  const handleDuplicar = (curriculo: Curriculo) => {
    const novoCurriculo: Curriculo = {
      ...curriculo,
      id: Date.now().toString(),
      titulo: `${curriculo.titulo} (Cópia)`,
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
    };
    setCurriculos([...curriculos, novoCurriculo]);
  };

  const handleExcluir = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este currículo?')) {
      setCurriculos(curriculos.filter(c => c.id !== id));
    }
  };

  const handleExportarPDF = (id: string) => {
    alert(`Exportando currículo ${id} para PDF...`);
  };

  return (
    <div className={styles.pageContent}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Meus Currículos</h1>
        <p className={styles.pageSubtitle}>
          Aqui estão todos os seus currículos salvos e personalizados.
        </p>
      </div>

      {/* Grid de Currículos */}
      {curriculos.length > 0 ? (
        <div className={styles.curriculosGrid}>
          {curriculos.map((curriculo) => (
            <div key={curriculo.id} className={styles.curriculoCard}>
              {/* Preview */}
              <div className={styles.previewContainer}>
                <div className={styles.previewPlaceholder}>
                  <div className={styles.previewDoc}>
                    <div className={styles.previewHeader}>
                      <div className={styles.previewName}>John Doe</div>
                    </div>
                    <div className={styles.previewLines}>
                      <div className={styles.previewLine}></div>
                      <div className={styles.previewLine}></div>
                      <div className={styles.previewLine} style={{ width: '60%' }}></div>
                    </div>
                    <div className={styles.previewSection}>
                      <div className={styles.previewSectionTitle}></div>
                      <div className={styles.previewLine}></div>
                      <div className={styles.previewLine}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{curriculo.titulo}</h3>
                <span className={styles.cardDate}>{curriculo.dataCriacao}</span>
              </div>

              {/* Ações */}
              <div className={styles.cardActions}>
                <button 
                  className={styles.btnPrimary}
                  onClick={() => handleEditar(curriculo.id)}
                >
                  Editar
                </button>
                <button 
                  className={styles.btnSecondary}
                  onClick={() => handleDuplicar(curriculo)}
                >
                  Duplicar
                </button>
                <button 
                  className={styles.btnSecondary}
                  onClick={() => handleExportarPDF(curriculo.id)}
                >
                  Exportar PDF
                </button>
                <button 
                  className={styles.btnDanger}
                  onClick={() => handleExcluir(curriculo.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Estado vazio */
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📄</div>
          <h3 className={styles.emptyTitle}>Nenhum currículo ainda</h3>
          <p className={styles.emptyText}>
            Comece criando seu primeiro currículo profissional!
          </p>
          <button 
            className={styles.emptyBtn}
            onClick={() => navigate('/templates')}
          >
            Criar meu primeiro currículo
          </button>
        </div>
      )}
    </div>
  );
};
