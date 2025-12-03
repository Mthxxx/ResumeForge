import React, { useState } from 'react';
import styles from './Contato.module.css';

export const Contato: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simula envio (depois você conecta com backend)
    setTimeout(() => {
      console.log('Mensagem enviada:', formData);
      setStatus('success');
      setFormData({ email: '', subject: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className={styles.page}>
      {/* SEÇÃO SOBRE */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h1>Sobre a ResumeForge</h1>
          
          <p className={styles.mission}>
            Nossa missão é <strong>empoderar profissionais</strong> a construírem 
            currículos que abrem portas.
          </p>

          <div className={styles.aboutText}>
            <p>
              Desde o lançamento, nos dedicamos a simplificar o processo de criação 
              de currículos profissionais. Acreditamos que todos merecem ter acesso 
              a ferramentas de qualidade para destacar suas habilidades e experiências.
            </p>
            <p>
              Com templates modernos e intuitivos, ajudamos milhares de profissionais 
              a conquistarem suas oportunidades de carreira. Nosso compromisso é com 
              a excelência e a satisfação de cada usuário.
            </p>
          </div>

          {/* VALORES */}
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎯</div>
              <h3>Simplicidade</h3>
              <p>Criar currículos deve ser fácil e rápido</p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>✨</div>
              <h3>Qualidade</h3>
              <p>Templates profissionais e modernos</p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🚀</div>
              <h3>Resultados</h3>
              <p>Currículos que abrem portas</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO CONTATO */}
      <section className={styles.contactSection}>
        <div className={styles.contactContainer}>
          
          {/* LADO ESQUERDO - CITAÇÃO */}
          <div className={styles.contactQuote}>
            <div className={styles.quoteIcon}>"</div>
            <p className={styles.quoteText}>
              A melhor forma de prever o futuro é criá-lo. 
              Estamos aqui para ajudar você a construir o seu caminho profissional 
              com <span className={styles.quoteHighlight}>confiança e qualidade</span>.
            </p>
          </div>

          {/* LADO DIREITO - FORMULÁRIO */}
          <div className={styles.formWrapper}>
            <h2>Fale Conosco</h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="email"
                name="email"
                placeholder="Seu Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />

              <input
                type="text"
                name="subject"
                placeholder="Assunto"
                value={formData.subject}
                onChange={handleChange}
                required
                className={styles.input}
              />

              <textarea
                name="message"
                placeholder="Mensagem"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className={styles.textarea}
              />

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'ENVIANDO...' : 
                 status === 'success' ? '✓ ENVIADO!' : 
                 'ENVIAR MENSAGEM'}
              </button>
            </form>

            {/* REDES SOCIAIS */}
            <div className={styles.socialLinks}>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.socialIcon} ${styles.linkedin}`}
              >
                <span>in</span>
              </a>

              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.socialIcon} ${styles.facebook}`}
              >
                <span>f</span>
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.socialIcon} ${styles.instagram}`}
              >
                <span>📷</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};