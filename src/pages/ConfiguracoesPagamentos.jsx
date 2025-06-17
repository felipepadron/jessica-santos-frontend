import React, { useState, useEffect } from 'react';
import { 
  CreditCard, DollarSign, Settings, Save, Check, X, Plus, Edit, Trash2,
  TrendingUp, BarChart3, Calendar, Filter, Download, Eye, AlertCircle,
  Webhook, Bell, Shield, Globe, Smartphone, Laptop, RefreshCw
} from 'lucide-react';

const ConfiguracoesPagamentos = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stripeConfig, setStripeConfig] = useState({
    publishableKey: '',
    secretKey: '',
    webhookSecret: '',
    enabled: false,
    currency: 'BRL',
    captureMethod: 'automatic',
    statementDescriptor: 'JESSICA SANTOS FOTO'
  });
  
  const [pagseguroConfig, setPagseguroConfig] = useState({
    email: '',
    token: '',
    sandbox: true,
    enabled: false,
    notificationUrl: '',
    redirectUrl: ''
  });

  const [pixConfig, setPixConfig] = useState({
    enabled: false,
    pixKey: '',
    pixKeyType: 'email',
    bankName: '',
    accountHolder: ''
  });

  const [planos, setPlanos] = useState([
    {
      id: 1,
      nome: 'Ensaio Gestante',
      preco: 550,
      descricao: '2 horas de sessão + 30 fotos editadas',
      ativo: true,
      stripeProductId: '',
      pagseguroCode: ''
    },
    {
      id: 2,
      nome: 'Ensaio Newborn',
      preco: 850,
      descricao: '3 horas de sessão + 50 fotos editadas',
      ativo: true,
      stripeProductId: '',
      pagseguroCode: ''
    }
  ]);

  const [transacoes, setTransacoes] = useState([
    {
      id: 'txn_001',
      cliente: 'Ana Silva',
      plano: 'Ensaio Gestante',
      valor: 550,
      status: 'aprovado',
      gateway: 'stripe',
      data: '2025-06-15',
      metodo: 'cartao'
    },
    {
      id: 'txn_002',
      cliente: 'Maria Santos',
      plano: 'Ensaio Newborn',
      valor: 850,
      status: 'pendente',
      gateway: 'pagseguro',
      data: '2025-06-14',
      metodo: 'pix'
    }
  ]);

  const [estatisticas, setEstatisticas] = useState({
    receitaTotal: 12450,
    transacoesHoje: 3,
    transacoesMes: 28,
    ticketMedio: 675,
    taxaConversao: 85.5,
    receitaOntem: 1200,
    receitaMesPassado: 11200
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [showPlanoModal, setShowPlanoModal] = useState(false);
  const [editingPlano, setEditingPlano] = useState(null);

  // Função para salvar configurações
  const handleSaveConfig = async (configType, config) => {
    setSaving(true);
    
    try {
      const response = await fetch(`/api/payments/${configType}/configure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(config)
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage(`${configType} configurado com sucesso!`);
      } else {
        setMessage(`Erro ao configurar ${configType}: ` + data.message);
      }
    } catch (error) {
      setMessage(`Erro ao configurar ${configType}: ` + error.message);
    }
    
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  // Função para testar webhook
  const testWebhook = async (gateway) => {
    try {
      const response = await fetch(`/api/payments/${gateway}/test-webhook`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      setMessage(data.success ? 'Webhook testado com sucesso!' : 'Erro no teste do webhook');
    } catch (error) {
      setMessage('Erro ao testar webhook: ' + error.message);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  // Função para exportar relatório
  const exportarRelatorio = (formato) => {
    const dados = {
      transacoes,
      estatisticas,
      periodo: 'ultimo_mes'
    };
    
    // Simular download
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_pagamentos_${new Date().toISOString().split('T')[0]}.${formato}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema de Pagamentos</h1>
                <p className="text-gray-600">Gestão completa de pagamentos, planos e transações</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => exportarRelatorio('json')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button
                onClick={() => setShowPlanoModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                <Plus className="w-4 h-4" />
                Novo Plano
              </button>
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-lg mt-4 ${
              message.includes('sucesso') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {message.includes('sucesso') ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5" />
                )}
                {message}
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mt-6">
            {[
              { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
              { id: 'gateways', label: 'Gateways', icon: CreditCard },
              { id: 'planos', label: 'Planos', icon: DollarSign },
              { id: 'transacoes', label: 'Transações', icon: TrendingUp },
              { id: 'webhooks', label: 'Webhooks', icon: Webhook },
              { id: 'configuracoes', label: 'Configurações', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Estatísticas Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Total</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {estatisticas.receitaTotal.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12.5%</span>
                  <span className="text-gray-500 ml-1">vs mês anterior</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Transações Hoje</p>
                    <p className="text-2xl font-bold text-gray-900">{estatisticas.transacoesHoje}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-gray-500">Total do mês: {estatisticas.transacoesMes}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {estatisticas.ticketMedio}</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-gray-500">Baseado em {estatisticas.transacoesMes} transações</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-2xl font-bold text-gray-900">{estatisticas.taxaConversao}%</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-green-600">+2.1%</span>
                  <span className="text-gray-500 ml-1">vs semana anterior</span>
                </div>
              </div>
            </div>

            {/* Gráfico de Receita */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita dos Últimos 7 Dias</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[1200, 800, 1500, 900, 1800, 1100, 1400].map((valor, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-pink-500 rounded-t-md"
                      style={{ height: `${(valor / 1800) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">
                      {new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { weekday: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status dos Gateways */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status dos Gateways</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-medium">Stripe</span>
                      <p className="text-xs text-gray-500">Cartões internacionais</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    stripeConfig.enabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {stripeConfig.enabled ? 'Ativo' : 'Inativo'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="font-medium">PagSeguro</span>
                      <p className="text-xs text-gray-500">Cartões nacionais</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pagseguroConfig.enabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {pagseguroConfig.enabled ? 'Ativo' : 'Inativo'}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="font-medium">PIX</span>
                      <p className="text-xs text-gray-500">Pagamento instantâneo</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pixConfig.enabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {pixConfig.enabled ? 'Ativo' : 'Inativo'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gateways Tab */}
        {activeTab === 'gateways' && (
          <div className="space-y-6">
            {/* Stripe Configuration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Stripe</h2>
                    <p className="text-gray-600">Gateway para cartões internacionais</p>
                  </div>
                </div>
                <button
                  onClick={() => testWebhook('stripe')}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Testar Webhook
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSaveConfig('stripe', stripeConfig); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chave Publicável
                    </label>
                    <input
                      type="text"
                      value={stripeConfig.publishableKey}
                      onChange={(e) => setStripeConfig(prev => ({ ...prev, publishableKey: e.target.value }))}
                      placeholder="pk_test_..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chave Secreta
                    </label>
                    <input
                      type="password"
                      value={stripeConfig.secretKey}
                      onChange={(e) => setStripeConfig(prev => ({ ...prev, secretKey: e.target.value }))}
                      placeholder="sk_test_..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook Secret
                    </label>
                    <input
                      type="password"
                      value={stripeConfig.webhookSecret}
                      onChange={(e) => setStripeConfig(prev => ({ ...prev, webhookSecret: e.target.value }))}
                      placeholder="whsec_..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moeda
                    </label>
                    <select
                      value={stripeConfig.currency}
                      onChange={(e) => setStripeConfig(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="BRL">Real Brasileiro (BRL)</option>
                      <option value="USD">Dólar Americano (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Captura
                    </label>
                    <select
                      value={stripeConfig.captureMethod}
                      onChange={(e) => setStripeConfig(prev => ({ ...prev, captureMethod: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="automatic">Automático</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição na Fatura
                    </label>
                    <input
                      type="text"
                      value={stripeConfig.statementDescriptor}
                      onChange={(e) => setStripeConfig(prev => ({ ...prev, statementDescriptor: e.target.value }))}
                      placeholder="JESSICA SANTOS FOTO"
                      maxLength={22}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="stripe-enabled"
                    checked={stripeConfig.enabled}
                    onChange={(e) => setStripeConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label htmlFor="stripe-enabled" className="text-sm font-medium text-gray-700">
                    Habilitar Stripe como gateway de pagamento
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar Configurações Stripe
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* PagSeguro Configuration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">PagSeguro</h2>
                    <p className="text-gray-600">Gateway para cartões nacionais</p>
                  </div>
                </div>
                <button
                  onClick={() => testWebhook('pagseguro')}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Testar Webhook
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSaveConfig('pagseguro', pagseguroConfig); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email da Conta
                    </label>
                    <input
                      type="email"
                      value={pagseguroConfig.email}
                      onChange={(e) => setPagseguroConfig(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Token de Segurança
                    </label>
                    <input
                      type="password"
                      value={pagseguroConfig.token}
                      onChange={(e) => setPagseguroConfig(prev => ({ ...prev, token: e.target.value }))}
                      placeholder="Token do PagSeguro"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de Notificação
                    </label>
                    <input
                      type="url"
                      value={pagseguroConfig.notificationUrl}
                      onChange={(e) => setPagseguroConfig(prev => ({ ...prev, notificationUrl: e.target.value }))}
                      placeholder="https://seusite.com/webhook/pagseguro"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de Redirecionamento
                    </label>
                    <input
                      type="url"
                      value={pagseguroConfig.redirectUrl}
                      onChange={(e) => setPagseguroConfig(prev => ({ ...prev, redirectUrl: e.target.value }))}
                      placeholder="https://seusite.com/pagamento/sucesso"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="pagseguro-sandbox"
                      checked={pagseguroConfig.sandbox}
                      onChange={(e) => setPagseguroConfig(prev => ({ ...prev, sandbox: e.target.checked }))}
                      className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <label htmlFor="pagseguro-sandbox" className="text-sm font-medium text-gray-700">
                      Ambiente de testes (Sandbox)
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="pagseguro-enabled"
                      checked={pagseguroConfig.enabled}
                      onChange={(e) => setPagseguroConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <label htmlFor="pagseguro-enabled" className="text-sm font-medium text-gray-700">
                      Habilitar PagSeguro
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar Configurações PagSeguro
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* PIX Configuration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Smartphone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">PIX</h2>
                  <p className="text-gray-600">Pagamento instantâneo brasileiro</p>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSaveConfig('pix', pixConfig); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Chave PIX
                    </label>
                    <select
                      value={pixConfig.pixKeyType}
                      onChange={(e) => setPixConfig(prev => ({ ...prev, pixKeyType: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="email">Email</option>
                      <option value="cpf">CPF</option>
                      <option value="cnpj">CNPJ</option>
                      <option value="telefone">Telefone</option>
                      <option value="aleatoria">Chave Aleatória</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chave PIX
                    </label>
                    <input
                      type="text"
                      value={pixConfig.pixKey}
                      onChange={(e) => setPixConfig(prev => ({ ...prev, pixKey: e.target.value }))}
                      placeholder="sua@chave.pix"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Banco
                    </label>
                    <input
                      type="text"
                      value={pixConfig.bankName}
                      onChange={(e) => setPixConfig(prev => ({ ...prev, bankName: e.target.value }))}
                      placeholder="Banco do Brasil"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titular da Conta
                    </label>
                    <input
                      type="text"
                      value={pixConfig.accountHolder}
                      onChange={(e) => setPixConfig(prev => ({ ...prev, accountHolder: e.target.value }))}
                      placeholder="Jéssica Santos"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="pix-enabled"
                    checked={pixConfig.enabled}
                    onChange={(e) => setPixConfig(prev => ({ ...prev, enabled: e.target.checked }))}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label htmlFor="pix-enabled" className="text-sm font-medium text-gray-700">
                    Habilitar PIX como método de pagamento
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar Configurações PIX
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Planos Tab */}
        {activeTab === 'planos' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestão de Planos</h2>
                <button
                  onClick={() => setShowPlanoModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  <Plus className="w-4 h-4" />
                  Novo Plano
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planos.map(plano => (
                  <div key={plano.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{plano.nome}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingPlano(plano);
                            setShowPlanoModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-pink-600">
                        R$ {plano.preco.toLocaleString()}
                      </div>
                      <p className="text-gray-600 text-sm">{plano.descricao}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          plano.ativo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {plano.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                        
                        <div className="flex gap-2">
                          {plano.stripeProductId && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" title="Stripe configurado"></div>
                          )}
                          {plano.pagseguroCode && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full" title="PagSeguro configurado"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transações Tab */}
        {activeTab === 'transacoes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Histórico de Transações</h2>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <Filter className="w-4 h-4" />
                    Filtrar
                  </button>
                  <button
                    onClick={() => exportarRelatorio('csv')}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <Download className="w-4 h-4" />
                    Exportar
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Cliente</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Plano</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Valor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Gateway</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Data</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacoes.map(transacao => (
                      <tr key={transacao.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-900">{transacao.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{transacao.cliente}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{transacao.plano}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          R$ {transacao.valor.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transacao.status === 'aprovado' 
                              ? 'bg-green-100 text-green-800'
                              : transacao.status === 'pendente'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transacao.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 capitalize">{transacao.gateway}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(transacao.data).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Webhooks Tab */}
        {activeTab === 'webhooks' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuração de Webhooks</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium text-blue-900">Sobre Webhooks</h3>
                  </div>
                  <p className="text-blue-800 text-sm">
                    Webhooks são notificações automáticas enviadas pelos gateways de pagamento quando o status de uma transação muda. 
                    Configure os endpoints abaixo para receber essas notificações em tempo real.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium text-gray-900">Stripe Webhook</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Endpoint URL
                        </label>
                        <input
                          type="url"
                          value="https://seusite.com/webhook/stripe"
                          readOnly
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Eventos Monitorados
                        </label>
                        <div className="text-sm text-gray-600">
                          • payment_intent.succeeded<br/>
                          • payment_intent.payment_failed<br/>
                          • invoice.payment_succeeded
                        </div>
                      </div>
                      
                      <button
                        onClick={() => testWebhook('stripe')}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                      >
                        Testar Webhook
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                      <h3 className="font-medium text-gray-900">PagSeguro Webhook</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Endpoint URL
                        </label>
                        <input
                          type="url"
                          value="https://seusite.com/webhook/pagseguro"
                          readOnly
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Eventos Monitorados
                        </label>
                        <div className="text-sm text-gray-600">
                          • Transação aprovada<br/>
                          • Transação cancelada<br/>
                          • Transação em análise
                        </div>
                      </div>
                      
                      <button
                        onClick={() => testWebhook('pagseguro')}
                        className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 text-sm"
                      >
                        Testar Webhook
                      </button>
                    </div>
                  </div>
                </div>

                {/* Webhook Logs */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Logs de Webhook (Últimas 24h)</h3>
                  
                  <div className="space-y-2">
                    {[
                      { time: '14:32', gateway: 'stripe', event: 'payment_intent.succeeded', status: 'success' },
                      { time: '13:15', gateway: 'pagseguro', event: 'transaction.approved', status: 'success' },
                      { time: '12:08', gateway: 'stripe', event: 'payment_intent.payment_failed', status: 'error' }
                    ].map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">{log.time}</span>
                          <span className="text-sm font-medium capitalize">{log.gateway}</span>
                          <span className="text-sm text-gray-600">{log.event}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === 'success' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configurações Tab */}
        {activeTab === 'configuracoes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Configurações Gerais</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notificações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email para novos pagamentos</label>
                        <p className="text-xs text-gray-500">Receber email quando um pagamento for aprovado</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email para pagamentos falhados</label>
                        <p className="text-xs text-gray-500">Receber email quando um pagamento falhar</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Relatório semanal</label>
                        <p className="text-xs text-gray-500">Receber relatório semanal de vendas por email</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Segurança</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Verificação SSL obrigatória</label>
                        <p className="text-xs text-gray-500">Exigir HTTPS para todos os webhooks</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Log de transações</label>
                        <p className="text-xs text-gray-500">Manter log detalhado de todas as transações</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Backup e Exportação</h3>
                  <div className="space-y-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <Download className="w-4 h-4" />
                      Exportar todas as transações
                    </button>
                    
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <Download className="w-4 h-4" />
                      Backup das configurações
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para Novo/Editar Plano */}
      {showPlanoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingPlano ? 'Editar Plano' : 'Novo Plano'}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Plano</label>
                <input
                  type="text"
                  defaultValue={editingPlano?.nome || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Ex: Ensaio Gestante"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$)</label>
                <input
                  type="number"
                  defaultValue={editingPlano?.preco || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="550"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea
                  defaultValue={editingPlano?.descricao || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="3"
                  placeholder="Descrição do que está incluído no plano"
                ></textarea>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="plano-ativo"
                  defaultChecked={editingPlano?.ativo !== false}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor="plano-ativo" className="text-sm font-medium text-gray-700">
                  Plano ativo
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPlanoModal(false);
                    setEditingPlano(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                >
                  {editingPlano ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguracoesPagamentos;

