import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

// Importe a Navbar (ajuste o caminho se necessário)
import { Navbar } from '../../components/Navbar';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Função para navegar para Templates
  const handleGetStarted = () => {
    navigate('/templates');
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          {/* Lado Esquerdo - Texto */}
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Crie seu currículo profissional em poucos minutos
            </h1>
            <p className={styles.subtitle}>
              Escolha entre centenas de modelos personalizáveis e garanta o emprego dos seus sonhos
            </p>
            <button 
              className={styles.ctaButton}
              onClick={handleGetStarted}
            >
              Criar currículo
            </button>
          </div>

          {/* Lado Direito - Preview do Template */}
          <div className={styles.heroPreview}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <h3>John Doe</h3>
                <p className={styles.previewContact}>
                  📧 johndoe@email.com<br/>
                  📱 (555) 123-4567
                </p>
              </div>

              <div className={styles.previewSection}>
                <h4>PROFILE</h4>
                <p className={styles.previewText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className={styles.previewSection}>
                <h4>EXPERIENCE</h4>
                <div className={styles.previewItem}>
                  <p className={styles.previewDate}>2020 - 2023</p>
                  <p className={styles.previewRole}>Senior Developer</p>
                  <p className={styles.previewText}>
                    Led development of enterprise-level applications
                  </p>
                </div>
              </div>

              <div className={styles.previewSection}>
                <h4>EDUCATION</h4>
                <div className={styles.previewItem}>
                  <p className={styles.previewDate}>2016 - 2020</p>
                  <p className={styles.previewRole}>Bachelor's Degree</p>
                  <p className={styles.previewText}>Computer Science</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section className={styles.templatesSection}>
        <h2 className={styles.sectionTitle}>Escolha um modelo
        </h2>
        <div className={styles.templatesGrid}>
          {/* Template 1 */}
          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div className={styles.miniTemplate}>
                <div className={styles.miniHeader}></div>
                <div className={styles.miniLine}></div>
                <div className={styles.miniLine}></div>
                <div className={styles.miniLine}></div>
              </div>
            </div>
            <p className={styles.templateName}>Profissional</p>
          </div>

          {/* Template 2 */}
          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div className={styles.miniTemplate}>
                <div className={styles.miniHeader}></div>
                <div className={styles.miniLine}></div>
                <div className={styles.miniLine}></div>
                <div className={styles.miniLine}></div>
              </div>
            </div>
            <p className={styles.templateName}>Moderno</p>
          </div>

          {/* Template 3 */}
          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div className={styles.miniTemplate}>
                <div className={styles.miniHeader}></div>
                <div className={styles.miniLine}></div>
                <div className={styles.miniLine}></div>
                <div className={styles.miniLine}></div>
              </div>
            </div>
            <p className={styles.templateName}>Criativo</p>
          </div>

          {/* Template 4 */}
          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div className={styles.miniTemplate}>
                <div className={styles.miniHeader}></div>
                <div className={styles.miniLine}></div>
                <div className={styles.miniLine}></div>
                <div className={styles.miniLine}></div>
              </div>
            </div>
            <p className={styles.templateName}>Minimalista</p>
          </div>
        </div>

        <button 
          className={styles.viewAllButton}
          onClick={handleGetStarted}
        >
          Todos os modelos
        </button>
      </section>
    </div>
  );
};