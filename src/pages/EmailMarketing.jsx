import React, { useState, useEffect } from 'react';
import { 
  Mail, Send, Users, BarChart3, Settings, Plus, Edit, Trash2, Eye,
  Calendar, Target, Zap, TrendingUp, Clock, CheckCircle, XCircle,
  Filter, Search, Download, Upload, Copy, Palette, Layout, Type,
  Image, Link, AlignLeft, AlignCenter, AlignRight, Bold, Italic,
  Underline, List, ListOrdered, Quote, Code, Scissors, Undo, Redo
} from 'lucide-react';

const EmailMarketing = () => {
  const [activeTab, setActiveTab] = useState('campanhas');
  const [campaigns, setCampaigns] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [emailContent, setEmailContent] = useState('');

  // Dados mockados para demonstração
  const [mockCampaigns] = useState([
    {
      id: 'camp_1',
      name: 'Promoção Ensaio Gestante',
      subject: '🎉 50% OFF em Ensaios Gestante - Oferta Limitada!',
      status: 'enviada',
      type: 'promocional',
      sent_count: 245,
      open_count: 187,
      click_count: 89,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      sent_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'camp_2',
      name: 'Newsletter Março 2025',
      subject: '📸 Newsletter Março - Novidades e Dicas de Fotografia',
      status: 'agendada',
      type: 'newsletter',
      sent_count: 0,
      open_count: 0,
      click_count: 0,
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'camp_3',
      name: 'Boas-vindas Novos Clientes',
      subject: 'Bem-vinda ao mundo da fotografia, {nome}!',
      status: 'ativa',
      type: 'automacao',
      sent_count: 34,
      open_count: 31,
      click_count: 18,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const [mockTemplates] = useState([
    {
      id: 'temp_1',
      name: 'Boas-vindas Elegante',
      category: 'boas_vindas',
      description: 'Template elegante para dar boas-vindas a novos clientes',
      thumbnail: '/templates/boas-vindas-elegante.jpg',
      variables: ['nome', 'data_cadastro'],
      usage_count: 15
    },
    {
      id: 'temp_2',
      name: 'Promoção Dourada',
      category: 'promocional',
      description: 'Template promocional com tema dourado para ofertas especiais',
      thumbnail: '/templates/promocao-dourada.jpg',
      variables: ['nome', 'desconto', 'produto', 'data_limite'],
      usage_count: 8
    },
    {
      id: 'temp_3',
      name: 'Newsletter Moderna',
      category: 'newsletter',
      description: 'Template moderno para newsletters mensais',
      thumbnail: '/templates/newsletter-moderna.jpg',
      variables: ['nome', 'mes', 'ano', 'conteudo'],
      usage_count: 12
    }
  ]);

  const [mockStats] = useState({
    total_subscribers: 1247,
    active_campaigns: 3,
    avg_open_rate: 76.3,
    avg_click_rate: 24.8,
    monthly_growth: 18.5,
    revenue_attributed: 15750
  });

  useEffect(() => {
    setCampaigns(mockCampaigns);
    setTemplates(mockTemplates);
  }, []);

  // Função para obter cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'enviada': return 'text-green-600 bg-green-100';
      case 'agendada': return 'text-blue-600 bg-blue-100';
      case 'ativa': return 'text-purple-600 bg-purple-100';
      case 'rascunho': return 'text-gray-600 bg-gray-100';
      case 'pausada': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Função para calcular taxa de abertura
  const calculateOpenRate = (opens, sent) => {
    return sent > 0 ? ((opens / sent) * 100).toFixed(1) : '0.0';
  };

  // Função para calcular taxa de clique
  const calculateClickRate = (clicks, sent) => {
    return sent > 0 ? ((clicks / sent) * 100).toFixed(1) : '0.0';
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Email Marketing</h1>
                <p className="text-gray-600">Gerencie campanhas e automações de email</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowTemplateEditor(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Layout className="w-4 h-4" />
                Templates
              </button>
              <button
                onClick={() => setShowCampaignModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" />
                Nova Campanha
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Inscritos</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">{mockStats.total_subscribers.toLocaleString()}</p>
              <p className="text-xs text-blue-600">+{mockStats.monthly_growth}% este mês</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Campanhas</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 mt-1">{mockStats.active_campaigns}</p>
              <p className="text-xs text-purple-600">ativas</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Taxa Abertura</span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">{mockStats.avg_open_rate}%</p>
              <p className="text-xs text-green-600">média</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">Taxa Clique</span>
              </div>
              <p className="text-2xl font-bold text-orange-900 mt-1">{mockStats.avg_click_rate}%</p>
              <p className="text-xs text-orange-600">média</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600">Receita</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900 mt-1">R$ {mockStats.revenue_attributed.toLocaleString()}</p>
              <p className="text-xs text-yellow-600">atribuída</p>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-600">ROI</span>
              </div>
              <p className="text-2xl font-bold text-indigo-900 mt-1">485%</p>
              <p className="text-xs text-indigo-600">retorno</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mt-6">
            {[
              { id: 'campanhas', label: 'Campanhas', icon: Send },
              { id: 'templates', label: 'Templates', icon: Layout },
              { id: 'automacoes', label: 'Automações', icon: Zap },
              { id: 'listas', label: 'Listas', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'configuracoes', label: 'Configurações', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'campanhas' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Campanhas de Email</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar campanhas..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="all">Todos os status</option>
                    <option value="enviada">Enviadas</option>
                    <option value="agendada">Agendadas</option>
                    <option value="ativa">Ativas</option>
                    <option value="rascunho">Rascunhos</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{campaign.subject}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <span className="text-sm text-gray-500">Enviados</span>
                            <p className="text-lg font-semibold text-gray-900">{campaign.sent_count.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Taxa Abertura</span>
                            <p className="text-lg font-semibold text-green-600">
                              {calculateOpenRate(campaign.open_count, campaign.sent_count)}%
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Taxa Clique</span>
                            <p className="text-lg font-semibold text-blue-600">
                              {calculateClickRate(campaign.click_count, campaign.sent_count)}%
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">
                              {campaign.sent_at ? 'Enviado em' : campaign.scheduled_at ? 'Agendado para' : 'Criado em'}
                            </span>
                            <p className="text-sm text-gray-600">
                              {formatDate(campaign.sent_at || campaign.scheduled_at || campaign.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-blue-600" title="Ver detalhes">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-600" title="Duplicar">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600" title="Deletar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Templates de Email</h2>
                <button
                  onClick={() => setShowTemplateEditor(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                  Novo Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map(template => (
                  <div key={template.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Layout className="w-16 h-16 text-purple-400" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        <span className="text-xs text-gray-500">{template.usage_count} usos</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {template.category}
                        </span>
                        <div className="flex gap-1">
                          <button className="p-1 text-gray-400 hover:text-blue-600" title="Visualizar">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-purple-600" title="Usar">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'automacoes' && (
            <div className="p-6">
              <div className="text-center py-12">
                <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automações de Email</h3>
                <p className="text-gray-600 mb-6">Configure fluxos automatizados para diferentes cenários</p>
                <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mx-auto">
                  <Plus className="w-4 h-4" />
                  Criar Primeira Automação
                </button>
              </div>
            </div>
          )}

          {activeTab === 'listas' && (
            <div className="p-6">
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Listas de Contatos</h3>
                <p className="text-gray-600 mb-6">Organize seus contatos em listas segmentadas</p>
                <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mx-auto">
                  <Plus className="w-4 h-4" />
                  Criar Lista
                </button>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-6">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Detalhado</h3>
                <p className="text-gray-600 mb-6">Análise completa de performance das campanhas</p>
                <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mx-auto">
                  <BarChart3 className="w-4 h-4" />
                  Ver Relatórios
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Nova Campanha */}
        {showCampaignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Nova Campanha de Email</h2>
                <button
                  onClick={() => setShowCampaignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Campanha</label>
                  <input
                    type="text"
                    placeholder="Ex: Promoção Ensaio Gestante"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assunto do Email</label>
                  <input
                    type="text"
                    placeholder="Ex: 🎉 50% OFF em Ensaios Gestante - Oferta Limitada!"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Campanha</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="newsletter">Newsletter</option>
                      <option value="promocional">Promocional</option>
                      <option value="transacional">Transacional</option>
                      <option value="follow_up">Follow-up</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="">Selecionar template...</option>
                      {templates.map(template => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lista de Destinatários</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="all">Todos os inscritos (1.247)</option>
                    <option value="clients">Apenas clientes (456)</option>
                    <option value="prospects">Prospects (791)</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="send_type" value="now" defaultChecked />
                    <span className="text-sm text-gray-700">Enviar agora</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="send_type" value="schedule" />
                    <span className="text-sm text-gray-700">Agendar envio</span>
                  </label>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCampaignModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Criar Campanha
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configurações Tab */}
        {activeTab === 'configuracoes' && (
          <div className="space-y-6">
            <EmailConfiguracao />
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Configuração de Email
const EmailConfiguracao = () => {
  const [emailConfig, setEmailConfig] = useState({
    provider: 'sendgrid',
    sendgridApiKey: '',
    mailchimpApiKey: '',
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    fromEmail: 'jessica@jessicasantos.com',
    fromName: 'Jéssica Santos Fotografia'
  });
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    loadEmailConfig();
  }, []);

  const loadEmailConfig = async () => {
    try {
      const response = await fetch('/api/email/config', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setEmailConfig(prev => ({
          ...prev,
          provider: data.data.provider || 'sendgrid',
          fromEmail: data.data.fromEmail || 'jessica@jessicasantos.com',
          fromName: data.data.fromName || 'Jéssica Santos Fotografia'
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    }
  };

  const handleSaveConfig = async () => {
    setSaving(true);
    
    try {
      const response = await fetch('/api/email/configure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(emailConfig)
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Configuração salva com sucesso!');
      } else {
        setMessage('Erro ao salvar configuração: ' + data.message);
      }
    } catch (error) {
      setMessage('Erro ao salvar configuração: ' + error.message);
    }
    
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleTestConfig = async () => {
    if (!testEmail) {
      setMessage('Digite um email para teste');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ testEmail })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Email de teste enviado com sucesso!');
      } else {
        setMessage('Erro no teste: ' + data.message);
      }
    } catch (error) {
      setMessage('Erro no teste: ' + error.message);
    }
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Settings className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Configurações de Email</h2>
            <p className="text-gray-600">Configure seu provedor de email marketing</p>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`p-4 rounded-lg mb-4 ${
            message.includes('sucesso') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {message.includes('sucesso') ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              {message}
            </div>
          </div>
        )}

        {/* Provider Selection */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Provedor de Email
            </label>
            <select
              value={emailConfig.provider}
              onChange={(e) => setEmailConfig({...emailConfig, provider: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="sendgrid">SendGrid</option>
              <option value="mailchimp">Mailchimp</option>
              <option value="smtp">SMTP Personalizado</option>
            </select>
          </div>

          {/* SendGrid Configuration */}
          {emailConfig.provider === 'sendgrid' && (
            <div className="bg-blue-50 p-4 rounded-lg space-y-4">
              <h3 className="font-medium text-blue-900">Configuração SendGrid</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={emailConfig.sendgridApiKey}
                  onChange={(e) => setEmailConfig({...emailConfig, sendgridApiKey: e.target.value})}
                  placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Mailchimp Configuration */}
          {emailConfig.provider === 'mailchimp' && (
            <div className="bg-yellow-50 p-4 rounded-lg space-y-4">
              <h3 className="font-medium text-yellow-900">Configuração Mailchimp</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={emailConfig.mailchimpApiKey}
                  onChange={(e) => setEmailConfig({...emailConfig, mailchimpApiKey: e.target.value})}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          )}

          {/* SMTP Configuration */}
          {emailConfig.provider === 'smtp' && (
            <div className="bg-green-50 p-4 rounded-lg space-y-4">
              <h3 className="font-medium text-green-900">Configuração SMTP</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servidor SMTP
                  </label>
                  <input
                    type="text"
                    value={emailConfig.smtpHost}
                    onChange={(e) => setEmailConfig({...emailConfig, smtpHost: e.target.value})}
                    placeholder="smtp.gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Porta
                  </label>
                  <input
                    type="number"
                    value={emailConfig.smtpPort}
                    onChange={(e) => setEmailConfig({...emailConfig, smtpPort: parseInt(e.target.value)})}
                    placeholder="587"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usuário
                  </label>
                  <input
                    type="text"
                    value={emailConfig.smtpUser}
                    onChange={(e) => setEmailConfig({...emailConfig, smtpUser: e.target.value})}
                    placeholder="seu-email@gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={emailConfig.smtpPassword}
                    onChange={(e) => setEmailConfig({...emailConfig, smtpPassword: e.target.value})}
                    placeholder="sua-senha"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* From Configuration */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium text-gray-900">Configurações do Remetente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email do Remetente
                </label>
                <input
                  type="email"
                  value={emailConfig.fromEmail}
                  onChange={(e) => setEmailConfig({...emailConfig, fromEmail: e.target.value})}
                  placeholder="jessica@jessicasantos.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Remetente
                </label>
                <input
                  type="text"
                  value={emailConfig.fromName}
                  onChange={(e) => setEmailConfig({...emailConfig, fromName: e.target.value})}
                  placeholder="Jéssica Santos Fotografia"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Test Configuration */}
          <div className="bg-purple-50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium text-purple-900">Testar Configuração</h3>
            <div className="flex gap-3">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Digite um email para teste"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleTestConfig}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Testar
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveConfig}
              disabled={saving}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Salvar Configurações
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailMarketing;;

