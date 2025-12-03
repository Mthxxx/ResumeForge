import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Templates.module.css';

// Tipo para os templates
interface Template {
  id: string;
  name: string;
  category: 'moderno' | 'minimalista' | 'criativo';
  thumbnail: string;
}

// Mock de templates (depois você pode buscar de uma API)
const TEMPLATES: Template[] = [
  { id: '1', name: 'Moderno', category: 'moderno', thumbnail: '/templates/moderno.png' },
  { id: '2', name: 'Minimalista', category: 'minimalista', thumbnail: '/templates/minimalista.png' },
  { id: '3', name: 'Criativo', category: 'criativo', thumbnail: '/templates/criativo.png' },
  { id: '4', name: 'Criativo', category: 'criativo', thumbnail: '/templates/criativo2.png' },
  { id: '5', name: 'Moderno Pro', category: 'moderno', thumbnail: '/templates/moderno2.png' },
  { id: '6', name: 'Clean', category: 'minimalista', thumbnail: '/templates/clean.png' },
  { id: '7', name: 'Bold', category: 'criativo', thumbnail: '/templates/bold.png' },
  { id: '8', name: 'Classic', category: 'minimalista', thumbnail: '/templates/classic.png' },
];

type FilterType = 'all' | 'moderno' | 'minimalista' | 'criativo';

export const Templates: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filtrar templates
  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || template.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Navegar para o editor com o template selecionado
  const handleSelectTemplate = (templateId: string) => {
    navigate(`/editor/${templateId}`);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Encontre o modelo perfeito para sua carreira</h1>
        <p className={styles.subtitle}>
          Escolha entre centenas de modelos personalizáveis e garanta o emprego dos seus sonhos
        </p>
      </header>

      {/* Search & Filters */}
      <div className={styles.controls}>
        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Buscar templates..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'minimalista' ? styles.active : ''}`}
            onClick={() => setActiveFilter('minimalista')}
          >
            Minimalistas
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'criativo' ? styles.active : ''}`}
            onClick={() => setActiveFilter('criativo')}
          >
            Criativos
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className={styles.grid}>
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={styles.templateCard}
              onClick={() => handleSelectTemplate(template.id)}
            >
              {/* Thumbnail do Template */}
              <div className={styles.thumbnail}>
                {/* Aqui você pode usar uma imagem real ou um placeholder */}
                <div className={styles.placeholderTemplate}>
                  <div className={styles.placeholderHeader}></div>
                  <div className={styles.placeholderLine}></div>
                  <div className={styles.placeholderLine}></div>
                  <div className={styles.placeholderLine}></div>
                  <div className={styles.placeholderLine}></div>
                </div>
              </div>
              
              {/* Nome do Template */}
              <p className={styles.templateName}>{template.name}</p>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>Nenhum template encontrado</p>
        )}
      </div>
    </div>
  );
};