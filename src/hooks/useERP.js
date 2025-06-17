import { useState, useEffect, useCallback } from 'react'

// Hook para gerenciar clientes
export const useClientes = () => {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Carregar clientes
  const carregarClientes = useCallback(async () => {
    setLoading(true)
    try {
      const clientesStorage = localStorage.getItem('jessica_erp_clientes')
      if (clientesStorage) {
        setClientes(JSON.parse(clientesStorage))
      }
    } catch (err) {
      setError('Erro ao carregar clientes')
    } finally {
      setLoading(false)
    }
  }, [])

  // Salvar cliente
  const salvarCliente = useCallback(async (cliente) => {
    try {
      const novosClientes = cliente.id 
        ? clientes.map(c => c.id === cliente.id ? cliente : c)
        : [...clientes, { ...cliente, id: Date.now(), criadoEm: new Date().toISOString() }]
      
      setClientes(novosClientes)
      localStorage.setItem('jessica_erp_clientes', JSON.stringify(novosClientes))
      return true
    } catch (err) {
      setError('Erro ao salvar cliente')
      return false
    }
  }, [clientes])

  // Excluir cliente
  const excluirCliente = useCallback(async (id) => {
    try {
      const novosClientes = clientes.filter(c => c.id !== id)
      setClientes(novosClientes)
      localStorage.setItem('jessica_erp_clientes', JSON.stringify(novosClientes))
      return true
    } catch (err) {
      setError('Erro ao excluir cliente')
      return false
    }
  }, [clientes])

  // Buscar cliente por ID
  const buscarCliente = useCallback((id) => {
    return clientes.find(c => c.id === id)
  }, [clientes])

  useEffect(() => {
    carregarClientes()
  }, [carregarClientes])

  return {
    clientes,
    loading,
    error,
    salvarCliente,
    excluirCliente,
    buscarCliente,
    recarregar: carregarClientes
  }
}

// Hook para gerenciar agendamentos
export const useAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Carregar agendamentos
  const carregarAgendamentos = useCallback(async () => {
    setLoading(true)
    try {
      const agendamentosStorage = localStorage.getItem('jessica_erp_agendamentos')
      if (agendamentosStorage) {
        setAgendamentos(JSON.parse(agendamentosStorage))
      }
    } catch (err) {
      setError('Erro ao carregar agendamentos')
    } finally {
      setLoading(false)
    }
  }, [])

  // Salvar agendamento
  const salvarAgendamento = useCallback(async (agendamento) => {
    try {
      const novosAgendamentos = agendamento.id 
        ? agendamentos.map(a => a.id === agendamento.id ? agendamento : a)
        : [...agendamentos, { ...agendamento, id: Date.now(), criadoEm: new Date().toISOString() }]
      
      setAgendamentos(novosAgendamentos)
      localStorage.setItem('jessica_erp_agendamentos', JSON.stringify(novosAgendamentos))
      return true
    } catch (err) {
      setError('Erro ao salvar agendamento')
      return false
    }
  }, [agendamentos])

  // Verificar disponibilidade
  const verificarDisponibilidade = useCallback((data, horario, duracao) => {
    const dataHora = new Date(`${data}T${horario}`)
    const fimSessao = new Date(dataHora.getTime() + (duracao * 60 * 60 * 1000))
    
    return !agendamentos.some(agendamento => {
      if (agendamento.status === 'cancelado') return false
      
      const agendDataHora = new Date(`${agendamento.data}T${agendamento.horario}`)
      const agendFim = new Date(agendDataHora.getTime() + (agendamento.duracao * 60 * 60 * 1000))
      
      return (dataHora < agendFim && fimSessao > agendDataHora)
    })
  }, [agendamentos])

  // Obter agendamentos do dia
  const agendamentosHoje = useCallback(() => {
    const hoje = new Date().toISOString().split('T')[0]
    return agendamentos.filter(a => a.data === hoje && a.status !== 'cancelado')
  }, [agendamentos])

  useEffect(() => {
    carregarAgendamentos()
  }, [carregarAgendamentos])

  return {
    agendamentos,
    loading,
    error,
    salvarAgendamento,
    verificarDisponibilidade,
    agendamentosHoje,
    recarregar: carregarAgendamentos
  }
}

// Hook para gerenciar dados financeiros
export const useFinanceiro = () => {
  const [pagamentos, setPagamentos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Carregar pagamentos
  const carregarPagamentos = useCallback(async () => {
    setLoading(true)
    try {
      const pagamentosStorage = localStorage.getItem('jessica_erp_pagamentos')
      if (pagamentosStorage) {
        setPagamentos(JSON.parse(pagamentosStorage))
      }
    } catch (err) {
      setError('Erro ao carregar pagamentos')
    } finally {
      setLoading(false)
    }
  }, [])

  // Registrar pagamento
  const registrarPagamento = useCallback(async (pagamento) => {
    try {
      const novosPagamentos = [...pagamentos, { 
        ...pagamento, 
        id: Date.now(), 
        criadoEm: new Date().toISOString() 
      }]
      
      setPagamentos(novosPagamentos)
      localStorage.setItem('jessica_erp_pagamentos', JSON.stringify(novosPagamentos))
      return true
    } catch (err) {
      setError('Erro ao registrar pagamento')
      return false
    }
  }, [pagamentos])

  // Calcular receita do mês
  const receitaMensal = useCallback((mes, ano) => {
    const mesAtual = mes || new Date().getMonth() + 1
    const anoAtual = ano || new Date().getFullYear()
    
    return pagamentos
      .filter(p => {
        if (p.status !== 'pago') return false
        const dataPagamento = new Date(p.dataPagamento)
        return dataPagamento.getMonth() + 1 === mesAtual && dataPagamento.getFullYear() === anoAtual
      })
      .reduce((total, p) => total + p.valor, 0)
  }, [pagamentos])

  // Pagamentos pendentes
  const pagamentosPendentes = useCallback(() => {
    return pagamentos.filter(p => p.status === 'pendente')
  }, [pagamentos])

  useEffect(() => {
    carregarPagamentos()
  }, [carregarPagamentos])

  return {
    pagamentos,
    loading,
    error,
    registrarPagamento,
    receitaMensal,
    pagamentosPendentes,
    recarregar: carregarPagamentos
  }
}

// Hook para analytics
export const useAnalytics = () => {
  const [metricas, setMetricas] = useState({})
  const [loading, setLoading] = useState(false)

  // Calcular métricas
  const calcularMetricas = useCallback(async () => {
    setLoading(true)
    try {
      // Simular cálculo de métricas
      const clientesStorage = localStorage.getItem('jessica_erp_clientes')
      const agendamentosStorage = localStorage.getItem('jessica_erp_agendamentos')
      const pagamentosStorage = localStorage.getItem('jessica_erp_pagamentos')
      
      const clientes = clientesStorage ? JSON.parse(clientesStorage) : []
      const agendamentos = agendamentosStorage ? JSON.parse(agendamentosStorage) : []
      const pagamentos = pagamentosStorage ? JSON.parse(pagamentosStorage) : []
      
      const hoje = new Date()
      const mesAtual = hoje.getMonth() + 1
      const anoAtual = hoje.getFullYear()
      
      setMetricas({
        totalClientes: clientes.length,
        agendamentosHoje: agendamentos.filter(a => a.data === hoje.toISOString().split('T')[0]).length,
        receitaMensal: pagamentos
          .filter(p => {
            if (p.status !== 'pago') return false
            const data = new Date(p.dataPagamento)
            return data.getMonth() + 1 === mesAtual && data.getFullYear() === anoAtual
          })
          .reduce((total, p) => total + p.valor, 0),
        conversaoSite: Math.random() * 10 + 5, // Simular taxa de conversão
        ticketMedio: pagamentos.length > 0 
          ? pagamentos.reduce((total, p) => total + p.valor, 0) / pagamentos.length 
          : 0
      })
    } catch (err) {
      console.error('Erro ao calcular métricas:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    calcularMetricas()
    // Atualizar métricas a cada 5 minutos
    const interval = setInterval(calcularMetricas, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [calcularMetricas])

  return {
    metricas,
    loading,
    atualizarMetricas: calcularMetricas
  }
}

