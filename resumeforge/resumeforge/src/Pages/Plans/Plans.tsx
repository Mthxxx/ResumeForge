import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Plans.module.css';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: 'primary' | 'outline';
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Plano Gratuito',
    price: 'R$0',
    period: '/mês',
    features: [
      { text: '2 Modelos', included: true },
      { text: 'Download PDF', included: true },
      { text: 'Suporte Básico', included: true },
    ],
    buttonText: 'Começar Agora',
    buttonVariant: 'outline',
  },
  {
    id: 'monthly',
    name: 'Plano Mensal',
    price: 'R$19,90',
    period: '/mês',
    features: [
      { text: 'Todos os Modelos', included: true },
      { text: 'Currículos Ilimitados', included: true },
      { text: 'Suporte Prioritário', included: true },
    ],
    buttonText: 'Assinar Agora',
    buttonVariant: 'primary',
  },
  {
    id: 'annual',
    name: 'Plano Anual',
    price: 'R$159,90',
    period: '/ano',
    badge: 'Mais Economia',
    features: [
      { text: 'Tortúdos Ilimitados', included: true },
      { text: 'Download PDF', included: true },
      { text: 'Suporte Prioritário', included: true },
    ],
    buttonText: 'Assinar Agora',
    buttonVariant: 'primary',
    highlighted: true,
  },
  {
    id: 'professional',
    name: 'Plano Profissional',
    price: 'R$159,90',
    period: '',
    badge: 'Para Agências',
    features: [
      { text: 'Tudo do Plano Anual', included: true },
      { text: 'Modelos de Exclusivos', included: true },
      { text: 'Suporte Dedicado', included: true },
    ],
    buttonText: 'Assinar Agora',
    buttonVariant: 'primary',
  },
];

export const Plans: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      // Redireciona para templates (usuário pode começar gratuitamente)
      navigate('/templates');
    } else {
      // Redireciona para checkout
      navigate(`/checkout/${planId}`);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Escolha o plano ideal para impulsionar sua carreira</h1>
        <p className={styles.subtitle}>
          Planos pensados para todos os perfis e necessidades profissionais.
        </p>
      </header>

      {/* Plans Grid */}
      <div className={styles.plansGrid}>
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`${styles.planCard} ${
              plan.highlighted ? styles.highlighted : ''
            }`}
          >
            {/* Badge (se existir) */}
            {plan.badge && (
              <div className={styles.badge}>{plan.badge}</div>
            )}

            {/* Plan Header */}
            <div className={styles.planHeader}>
              <h2 className={styles.planName}>{plan.name}</h2>
              <div className={styles.priceContainer}>
                <span className={styles.price}>{plan.price}</span>
                {plan.period && (
                  <span className={styles.period}>{plan.period}</span>
                )}
              </div>
            </div>

            {/* Features List */}
            <ul className={styles.featuresList}>
              {plan.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span className={styles.featureText}>{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className={`${styles.ctaButton} ${styles[plan.buttonVariant]}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <span className={styles.faqIcon}>⭐</span>
          <h2 className={styles.faqTitle}>Perguntas frequentes (FAQ)</h2>
        </div>

        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>
              Lorem ipsum dolor de msertatee?
            </h3>
            <p className={styles.faqAnswer}>
              Commlpssumes om deEt tane malauto al dues de ummitea dolus
              nodan al culmtads donblagee dolus te ectoralhame fuo atcorta de
              foa comen.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>
              Lorem ipsum dolor de msertatee?
            </h3>
            <p className={styles.faqAnswer}>
              Comhlpssumes om dassere malauto al dues de ummitea dolus
              pnrelam al coen pcla enlago da doluer te actoralisssum.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};