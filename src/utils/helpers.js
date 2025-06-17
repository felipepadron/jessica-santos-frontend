// Utilitários para cálculos financeiros
export const calcularPreco = (servico, adicionais = []) => {
  const precoBase = servico.preco || 0
  const precoAdicionais = adicionais.reduce((total, adicional) => {
    return total + (adicional.preco || 0)
  }, 0)
  
  return precoBase + precoAdicionais
}

// Calcular parcelamento
export const calcularParcelamento = (valor, parcelas = 1, juros = 0) => {
  if (parcelas <= 1) {
    return [{ parcela: 1, valor: valor, vencimento: new Date() }]
  }
  
  const valorComJuros = valor * (1 + (juros / 100))
  const valorParcela = valorComJuros / parcelas
  
  return Array.from({ length: parcelas }, (_, index) => {
    const vencimento = new Date()
    vencimento.setMonth(vencimento.getMonth() + index)
    
    return {
      parcela: index + 1,
      valor: valorParcela,
      vencimento: vencimento.toISOString().split('T')[0]
    }
  })
}

// Calcular desconto
export const calcularDesconto = (valor, percentual) => {
  const desconto = valor * (percentual / 100)
  return {
    valorOriginal: valor,
    desconto: desconto,
    valorFinal: valor - desconto,
    percentual: percentual
  }
}

// Calcular sinal
export const calcularSinal = (valorTotal, percentualSinal = 300) => {
  // Se percentualSinal for menor que 1, trata como percentual
  // Se for maior, trata como valor fixo
  if (percentualSinal < 1) {
    return valorTotal * percentualSinal
  } else {
    return Math.min(percentualSinal, valorTotal)
  }
}

// Formatadores de valores
export const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}

export const formatarData = (data) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(data))
}

export const formatarDataHora = (data, hora) => {
  const dataHora = new Date(`${data}T${hora}`)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dataHora)
}

export const formatarTelefone = (telefone) => {
  const numero = telefone.replace(/\D/g, '')
  
  if (numero.length === 11) {
    return numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (numero.length === 10) {
    return numero.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  
  return telefone
}

// Validadores
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validarTelefone = (telefone) => {
  const numero = telefone.replace(/\D/g, '')
  return numero.length >= 10 && numero.length <= 11
}

export const validarCPF = (cpf) => {
  const numero = cpf.replace(/\D/g, '')
  
  if (numero.length !== 11) return false
  if (/^(\d)\1{10}$/.test(numero)) return false
  
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numero.charAt(i)) * (10 - i)
  }
  
  let resto = 11 - (soma % 11)
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(numero.charAt(9))) return false
  
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numero.charAt(i)) * (11 - i)
  }
  
  resto = 11 - (soma % 11)
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(numero.charAt(10))) return false
  
  return true
}

// Utilitários de data
export const obterProximosDias = (quantidade = 30) => {
  const dias = []
  const hoje = new Date()
  
  for (let i = 0; i < quantidade; i++) {
    const data = new Date(hoje)
    data.setDate(hoje.getDate() + i)
    
    dias.push({
      data: data.toISOString().split('T')[0],
      diaSemana: data.toLocaleDateString('pt-BR', { weekday: 'long' }),
      disponivel: true // Será calculado baseado nos agendamentos
    })
  }
  
  return dias
}

export const obterHorariosDisponiveis = (data, duracaoServico = 1) => {
  const horarios = []
  const inicio = 10 // 10h
  const fim = 18 // 18h
  
  for (let hora = inicio; hora < fim; hora++) {
    if (hora + duracaoServico <= fim) {
      horarios.push({
        horario: `${hora.toString().padStart(2, '0')}:00`,
        disponivel: true // Será calculado baseado nos agendamentos
      })
    }
  }
  
  return horarios
}

// Utilitários de texto
export const gerarSlug = (texto) => {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const truncarTexto = (texto, limite = 100) => {
  if (texto.length <= limite) return texto
  return texto.substring(0, limite) + '...'
}

// Utilitários de storage
export const salvarLocalStorage = (chave, dados) => {
  try {
    localStorage.setItem(chave, JSON.stringify(dados))
    return true
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error)
    return false
  }
}

export const carregarLocalStorage = (chave, padrao = null) => {
  try {
    const dados = localStorage.getItem(chave)
    return dados ? JSON.parse(dados) : padrao
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error)
    return padrao
  }
}

// Utilitários de backup
export const exportarDados = () => {
  const dados = {
    clientes: carregarLocalStorage('jessica_erp_clientes', []),
    agendamentos: carregarLocalStorage('jessica_erp_agendamentos', []),
    pagamentos: carregarLocalStorage('jessica_erp_pagamentos', []),
    configuracoes: carregarLocalStorage('jessica_erp_config', {}),
    exportadoEm: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `jessica-santos-backup-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  
  URL.revokeObjectURL(url)
}

export const importarDados = (arquivo) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const dados = JSON.parse(e.target.result)
        
        if (dados.clientes) salvarLocalStorage('jessica_erp_clientes', dados.clientes)
        if (dados.agendamentos) salvarLocalStorage('jessica_erp_agendamentos', dados.agendamentos)
        if (dados.pagamentos) salvarLocalStorage('jessica_erp_pagamentos', dados.pagamentos)
        if (dados.configuracoes) salvarLocalStorage('jessica_erp_config', dados.configuracoes)
        
        resolve(dados)
      } catch (error) {
        reject(new Error('Arquivo de backup inválido'))
      }
    }
    
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'))
    reader.readAsText(arquivo)
  })
}

