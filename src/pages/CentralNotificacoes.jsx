import React, { useState, useEffect } from 'react';
import { 
  Bell, Settings, Check, X, Filter, Search, Calendar, DollarSign,
  Camera, MessageSquare, Mail, Zap, Clock, AlertCircle, CheckCircle,
  XCircle, Info, Volume2, VolumeX, Smartphone, Monitor, Eye, EyeOff,
  RefreshCw, Download, Trash2, MoreVertical
} from 'lucide-react';

const CentralNotificacoes = () => {
  const [activeTab, setActiveTab] = useState('todas');
  const [notifications, setNotifications] = useState([]);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showConfig, setShowConfig] = useState(false);

  // Dados mockados para demonstração
  const [mockNotifications] = useState([
    {
      id: 'notif_1',
      title: 'Novo Agendamento - Ana Silva',
      message: 'Agendamento para Ensaio Gestante em 20/06/2025 às 14:00',
      type: 'agendamento',
      priority: 'alta',
      status: 'pendente',
      icon: Calendar,
      action_url: '/dashboard/agendamentos',
      created_at: new Date().toISOString(),
      data: { cliente_id: 1, ensaio_tipo: 'gestante' }
    },
    {
      id: 'notif_2',
      title: 'Pagamento Aprovado - R$ 850',
      message: 'Pagamento de Maria Santos para Ensaio Newborn foi aprovado',
      type: 'pagamento',
      priority: 'alta',
      status: 'lida',
      icon: DollarSign,
      action_url: '/configuracoes-pagamentos',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'notif_3',
      title: 'Lembrete: Ensaio Amanhã',
      message: 'Ensaio de Família com João Silva amanhã às 16:00',
      type: 'ensaio',
      priority: 'media',
      status: 'pendente',
      icon: Camera,
      action_url: '/dashboard/ensaios',
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'notif_4',
      title: 'Nova Mensagem WhatsApp',
      message: 'Carla Oliveira: Olá! Gostaria de agendar um ensaio gestante...',
      type: 'whatsapp',
      priority: 'media',
      status: 'pendente',
      icon: MessageSquare,
      action_url: '/setup-whatsapp',
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      id: 'notif_5',
      title: 'Backup Realizado',
      message: 'Backup automático do sistema foi concluído com sucesso',
      type: 'sistema',
      priority: 'baixa',
      status: 'lida',
      icon: CheckCircle,
      action_url: '/dashboard',
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      read_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const [mockConfig] = useState({
    agendamento_enabled: true,
    pagamento_enabled: true,
    ensaio_enabled: true,
    sistema_enabled: false,
    marketing_enabled: true,
    whatsapp_enabled: true,
    push_enabled: true,
    email_enabled: true,
    quiet_hours_enabled: true,
    quiet_hours_start: '22:00',
    quiet_hours_end: '08:00',
    sound_enabled: true,
    vibration_enabled: true
  });

  useEffect(() => {
    setNotifications(mockNotifications);
    setConfig(mockConfig);
  }, []);

  // Filtrar notificações
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    const matchesTab = activeTab === 'todas' || 
                      (activeTab === 'nao-lidas' && notification.status === 'pendente') ||
                      (activeTab === 'lidas' && notification.status === 'lida');
    
    return matchesSearch && matchesType && matchesPriority && matchesTab;
  });

  // Função para marcar como lida
  const markAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, status: 'lida', read_at: new Date().toISOString() }
        : notification
    ));
  };

  // Função para marcar todas como lidas
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => 
      notification.status === 'pendente'
        ? { ...notification, status: 'lida', read_at: new Date().toISOString() }
        : notification
    ));
  };

  // Função para deletar notificação
  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  // Função para enviar notificação de teste
  const sendTestNotification = () => {
    const testNotification = {
      id: `test_${Date.now()}`,
      title: 'Notificação de Teste',
      message: 'Esta é uma notificação de teste do sistema ERP Jéssica Santos',
      type: 'sistema',
      priority: 'media',
      status: 'pendente',
      icon: Zap,
      action_url: '/dashboard',
      created_at: new Date().toISOString()
    };
    
    setNotifications(prev => [testNotification, ...prev]);
  };

  // Função para atualizar configurações
  const updateConfig = (newConfig) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  // Função para formatar tempo relativo
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return `${Math.floor(diffInMinutes / 1440)}d atrás`;
  };

  // Função para obter cor da prioridade
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgente': return 'text-red-600 bg-red-100';
      case 'alta': return 'text-orange-600 bg-orange-100';
      case 'media': return 'text-blue-600 bg-blue-100';
      case 'baixa': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Função para obter ícone do tipo
  const getTypeIcon = (type) => {
    switch (type) {
      case 'agendamento': return Calendar;
      case 'pagamento': return DollarSign;
      case 'ensaio': return Camera;
      case 'whatsapp': return MessageSquare;
      case 'marketing': return Mail;
      case 'sistema': return Settings;
      default: return Bell;
    }
  };

  const unreadCount = notifications.filter(n => n.status === 'pendente').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg relative">
                <Bell className="w-6 h-6 text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Central de Notificações</h1>
                <p className="text-gray-600">Gerencie todas as notificações do sistema</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={sendTestNotification}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Zap className="w-4 h-4" />
                Teste
              </button>
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>
            </div>
          </div>

          {/* Filtros e Busca */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar notificações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os tipos</option>
              <option value="agendamento">Agendamentos</option>
              <option value="pagamento">Pagamentos</option>
              <option value="ensaio">Ensaios</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="marketing">Marketing</option>
              <option value="sistema">Sistema</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as prioridades</option>
              <option value="urgente">Urgente</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
            
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4" />
              Marcar Todas Lidas
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mt-6">
            {[
              { id: 'todas', label: 'Todas', count: notifications.length },
              { id: 'nao-lidas', label: 'Não Lidas', count: unreadCount },
              { id: 'lidas', label: 'Lidas', count: notifications.filter(n => n.status === 'lida').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Configurações Panel */}
        {showConfig && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações de Notificação</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipos de Notificação */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Tipos de Notificação</h4>
                <div className="space-y-3">
                  {[
                    { key: 'agendamento_enabled', label: 'Agendamentos', icon: Calendar },
                    { key: 'pagamento_enabled', label: 'Pagamentos', icon: DollarSign },
                    { key: 'ensaio_enabled', label: 'Ensaios', icon: Camera },
                    { key: 'whatsapp_enabled', label: 'WhatsApp', icon: MessageSquare },
                    { key: 'marketing_enabled', label: 'Marketing', icon: Mail },
                    { key: 'sistema_enabled', label: 'Sistema', icon: Settings }
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={config[item.key] || false}
                          onChange={(e) => updateConfig({ [item.key]: e.target.checked })}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Configurações Gerais */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Configurações Gerais</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.push_enabled || false}
                      onChange={(e) => updateConfig({ push_enabled: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Email</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.email_enabled || false}
                      onChange={(e) => updateConfig({ email_enabled: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {config.sound_enabled ? <Volume2 className="w-4 h-4 text-gray-600" /> : <VolumeX className="w-4 h-4 text-gray-600" />}
                      <span className="text-sm font-medium text-gray-700">Som</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.sound_enabled || false}
                      onChange={(e) => updateConfig({ sound_enabled: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Vibração</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.vibration_enabled || false}
                      onChange={(e) => updateConfig({ vibration_enabled: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Horário Silencioso */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Horário Silencioso</span>
                    <input
                      type="checkbox"
                      checked={config.quiet_hours_enabled || false}
                      onChange={(e) => updateConfig({ quiet_hours_enabled: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  
                  {config.quiet_hours_enabled && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Início</label>
                        <input
                          type="time"
                          value={config.quiet_hours_start || '22:00'}
                          onChange={(e) => updateConfig({ quiet_hours_start: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Fim</label>
                        <input
                          type="time"
                          value={config.quiet_hours_end || '08:00'}
                          onChange={(e) => updateConfig({ quiet_hours_end: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Notificações */}
        <div className="bg-white rounded-lg shadow-sm">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma notificação encontrada</h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== 'all' || filterPriority !== 'all' 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Você está em dia com todas as notificações!'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map(notification => {
                const Icon = notification.icon || getTypeIcon(notification.type);
                const isUnread = notification.status === 'pendente';
                
                return (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      isUnread ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        isUnread ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isUnread ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`text-sm font-medium ${
                              isUnread ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center gap-3 mt-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                getPriorityColor(notification.priority)
                              }`}>
                                {notification.priority}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTimeAgo(notification.created_at)}
                              </span>
                              <span className="text-xs text-gray-500 capitalize">
                                {notification.type}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {isUnread && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-blue-600"
                                title="Marcar como lida"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            
                            {notification.action_url && (
                              <button
                                onClick={() => window.location.href = notification.action_url}
                                className="p-1 text-gray-400 hover:text-blue-600"
                                title="Ver detalhes"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                            
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Deletar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CentralNotificacoes;

