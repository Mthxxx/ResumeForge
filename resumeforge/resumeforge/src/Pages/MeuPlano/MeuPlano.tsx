import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './MeuPlano.module.css';

// Tipos
interface PlanoInfo {
  nome: string;
  tipo: 'gratuito' | 'pro' | 'premium';
  status: 'ativo' | 'expirado' | 'cancelado';
  preco: number;
  periodo: 'mensal' | 'anual';
  dataInicio: string;
  dataRenovacao: string;
}

interface UsoInfo {
  curriculosCriados: number;
  curriculosLimite: number;
  downloadsPDF: number;
  downloadsLimite: number;
  templatesLiberados: 'basicos' | 'todos';
}

interface Fatura {
  id: string;
  data: string;
  valor: number;
  status: 'pago' | 'pendente' | 'falhou';
}

// Dados fake para teste
const planoAtual: PlanoInfo = {
  nome: 'Plano Pro',
  tipo: 'pro',
  status: 'ativo',
  preco: 29.90,
  periodo: 'mensal',
  dataInicio: '15/10/2025',
  dataRenovacao: '15/01/2026',
};

const usoAtual: UsoInfo = {
  curriculosCriados: 3,
  curriculosLimite: 10,
  downloadsPDF: 6,
  downloadsLimite: 10,
  templatesLiberados: 'todos',
};

const historicoFaturas: Fatura[] = [
  { id: '1', data: '15/12/2025', valor: 29.90, status: 'pago' },
  { id: '2', data: '15/11/2025', valor: 29.90, status: 'pago' },
  { id: '3', data: '15/10/2025', valor: 29.90, status: 'pago' },
];

export const MeuPlano: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cupom, setCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(false);

  const handleAplicarCupom = () => {
    if (cupom.trim()) {
      setCupomAplicado(true);
      alert(`Cupom "${cupom}" aplicado com sucesso!`);
    }
  };

  const handleCancelarPlano = () => {
    if (window.confirm('Tem certeza que deseja cancelar seu plano? Você perderá acesso aos recursos premium.')) {
      alert('Plano cancelado. Você ainda terá acesso até a data de renovação.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <span className={`${styles.badge} ${styles.badgeAtivo}`}>Ativo</span>;
      case 'expirado':
        return <span className={`${styles.badge} ${styles.badgeExpirado}`}>Expirado</span>;
      case 'cancelado':
        return <span className={`${styles.badge} ${styles.badgeCancelado}`}>Cancelado</span>;
      default:
        return null;
    }
  };

  const getFaturaStatusBadge = (status: string) => {
    switch (status) {
      case 'pago':
        return <span className={`${styles.faturaStatus} ${styles.faturaPago}`}>✓ Pago</span>;
      case 'pendente':
        return <span className={`${styles.faturaStatus} ${styles.faturaPendente}`}>⏳ Pendente</span>;
      case 'falhou':
        return <span className={`${styles.faturaStatus} ${styles.faturaFalhou}`}>✗ Falhou</span>;
      default:
        return null;
    }
  };

  const calcularPorcentagem = (atual: number, limite: number) => {
    return Math.min((atual / limite) * 100, 100);
  };

  return (
    <div className={styles.pageContent}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Meu Plano</h1>
        <p className={styles.pageSubtitle}>
          Gerencie sua assinatura e acompanhe seu uso.
        </p>
      </div>

      {/* Card do Plano Atual */}
      <div className={styles.planoCard}>
        <div className={styles.planoHeader}>
          <div className={styles.planoInfo}>
            <div className={styles.planoIcon}>⭐</div>
            <div>
              <h2 className={styles.planoNome}>{planoAtual.nome}</h2>
              <p className={styles.planoPreco}>
                R$ {planoAtual.preco.toFixed(2).replace('.', ',')}
                <span>/{planoAtual.periodo === 'mensal' ? 'mês' : 'ano'}</span>
              </p>
            </div>
          </div>
          {getStatusBadge(planoAtual.status)}
        </div>

        <div className={styles.planoDatas}>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Início</span>
            <span className={styles.dataValue}>{planoAtual.dataInicio}</span>
          </div>
          <div className={styles.dataItem}>
            <span className={styles.dataLabel}>Próxima renovação</span>
            <span className={styles.dataValue}>{planoAtual.dataRenovacao}</span>
          </div>
        </div>

        <div className={styles.planoActions}>
          <button 
            className={styles.btnUpgrade}
            onClick={() => navigate('/plans')}
          >
            🔼 Fazer Upgrade
          </button>
          <button 
            className={styles.btnCancelar}
            onClick={handleCancelarPlano}
          >
            Cancelar Plano
          </button>
        </div>
      </div>

      {/* Seção de Uso */}
      <div className={styles.usoSection}>
        <h3 className={styles.sectionTitle}>📊 Seu Uso Este Mês</h3>
        
        <div className={styles.usoGrid}>
          {/* Currículos */}
          <div className={styles.usoCard}>
            <div className={styles.usoHeader}>
              <span className={styles.usoLabel}>Currículos Criados</span>
              <span className={styles.usoCount}>
                {usoAtual.curriculosCriados} de {usoAtual.curriculosLimite}
              </span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${calcularPorcentagem(usoAtual.curriculosCriados, usoAtual.curriculosLimite)}%` }}
              />
            </div>
          </div>

          {/* Downloads PDF */}
          <div className={styles.usoCard}>
            <div className={styles.usoHeader}>
              <span className={styles.usoLabel}>Downloads PDF</span>
              <span className={styles.usoCount}>
                {usoAtual.downloadsPDF} de {usoAtual.downloadsLimite}
              </span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${calcularPorcentagem(usoAtual.downloadsPDF, usoAtual.downloadsLimite)}%` }}
              />
            </div>
          </div>

          {/* Templates */}
          <div className={styles.usoCard}>
            <div className={styles.usoHeader}>
              <span className={styles.usoLabel}>Templates</span>
              <span className={styles.usoCount}>
                {usoAtual.templatesLiberados === 'todos' ? '✓ Todos liberados' : 'Apenas básicos'}
              </span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${styles.progressFull}`}
                style={{ width: usoAtual.templatesLiberados === 'todos' ? '100%' : '30%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cupom Promocional */}
      <div className={styles.cupomSection}>
        <h3 className={styles.sectionTitle}>🎁 Código Promocional</h3>
        <div className={styles.cupomForm}>
          <input
            type="text"
            className={styles.cupomInput}
            placeholder="Digite seu código..."
            value={cupom}
            onChange={(e) => setCupom(e.target.value)}
            disabled={cupomAplicado}
          />
          <button 
            className={styles.cupomBtn}
            onClick={handleAplicarCupom}
            disabled={cupomAplicado || !cupom.trim()}
          >
            {cupomAplicado ? '✓ Aplicado' : 'Aplicar'}
          </button>
        </div>
      </div>

      {/* Histórico de Faturas */}
      <div className={styles.historicoSection}>
        <h3 className={styles.sectionTitle}>📜 Histórico de Pagamentos</h3>
        
        <div className={styles.faturasList}>
          {historicoFaturas.map((fatura) => (
            <div key={fatura.id} className={styles.faturaItem}>
              <div className={styles.faturaInfo}>
                <span className={styles.faturaData}>{fatura.data}</span>
                <span className={styles.faturaValor}>
                  R$ {fatura.valor.toFixed(2).replace('.', ',')}
                </span>
              </div>
              {getFaturaStatusBadge(fatura.status)}
            </div>
          ))}
        </div>

        <button className={styles.verTodosBtn}>
          Ver todas as faturas →
        </button>
      </div>
    </div>
  );
};

