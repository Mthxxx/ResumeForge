import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Checkout.module.css';

const PLANS = {
  annual: {
    name: 'Plano Anual',
    price: 'R$19,90',
    period: '/ano',
    features: [
      'Todos os Modelos',
      'Download PDF',
      'Currículos Ilimitados',
      'Download PDF + Word',
      'Suporte Prioritário'
    ]
  },
  // Adicione outros planos se quiser
};

export const Checkout: React.FC = () => {
  const { planId = 'annual' } = useParams();
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix'>('credit');

  const plan = PLANS[planId as keyof typeof PLANS] || PLANS.annual;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Finalize Sua Assinatura</h1>
      <p className={styles.subtitle}>Seu Plano Selecionado</p>
      <div className={styles.content}>
        {/* Card do Plano */}
        <div className={styles.planCard}>
          <div className={styles.planHeader}>Seu Plano Selecionado</div>
          <h2 className={styles.planName}>{plan.name}</h2>
          <div className={styles.planPrice}>
            {plan.price} <span className={styles.period}>{plan.period}</span>
          </div>
          <ul className={styles.featuresList}>
            {plan.features.map((f, i) => (
              <li key={i} className={styles.featureItem}>✓ {f}</li>
            ))}
          </ul>
        </div>

        {/* Formulário de Pagamento */}
        <div className={styles.paymentCard}>
          <div className={styles.paymentHeader}>Informações de Pagamento</div>
          <div className={styles.paymentTabs}>
            <button
              className={`${styles.tabBtn} ${paymentMethod === 'credit' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('credit')}
            >
              Cartão de Crédito
            </button>
            <button
              className={`${styles.tabBtn} ${paymentMethod === 'pix' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('pix')}
            >
              PIX
            </button>
          </div>

          {paymentMethod === 'credit' ? (
            <form className={styles.form}>
              <input type="text" placeholder="Número do Cartão" className={styles.input} />
              <input type="text" placeholder="Nome no Cartão" className={styles.input} />
              <input type="text" placeholder="Validade (MM/AA)" className={styles.input} />
              <input type="text" placeholder="CVV" className={styles.input} />
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> Salvar informações para a próxima compra
              </label>
              <button type="button" className={styles.confirmBtn}>Confirmar Pagamento</button>
            </form>
          ) : (
            <div className={styles.pixBox}>
              <p>Escaneie o QR Code ou copie a chave PIX para pagar.</p>
              <div className={styles.pixPlaceholder}>[QR CODE]</div>
              <input type="text" value="chave-pix-exemplo@pagamento.com" readOnly className={styles.input} />
              <button type="button" className={styles.confirmBtn}>Confirmar Pagamento</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};