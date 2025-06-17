import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Calendar, Download, Filter, Eye, Settings,
  DollarSign, Users, Camera, MessageSquare, Mail, PieChart, LineChart,
  FileText, Share2, Clock, Target, Zap, ArrowUp, ArrowDown, RefreshCw
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell,
  AreaChart, Area, ComposedChart
} from 'recharts';

const RelatoriosAvancados = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetrics, setSelectedMetrics] = useState(['receita', 'clientes', 'ensaios']);
  const [loading, setLoading] = useState(false);

  // Dados mockados para demonstração
  const [dashboardData, setDashboardData] = useState({
    kpis: {
      receitaTotal: 45750,
      receitaAnterior: 38200,
      clientesAtivos: 127,
      clientesAnterior: 98,
      ensaiosRealizados: 34,
      ensaiosAnterior: 28,
      ticketMedio: 1348,
      ticketAnterior: 1365,
      taxaConversao: 87.5,
      conversaoAnterior: 82.1,
      nps: 9.2,
      npsAnterior: 8.8
    },
    receitaPorMes: [
      { mes: 'Jan', receita: 28500, ensaios: 18, clientes: 15 },
      { mes: 'Fev', receita: 32100, ensaios: 22, clientes: 19 },
      { mes: 'Mar', receita: 38200, ensaios: 28, clientes: 24 },
      { mes: 'Abr', receita: 41800, ensaios: 31, clientes: 26 },
      { mes: 'Mai', receita: 45750, ensaios: 34, clientes: 29 },
      { mes: 'Jun', receita: 48200, ensaios: 36, clientes: 31 }
    ],
    tiposEnsaio: [
      { tipo: 'Gestante', valor: 18500, quantidade: 25, cor: '#FF6B9D' },
      { tipo: 'Newborn', valor: 15200, quantidade: 18, cor: '#4ECDC4' },
      { tipo: 'Família', valor: 8750, quantidade: 12, cor: '#45B7D1' },
      { tipo: 'Casal', valor: 3300, quantidade: 5, cor: '#96CEB4' }
    ],
    clientesPorRegiao: [
      { regiao: 'Centro', clientes: 45, receita: 18200 },
      { regiao: 'Zona Sul', clientes: 38, receita: 15800 },
      { regiao: 'Zona Norte', clientes: 28, receita: 8900 },
      { regiao: 'Zona Oeste', clientes: 16, receita: 2850 }
    ],
    performanceWhatsApp: {
      mensagensEnviadas: 1247,
      mensagensLidas: 1089,
      respostasRecebidas: 892,
      conversoes: 156,
      taxaAbertura: 87.3,
      taxaResposta: 71.5,
      taxaConversao: 12.5
    }
  });

  const [relatorioFinanceiro, setRelatorioFinanceiro] = useState({
    resumo: {
      receitaBruta: 45750,
      impostos: 6862.5,
      receitaLiquida: 38887.5,
      custos: 12400,
      lucroLiquido: 26487.5,
      margemLucro: 57.9
    },
    fluxoCaixa: [
      { data: '01/06', entrada: 2850, saida: 890, saldo: 1960 },
      { data: '08/06', entrada: 4200, saida: 1200, saldo: 3000 },
      { data: '15/06', entrada: 3750, saida: 950, saldo: 2800 },
      { data: '22/06', entrada: 5100, saida: 1100, saldo: 4000 },
      { data: '29/06', entrada: 3850, saida: 800, saldo: 3050 }
    ],
    categoriasCusto: [
      { categoria: 'Equipamentos', valor: 4200, percentual: 33.9 },
      { categoria: 'Marketing', valor: 3100, percentual: 25.0 },
      { categoria: 'Transporte', valor: 2800, percentual: 22.6 },
      { categoria: 'Materiais', valor: 1500, percentual: 12.1 },
      { categoria: 'Outros', valor: 800, percentual: 6.4 }
    ]
  });

  // Função para calcular variação percentual
  const calcularVariacao = (atual, anterior) => {
    const variacao = ((atual - anterior) / anterior) * 100;
    return {
      valor: Math.abs(variacao).toFixed(1),
      tipo: variacao >= 0 ? 'positiva' : 'negativa'
    };
  };

  // Função para formatar moeda
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Função para exportar relatório
  const exportarRelatorio = (tipo, formato) => {
    setLoading(true);
    
    // Simular processamento
    setTimeout(() => {
      const dados = {
        tipo,
        formato,
        periodo: dateRange,
        geradoEm: new Date().toISOString(),
        dados: tipo === 'financeiro' ? relatorioFinanceiro : dashboardData
      };
      
      const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio_${tipo}_${new Date().toISOString().split('T')[0]}.${formato}`;
      a.click();
      URL.revokeObjectURL(url);
      
      setLoading(false);
    }, 2000);
  };

  const COLORS = ['#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Relatórios Avançados</h1>
                <p className="text-gray-600">Analytics e insights completos do seu negócio</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
                <option value="1y">Último ano</option>
              </select>
              
              <button
                onClick={() => exportarRelatorio(activeTab, 'pdf')}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Exportar
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mt-6">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
              { id: 'clientes', label: 'Clientes', icon: Users },
              { id: 'ensaios', label: 'Ensaios', icon: Camera },
              { id: 'marketing', label: 'Marketing', icon: TrendingUp },
              { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare }
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

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPIs Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  titulo: 'Receita Total',
                  valor: formatarMoeda(dashboardData.kpis.receitaTotal),
                  anterior: dashboardData.kpis.receitaAnterior,
                  atual: dashboardData.kpis.receitaTotal,
                  icon: DollarSign,
                  cor: 'green'
                },
                {
                  titulo: 'Clientes Ativos',
                  valor: dashboardData.kpis.clientesAtivos.toString(),
                  anterior: dashboardData.kpis.clientesAnterior,
                  atual: dashboardData.kpis.clientesAtivos,
                  icon: Users,
                  cor: 'blue'
                },
                {
                  titulo: 'Ensaios Realizados',
                  valor: dashboardData.kpis.ensaiosRealizados.toString(),
                  anterior: dashboardData.kpis.ensaiosAnterior,
                  atual: dashboardData.kpis.ensaiosRealizados,
                  icon: Camera,
                  cor: 'purple'
                },
                {
                  titulo: 'Ticket Médio',
                  valor: formatarMoeda(dashboardData.kpis.ticketMedio),
                  anterior: dashboardData.kpis.ticketAnterior,
                  atual: dashboardData.kpis.ticketMedio,
                  icon: Target,
                  cor: 'orange'
                },
                {
                  titulo: 'Taxa de Conversão',
                  valor: `${dashboardData.kpis.taxaConversao}%`,
                  anterior: dashboardData.kpis.conversaoAnterior,
                  atual: dashboardData.kpis.taxaConversao,
                  icon: TrendingUp,
                  cor: 'pink'
                },
                {
                  titulo: 'NPS Score',
                  valor: dashboardData.kpis.nps.toString(),
                  anterior: dashboardData.kpis.npsAnterior,
                  atual: dashboardData.kpis.nps,
                  icon: Zap,
                  cor: 'indigo'
                }
              ].map((kpi, index) => {
                const variacao = calcularVariacao(kpi.atual, kpi.anterior);
                const Icon = kpi.icon;
                
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{kpi.titulo}</p>
                        <p className="text-2xl font-bold text-gray-900">{kpi.valor}</p>
                      </div>
                      <div className={`p-2 bg-${kpi.cor}-100 rounded-lg`}>
                        <Icon className={`w-6 h-6 text-${kpi.cor}-600`} />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm">
                      {variacao.tipo === 'positiva' ? (
                        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={variacao.tipo === 'positiva' ? 'text-green-600' : 'text-red-600'}>
                        {variacao.valor}%
                      </span>
                      <span className="text-gray-500 ml-1">vs período anterior</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gráfico de Receita */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Evolução da Receita</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg">Receita</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">Ensaios</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">Clientes</button>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={dashboardData.receitaPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value, name) => [
                    name === 'receita' ? formatarMoeda(value) : value,
                    name === 'receita' ? 'Receita' : name === 'ensaios' ? 'Ensaios' : 'Clientes'
                  ]} />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="receita" fill="#8884d8" fillOpacity={0.3} />
                  <Bar yAxisId="right" dataKey="ensaios" fill="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="clientes" stroke="#ff7300" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Gráficos de Pizza */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tipos de Ensaio */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Receita por Tipo de Ensaio</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={dashboardData.tiposEnsaio}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ tipo, percentual }) => `${tipo} (${((percentual || 0) * 100).toFixed(1)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                    >
                      {dashboardData.tiposEnsaio.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatarMoeda(value)} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              {/* Clientes por Região */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Clientes por Região</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dashboardData.clientesPorRegiao}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="regiao" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clientes" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Relatório Financeiro */}
        {activeTab === 'financeiro' && (
          <div className="space-y-6">
            {/* Resumo Financeiro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Receita</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Receita Bruta:</span>
                    <span className="font-medium">{formatarMoeda(relatorioFinanceiro.resumo.receitaBruta)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impostos:</span>
                    <span className="font-medium text-red-600">-{formatarMoeda(relatorioFinanceiro.resumo.impostos)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Receita Líquida:</span>
                    <span className="font-bold text-green-600">{formatarMoeda(relatorioFinanceiro.resumo.receitaLiquida)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Custos</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Custos Totais:</span>
                    <span className="font-medium text-red-600">{formatarMoeda(relatorioFinanceiro.resumo.custos)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {relatorioFinanceiro.categoriasCusto.slice(0, 2).map(categoria => (
                      <div key={categoria.categoria} className="flex justify-between">
                        <span>{categoria.categoria}:</span>
                        <span>{formatarMoeda(categoria.valor)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Lucro</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lucro Líquido:</span>
                    <span className="font-bold text-blue-600">{formatarMoeda(relatorioFinanceiro.resumo.lucroLiquido)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Margem:</span>
                    <span className="font-medium">{relatorioFinanceiro.resumo.margemLucro}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fluxo de Caixa */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Fluxo de Caixa</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={relatorioFinanceiro.fluxoCaixa}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatarMoeda(value)} />
                  <Legend />
                  <Area type="monotone" dataKey="entrada" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="saida" stackId="2" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="saldo" stackId="3" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Categorias de Custo */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribuição de Custos</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={relatorioFinanceiro.categoriasCusto}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ categoria, percentual }) => `${categoria} (${percentual}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                    >
                      {relatorioFinanceiro.categoriasCusto.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatarMoeda(value)} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                
                <div className="space-y-3">
                  {relatorioFinanceiro.categoriasCusto.map((categoria, index) => (
                    <div key={categoria.categoria} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="font-medium">{categoria.categoria}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatarMoeda(categoria.valor)}</div>
                        <div className="text-sm text-gray-500">{categoria.percentual}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Analytics */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6">
            {/* Métricas WhatsApp */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  titulo: 'Mensagens Enviadas',
                  valor: dashboardData.performanceWhatsApp.mensagensEnviadas.toLocaleString(),
                  icon: MessageSquare,
                  cor: 'green'
                },
                {
                  titulo: 'Taxa de Abertura',
                  valor: `${dashboardData.performanceWhatsApp.taxaAbertura}%`,
                  icon: Eye,
                  cor: 'blue'
                },
                {
                  titulo: 'Taxa de Resposta',
                  valor: `${dashboardData.performanceWhatsApp.taxaResposta}%`,
                  icon: Share2,
                  cor: 'purple'
                },
                {
                  titulo: 'Conversões',
                  valor: dashboardData.performanceWhatsApp.conversoes.toString(),
                  icon: Target,
                  cor: 'orange'
                }
              ].map((metrica, index) => {
                const Icon = metrica.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{metrica.titulo}</p>
                        <p className="text-2xl font-bold text-gray-900">{metrica.valor}</p>
                      </div>
                      <div className={`p-2 bg-${metrica.cor}-100 rounded-lg`}>
                        <Icon className={`w-6 h-6 text-${metrica.cor}-600`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Funil de Conversão WhatsApp */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Funil de Conversão WhatsApp</h3>
              <div className="space-y-4">
                {[
                  { etapa: 'Mensagens Enviadas', valor: 1247, percentual: 100 },
                  { etapa: 'Mensagens Lidas', valor: 1089, percentual: 87.3 },
                  { etapa: 'Respostas Recebidas', valor: 892, percentual: 71.5 },
                  { etapa: 'Conversões', valor: 156, percentual: 12.5 }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{item.etapa}</span>
                      <span className="text-sm text-gray-600">{item.valor} ({item.percentual}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentual}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Outras abas podem ser implementadas de forma similar */}
        {(activeTab === 'clientes' || activeTab === 'ensaios' || activeTab === 'marketing') && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Relatório {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>
              <p className="text-gray-600 mb-4">
                Esta seção está sendo desenvolvida com métricas específicas para {activeTab}.
              </p>
              <button
                onClick={() => exportarRelatorio(activeTab, 'pdf')}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mx-auto"
              >
                <Download className="w-4 h-4" />
                Exportar Dados Disponíveis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatoriosAvancados;

