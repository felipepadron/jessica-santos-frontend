import React, { useState, useEffect } from 'react';
import './EditorTemplates.css';

const EditorTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'agendamento',
    message: '',
    variables: [],
    status: 'draft'
  });

  const templateCategories = [
    { value: 'agendamento', label: '📅 Agendamento', color: '#3B82F6' },
    { value: 'confirmacao', label: '✅ Confirmação', color: '#10B981' },
    { value: 'lembrete', label: '⏰ Lembrete', color: '#F59E0B' },
    { value: 'pagamento', label: '💰 Pagamento', color: '#8B5CF6' },
    { value: 'entrega', label: '📸 Entrega', color: '#EF4444' },
    { value: 'promocao', label: '🎉 Promoção', color: '#EC4899' }
  ];

  const predefinedVariables = [
    { name: 'nome_cliente', label: 'Nome do Cliente', example: 'Maria Silva' },
    { name: 'data_ensaio', label: 'Data do Ensaio', example: '25/06/2025' },
    { name: 'hora_ensaio', label: 'Hora do Ensaio', example: '14:00' },
    { name: 'tipo_ensaio', label: 'Tipo de Ensaio', example: 'Gestante' },
    { name: 'valor_ensaio', label: 'Valor do Ensaio', example: 'R$ 550' },
    { name: 'local_ensaio', label: 'Local do Ensaio', example: 'Estúdio' },
    { name: 'link_pagamento', label: 'Link de Pagamento', example: 'https://pay.link/123' },
    { name: 'link_galeria', label: 'Link da Galeria', example: 'https://galeria.link/456' }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    // Simular templates existentes
    const mockTemplates = [
      {
        id: 1,
        name: 'Confirmação de Agendamento',
        category: 'confirmacao',
        message: 'Olá {{nome_cliente}}! 😊\n\nSeu ensaio {{tipo_ensaio}} foi confirmado para {{data_ensaio}} às {{hora_ensaio}}.\n\nValor: {{valor_ensaio}}\nLocal: {{local_ensaio}}\n\nEstou ansiosa para nosso ensaio! 📸✨',
        variables: ['nome_cliente', 'tipo_ensaio', 'data_ensaio', 'hora_ensaio', 'valor_ensaio', 'local_ensaio'],
        status: 'approved',
        createdAt: '2025-06-10',
        usageCount: 45
      },
      {
        id: 2,
        name: 'Lembrete 24h',
        category: 'lembrete',
        message: 'Oi {{nome_cliente}}! ⏰\n\nLembrando que amanhã temos nosso ensaio {{tipo_ensaio}} às {{hora_ensaio}}.\n\nNão esqueça:\n• Chegar 15min antes\n• Trazer roupas extras\n• Estar bem descansada\n\nTe espero! 💕',
        variables: ['nome_cliente', 'tipo_ensaio', 'hora_ensaio'],
        status: 'approved',
        createdAt: '2025-06-08',
        usageCount: 32
      },
      {
        id: 3,
        name: 'Link de Pagamento',
        category: 'pagamento',
        message: 'Olá {{nome_cliente}}! 💰\n\nSegue o link para pagamento do seu ensaio {{tipo_ensaio}}:\n\n{{link_pagamento}}\n\nValor: {{valor_ensaio}}\n\nQualquer dúvida, estou aqui! 😊',
        variables: ['nome_cliente', 'tipo_ensaio', 'link_pagamento', 'valor_ensaio'],
        status: 'pending',
        createdAt: '2025-06-12',
        usageCount: 8
      }
    ];
    
    setTemplates(mockTemplates);
  };

  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setIsEditing(true);
    setNewTemplate({
      name: '',
      category: 'agendamento',
      message: '',
      variables: [],
      status: 'draft'
    });
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setNewTemplate(template);
    setIsEditing(true);
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.message) {
      alert('Preencha nome e mensagem do template');
      return;
    }

    // Extrair variáveis da mensagem
    const variableMatches = newTemplate.message.match(/\{\{([^}]+)\}\}/g);
    const extractedVariables = variableMatches 
      ? variableMatches.map(match => match.replace(/[{}]/g, ''))
      : [];

    const templateToSave = {
      ...newTemplate,
      variables: extractedVariables,
      id: selectedTemplate ? selectedTemplate.id : Date.now(),
      createdAt: selectedTemplate ? selectedTemplate.createdAt : new Date().toISOString().split('T')[0],
      usageCount: selectedTemplate ? selectedTemplate.usageCount : 0
    };

    if (selectedTemplate) {
      setTemplates(templates.map(t => t.id === selectedTemplate.id ? templateToSave : t));
    } else {
      setTemplates([...templates, templateToSave]);
    }

    setIsEditing(false);
    setSelectedTemplate(null);
    alert('Template salvo com sucesso!');
  };

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Tem certeza que deseja excluir este template?')) {
      setTemplates(templates.filter(t => t.id !== templateId));
    }
  };

  const insertVariable = (variableName) => {
    const variable = `{{${variableName}}}`;
    setNewTemplate({
      ...newTemplate,
      message: newTemplate.message + variable
    });
  };

  const getCategoryInfo = (category) => {
    return templateCategories.find(cat => cat.value === category) || templateCategories[0];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'rejected': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitado';
      default: return 'Rascunho';
    }
  };

  return (
    <div className="editor-templates">
      <div className="templates-header">
        <h1>💬 Editor de Templates WhatsApp</h1>
        <p>Crie e gerencie templates de mensagens para automação</p>
        <button className="btn-new-template" onClick={handleCreateNew}>
          ➕ Novo Template
        </button>
      </div>

      {!isEditing ? (
        <div className="templates-list">
          <div className="templates-grid">
            {templates.map(template => {
              const categoryInfo = getCategoryInfo(template.category);
              return (
                <div key={template.id} className="template-card">
                  <div className="template-header">
                    <div className="template-category" style={{ backgroundColor: categoryInfo.color }}>
                      {categoryInfo.label}
                    </div>
                    <div className="template-status" style={{ color: getStatusColor(template.status) }}>
                      {getStatusText(template.status)}
                    </div>
                  </div>
                  
                  <h3 className="template-name">{template.name}</h3>
                  
                  <div className="template-preview">
                    {template.message.substring(0, 100)}...
                  </div>
                  
                  <div className="template-info">
                    <span className="template-variables">
                      🔧 {template.variables.length} variáveis
                    </span>
                    <span className="template-usage">
                      📊 {template.usageCount} usos
                    </span>
                  </div>
                  
                  <div className="template-actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEditTemplate(template)}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="template-editor">
          <div className="editor-header">
            <h2>{selectedTemplate ? 'Editar Template' : 'Novo Template'}</h2>
            <div className="editor-actions">
              <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                ❌ Cancelar
              </button>
              <button className="btn-save" onClick={handleSaveTemplate}>
                💾 Salvar
              </button>
            </div>
          </div>

          <div className="editor-form">
            <div className="form-row">
              <div className="form-group">
                <label>📝 Nome do Template</label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  placeholder="Ex: Confirmação de Agendamento"
                />
              </div>

              <div className="form-group">
                <label>📂 Categoria</label>
                <select
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                >
                  {templateCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>💬 Mensagem do Template</label>
              <textarea
                value={newTemplate.message}
                onChange={(e) => setNewTemplate({...newTemplate, message: e.target.value})}
                placeholder="Digite sua mensagem aqui... Use {{variavel}} para inserir dados dinâmicos"
                rows={8}
              />
            </div>

            <div className="variables-section">
              <h3>🔧 Variáveis Disponíveis</h3>
              <p>Clique para inserir na mensagem:</p>
              <div className="variables-grid">
                {predefinedVariables.map(variable => (
                  <button
                    key={variable.name}
                    className="variable-btn"
                    onClick={() => insertVariable(variable.name)}
                  >
                    <span className="variable-name">{`{{${variable.name}}}`}</span>
                    <span className="variable-label">{variable.label}</span>
                    <span className="variable-example">Ex: {variable.example}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-section">
              <h3>👁️ Preview da Mensagem</h3>
              <div className="message-preview">
                <div className="whatsapp-message">
                  {newTemplate.message || 'Digite uma mensagem para ver o preview...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorTemplates;

