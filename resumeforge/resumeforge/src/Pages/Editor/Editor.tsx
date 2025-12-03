import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Editor.module.css';

// Tipos para os dados do currículo
interface ResumeData {
  name: string;
  jobTitle: string;
  contato: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  experience: Array<{
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    period: string;
  }>;
  skills: string[];
  links: {
    github: string;
    portfolio: string;
    linkedin: string;
  };
}

export const Editor: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();

  // Estado inicial do currículo
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    contato: 'Experienced software engineer with a passion for creating innovative solutions.',
    contact: {
      email: 'johndoe@email.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
    },
    experience: [
      {
        id: '1',
        company: 'Tech Company',
        role: 'Senior Developer',
        period: '2020 - 2023',
        description: 'Led development of enterprise-level applications',
      },
    ],
    education: [
      {
        id: '1',
        institution: 'University Name',
        degree: "Bachelor's Degree in Computer Science",
        period: '2016 - 2020',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    links: {
      github: 'github.com/johndoe',
      portfolio: 'johndoe.com',
      linkedin: 'linkedin.com/in/johndoe',
    },
  });

  // Atualizar campos simples
  const handleInputChange = (field: keyof ResumeData, value: string) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  // Atualizar contato
  const handleContactChange = (field: keyof ResumeData['contact'], value: string) => {
    setResumeData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  // Atualizar links
  const handleLinkChange = (field: keyof ResumeData['links'], value: string) => {
    setResumeData((prev) => ({
      ...prev,
      links: { ...prev.links, [field]: value },
    }));
  };

  // Adicionar experiência
  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: '',
          role: '',
          period: '',
          description: '',
        },
      ],
    }));
  };

  // Atualizar experiência
  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  // Remover experiência
  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Adicionar educação
  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          institution: '',
          degree: '',
          period: '',
        },
      ],
    }));
  };

  // Atualizar educação
  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  // Remover educação
  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Adicionar skill
  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  // Atualizar skill
  const updateSkill = (index: number, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  };

  // Remover skill
  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Salvar currículo
  const handleSave = () => {
    // Aqui você salvaria no backend/localStorage
    console.log('Salvando currículo:', resumeData);
    alert('Currículo salvo com sucesso!');
  };

  // Exportar PDF
  const handleExportPDF = () => {
    // Aqui você implementaria a exportação para PDF
    console.log('Exportando para PDF...');
    alert('Funcionalidade de exportar PDF será implementada!');
  };

  return (
    <div className={styles.container}>
      {/* Header com botões de ação */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/templates')}>
          ← Voltar aos Templates
        </button>
        <div className={styles.actions}>
          <button className={styles.saveBtn} onClick={handleSave}>
            💾 Salvar Currículo
          </button>
          <button className={styles.exportBtn} onClick={handleExportPDF}>
            📄 Exportar PDF
          </button>
        </div>
      </header>

      {/* Layout Principal */}
      <div className={styles.editorLayout}>
        {/* LADO ESQUERDO - Preview do Currículo */}
        <div className={styles.previewSection}>
          <h3 className={styles.previewTitle}>Preview do seu Currículo</h3>
          <div className={styles.resumePreview}>
            {/* Header do Currículo */}
            <div className={styles.resumeHeader}>
              <h1 className={styles.resumeName}>{resumeData.name}</h1>
              <p className={styles.resumeJobTitle}>{resumeData.jobTitle}</p>
              <div className={styles.resumeContact}>
                <p>📧 {resumeData.contact.email}</p>
                <p>📱 {resumeData.contact.phone}</p>
                <p>📍 {resumeData.contact.location}</p>
              </div>
            </div>

            {/* contato */}
            <div className={styles.resumeSection}>
              <h3 className={styles.resumeSectionTitle}>contato</h3>
              <p className={styles.resumeText}>{resumeData.contato}</p>
            </div>

            {/* Experience */}
            <div className={styles.resumeSection}>
              <h3 className={styles.resumeSectionTitle}>EXPERIENCE</h3>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className={styles.resumeItem}>
                  <p className={styles.resumePeriod}>{exp.period}</p>
                  <p className={styles.resumeRole}>{exp.role}</p>
                  <p className={styles.resumeCompany}>{exp.company}</p>
                  <p className={styles.resumeText}>{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className={styles.resumeSection}>
              <h3 className={styles.resumeSectionTitle}>EDUCATION</h3>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className={styles.resumeItem}>
                  <p className={styles.resumePeriod}>{edu.period}</p>
                  <p className={styles.resumeRole}>{edu.degree}</p>
                  <p className={styles.resumeCompany}>{edu.institution}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className={styles.resumeSection}>
              <h3 className={styles.resumeSectionTitle}>SKILLS</h3>
              <div className={styles.skillsGrid}>
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className={styles.resumeSection}>
              <h3 className={styles.resumeSectionTitle}>LINKS</h3>
              <p className={styles.resumeText}>🔗 {resumeData.links.github}</p>
              <p className={styles.resumeText}>🌐 {resumeData.links.portfolio}</p>
              <p className={styles.resumeText}>💼 {resumeData.links.linkedin}</p>
            </div>
          </div>
        </div>

        {/* LADO DIREITO - Formulário de Edição */}
        <div className={styles.formSection}>
          <h3 className={styles.formTitle}>Editar seu Currículo</h3>

          {/* Informações Básicas */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome Completo</label>
            <input
              type="text"
              className={styles.input}
              value={resumeData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Título Profissional</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ex: Software Engineer"
              value={resumeData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Sobre</label>
            <textarea
              className={styles.textarea}
              rows={4}
              value={resumeData.contato}
              onChange={(e) => handleInputChange('contato', e.target.value)}
            />
          </div>

          {/* Contato */}
          <div className={styles.sectionDivider}>
            <h4 className={styles.sectionTitle}>Contato</h4>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={resumeData.contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Telefone</label>
            <input
              type="tel"
              className={styles.input}
              value={resumeData.contact.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Localização</label>
            <input
              type="text"
              className={styles.input}
              value={resumeData.contact.location}
              onChange={(e) => handleContactChange('location', e.target.value)}
            />
          </div>

          {/* Experiência */}
          <div className={styles.sectionDivider}>
            <h4 className={styles.sectionTitle}>Experiência</h4>
            <button className={styles.addBtn} onClick={addExperience}>
              + Adicionar
            </button>
          </div>

          {resumeData.experience.map((exp) => (
            <div key={exp.id} className={styles.itemCard}>
              <button
                className={styles.removeBtn}
                onClick={() => removeExperience(exp.id)}
              >
                ✕
              </button>
              <div className={styles.formGroup}>
                <label className={styles.label}>Empresa</label>
                <input
                  type="text"
                  className={styles.input}
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Cargo</label>
                <input
                  type="text"
                  className={styles.input}
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Período</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ex: 2020 - 2023"
                  value={exp.period}
                  onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Descrição</label>
                <textarea
                  className={styles.textarea}
                  rows={3}
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Educação */}
          <div className={styles.sectionDivider}>
            <h4 className={styles.sectionTitle}>Educação</h4>
            <button className={styles.addBtn} onClick={addEducation}>
              + Adicionar
            </button>
          </div>

          {resumeData.education.map((edu) => (
            <div key={edu.id} className={styles.itemCard}>
              <button
                className={styles.removeBtn}
                onClick={() => removeEducation(edu.id)}
              >
                ✕
              </button>
              <div className={styles.formGroup}>
                <label className={styles.label}>Instituição</label>
                <input
                  type="text"
                  className={styles.input}
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Curso</label>
                <input
                  type="text"
                  className={styles.input}
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Período</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ex: 2016 - 2020"
                  value={edu.period}
                  onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Skills */}
          <div className={styles.sectionDivider}>
            <h4 className={styles.sectionTitle}>Skills</h4>
            <button className={styles.addBtn} onClick={addSkill}>
              + Adicionar
            </button>
          </div>

          {resumeData.skills.map((skill, index) => (
            <div key={index} className={styles.skillInput}>
              <input
                type="text"
                className={styles.input}
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
              />
              <button className={styles.removeBtn} onClick={() => removeSkill(index)}>
                ✕
              </button>
            </div>
          ))}

          {/* Links */}
          <div className={styles.sectionDivider}>
            <h4 className={styles.sectionTitle}>Links</h4>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>GitHub</label>
            <input
              type="text"
              className={styles.input}
              value={resumeData.links.github}
              onChange={(e) => handleLinkChange('github', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Portfolio</label>
            <input
              type="text"
              className={styles.input}
              value={resumeData.links.portfolio}
              onChange={(e) => handleLinkChange('portfolio', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>LinkedIn</label>
            <input
              type="text"
              className={styles.input}
              value={resumeData.links.linkedin}
              onChange={(e) => handleLinkChange('linkedin', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};