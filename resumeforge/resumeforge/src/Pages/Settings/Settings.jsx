import React, { useState, useRef } from 'react';
import styles from './Settings.module.css';

export const Settings = () => {
  const fileInputRef = useRef(null);


  // VERSAO TESTE
  const [formData, setFormData] = useState({
    name: 'Seu nome',
    email: 'seuemail@email.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profileImage: null,
    language: 'pt-BR',
    theme: 'light',
    notifications: true,
    emailUpdates: false,
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle image upload VERSAO TESTE
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit VERSAO TESTE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Validações
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      if (formData.newPassword && formData.newPassword.length < 6) {
        throw new Error('A nova senha deve ter pelo menos 6 caracteres');
      }

      // Simula salvamento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage({
        type: 'success',
        text: 'Configurações salvas com sucesso!',
      });

      // Limpa campos de senha
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Erro ao salvar configurações',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Configurações</h1>
          <p className={styles.subtitle}>
            Gerencie suas preferências e informações pessoais
          </p>
        </header>

        {/* Message */}
        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Profile Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Perfil</h2>
            <div className={styles.profileSection}>
              {/* Profile Image */}
              <div className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className={styles.profileImage}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>👤</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className={styles.uploadBtn}
                  onClick={() => fileInputRef.current?.click()}
                >
                  📷
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.uploadInput}
                />
              </div>

              {/* Form Fields */}
              <div className={styles.formFields}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nome Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Segurança</h2>
            <div className={styles.formFields}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Senha Atual</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                  >
                    {showPassword.current ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Nova Senha</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword.new ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() =>
                      setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                    }
                  >
                    {showPassword.new ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Confirmar Nova Senha</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                  >
                    {showPassword.confirm ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Preferências</h2>
            <div className={styles.preferencesList}>
              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <span className={styles.preferenceLabel}>Idioma</span>
                  <span className={styles.preferenceDescription}>
                    Escolha o idioma da interface
                  </span>
                </div>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="pt-BR">Português (BR)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <span className={styles.preferenceLabel}>Tema</span>
                  <span className={styles.preferenceDescription}>
                    Escolha entre claro ou escuro
                  </span>
                </div>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>

              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <span className={styles.preferenceLabel}>Notificações</span>
                  <span className={styles.preferenceDescription}>
                    Receba notificações no navegador
                  </span>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <span className={styles.preferenceLabel}>
                    Atualizações por E-mail
                  </span>
                  <span className={styles.preferenceDescription}>
                    Receba novidades e dicas por e-mail
                  </span>
                </div>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    name="emailUpdates"
                    checked={formData.emailUpdates}
                    onChange={handleInputChange}
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={() => window.history.back()}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};