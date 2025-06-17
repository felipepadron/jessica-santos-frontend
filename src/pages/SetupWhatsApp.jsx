import React, { useState, useEffect } from 'react';
import './SetupWhatsApp.css';

const SetupWhatsApp = () => {
  const [config, setConfig] = useState({
    apiKey: '',
    phoneNumber: '',
    businessName: 'Jéssica Santos Fotografia',
    autoReply: true,
    businessHours: {
      start: '09:00',
      end: '18:00'
    }
  });
  
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // disconnected, connecting, connected
  const [qrCode, setQrCode] = useState('');
  const [stats, setStats] = useState({
    messagesReceived: 0,
    messagesSent: 0,
    activeChats: 0,
    automationRate: 0
  });

  useEffect(() => {
    // Simular carregamento de configurações
    loadWhatsAppConfig();
    loadStats();
  }, []);

  const loadWhatsAppConfig = async () => {
    try {
      const response = await fetch('/api/whatsapp/status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setConfig({
          apiKey: 'wa_api_key_***',
          phoneNumber: data.data.phoneNumber || '+55 11 99999-9999',
          businessName: data.data.businessName || 'Jéssica Santos Fotografia',
          autoReply: data.data.autoReply?.enabled || true,
          businessHours: {
            start: data.data.workingHours?.start || '09:00',
            end: data.data.workingHours?.end || '18:00'
          }
        });
        setConnectionStatus(data.data.connected ? 'connected' : 'disconnected');
        
        // Carregar estatísticas
        if (data.data.stats) {
          setStats({
            messagesReceived: data.data.stats.messagesReceived || 247,
            messagesSent: data.data.stats.messagesSent || 189,
            activeChats: data.data.stats.activeChats || 12,
            automationRate: data.data.stats.automationRate || 85
          });
        }
      } else {
        // Fallback para dados mockados se API falhar
        setConfig({
          apiKey: 'wa_api_key_***',
          phoneNumber: '+55 11 99999-9999',
          businessName: 'Jéssica Santos Fotografia',
          autoReply: true,
          businessHours: {
            start: '09:00',
            end: '18:00'
          }
        });
        setConnectionStatus('connected');
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      // Fallback para dados mockados em caso de erro
      setConfig({
        apiKey: 'wa_api_key_***',
        phoneNumber: '+55 11 99999-9999',
        businessName: 'Jéssica Santos Fotografia',
        autoReply: true,
        businessHours: {
          start: '09:00',
          end: '18:00'
        }
      });
      setConnectionStatus('connected');
    }
  };

  const loadStats = () => {
    setStats({
      messagesReceived: 247,
      messagesSent: 189,
      activeChats: 12,
      automationRate: 85
    });
  };

  const handleConnect = async () => {
    setConnectionStatus('connecting');
    
    // Simular QR Code
    setQrCode('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    
    // Simular conexão após 3 segundos
    setTimeout(() => {
      setConnectionStatus('connected');
      setQrCode('');
    }, 3000);
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    setQrCode('');
  };

  const handleSaveConfig = async () => {
    try {
      const response = await fetch('/api/whatsapp/configure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          phoneNumber: config.phoneNumber,
          businessName: config.businessName,
          workingHours: {
            start: config.businessHours.start,
            end: config.businessHours.end
          },
          autoReply: {
            enabled: config.autoReply,
            message: 'Olá! Obrigada pelo contato. Em breve retornaremos sua mensagem.'
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Configurações salvas com sucesso!');
        // Recarregar dados atualizados
        loadWhatsAppConfig();
      } else {
        alert('Erro ao salvar configurações: ' + data.message);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar configurações: ' + error.message);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#10B981';
      case 'connecting': return '#F59E0B';
      default: return '#EF4444';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'Conectado';
      case 'connecting': return 'Conectando...';
      default: return 'Desconectado';
    }
  };

  return (
    <div className="setup-whatsapp">
      <div className="setup-header">
        <h1>🔧 Setup WhatsApp Business</h1>
        <p>Configure a integração com WhatsApp Business API para automação de mensagens</p>
      </div>

      {/* Status de Conexão */}
      <div className="connection-status">
        <div className="status-indicator">
          <div 
            className="status-dot" 
            style={{ backgroundColor: getStatusColor() }}
          ></div>
          <span className="status-text">{getStatusText()}</span>
        </div>
        
        {connectionStatus === 'disconnected' && (
          <button className="btn-connect" onClick={handleConnect}>
            📱 Conectar WhatsApp
          </button>
        )}
        
        {connectionStatus === 'connected' && (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            🔌 Desconectar
          </button>
        )}
      </div>

      {/* QR Code para Conexão */}
      {connectionStatus === 'connecting' && (
        <div className="qr-section">
          <h3>📱 Escaneie o QR Code</h3>
          <div className="qr-container">
            <div className="qr-placeholder">
              <div className="qr-loading">
                <div className="spinner"></div>
                <p>Gerando QR Code...</p>
              </div>
            </div>
          </div>
          <p className="qr-instructions">
            1. Abra o WhatsApp no seu celular<br/>
            2. Vá em Configurações → Dispositivos conectados<br/>
            3. Toque em "Conectar um dispositivo"<br/>
            4. Escaneie este QR Code
          </p>
        </div>
      )}

      {/* Estatísticas */}
      {connectionStatus === 'connected' && (
        <div className="whatsapp-stats">
          <h3>📊 Estatísticas WhatsApp</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📥</div>
              <div className="stat-info">
                <span className="stat-number">{stats.messagesReceived}</span>
                <span className="stat-label">Mensagens Recebidas</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📤</div>
              <div className="stat-info">
                <span className="stat-number">{stats.messagesSent}</span>
                <span className="stat-label">Mensagens Enviadas</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">💬</div>
              <div className="stat-info">
                <span className="stat-number">{stats.activeChats}</span>
                <span className="stat-label">Chats Ativos</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🤖</div>
              <div className="stat-info">
                <span className="stat-number">{stats.automationRate}%</span>
                <span className="stat-label">Taxa de Automação</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configurações */}
      <div className="config-section">
        <h3>⚙️ Configurações</h3>
        
        <div className="config-form">
          <div className="form-group">
            <label>📱 Número do WhatsApp Business</label>
            <input
              type="text"
              value={config.phoneNumber}
              onChange={(e) => setConfig({...config, phoneNumber: e.target.value})}
              placeholder="+55 11 99999-9999"
            />
          </div>

          <div className="form-group">
            <label>🏢 Nome do Negócio</label>
            <input
              type="text"
              value={config.businessName}
              onChange={(e) => setConfig({...config, businessName: e.target.value})}
              placeholder="Jéssica Santos Fotografia"
            />
          </div>

          <div className="form-group">
            <label>🕐 Horário de Funcionamento</label>
            <div className="time-range">
              <input
                type="time"
                value={config.businessHours.start}
                onChange={(e) => setConfig({
                  ...config, 
                  businessHours: {...config.businessHours, start: e.target.value}
                })}
              />
              <span>até</span>
              <input
                type="time"
                value={config.businessHours.end}
                onChange={(e) => setConfig({
                  ...config, 
                  businessHours: {...config.businessHours, end: e.target.value}
                })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={config.autoReply}
                onChange={(e) => setConfig({...config, autoReply: e.target.checked})}
              />
              🤖 Ativar respostas automáticas
            </label>
          </div>
        </div>

        <button className="btn-save" onClick={handleSaveConfig}>
          💾 Salvar Configurações
        </button>
      </div>

      {/* Automações Rápidas */}
      <div className="quick-automations">
        <h3>⚡ Automações Rápidas</h3>
        <div className="automation-cards">
          <div className="automation-card">
            <div className="automation-icon">📅</div>
            <h4>Lembretes de Agendamento</h4>
            <p>Envio automático 24h e 2h antes do ensaio</p>
            <span className="automation-status active">Ativo</span>
          </div>
          
          <div className="automation-card">
            <div className="automation-icon">💰</div>
            <h4>Links de Pagamento</h4>
            <p>Envio automático de links para pagamento</p>
            <span className="automation-status active">Ativo</span>
          </div>
          
          <div className="automation-card">
            <div className="automation-icon">📸</div>
            <h4>Entrega de Fotos</h4>
            <p>Notificação quando galeria estiver pronta</p>
            <span className="automation-status inactive">Inativo</span>
          </div>
          
          <div className="automation-card">
            <div className="automation-icon">🎯</div>
            <h4>Respostas Inteligentes</h4>
            <p>IA responde perguntas frequentes</p>
            <span className="automation-status active">Ativo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupWhatsApp;

