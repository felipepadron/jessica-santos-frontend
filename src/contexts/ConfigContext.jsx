import React, { createContext, useContext, useState, useEffect } from 'react'

// Context para configurações
const ConfigContext = createContext()

export const useConfig = () => {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig deve ser usado dentro de ConfigProvider')
  }
  return context
}

// Provider de configurações
export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  // Configurações padrão
  const defaultConfig = {
    pessoal: {
      nome: 'Jéssica Santos',
      telefone: '(11) 99999-9999',
      email: 'contato@jessicasantos.com',
      instagram: '@jessicasantosfoto',
      endereco: 'São Paulo - SP',
      biografia: 'Fotógrafa especializada em maternidade e família, apaixonada por eternizar momentos únicos.',
      experiencia: '5+ anos',
      especialidades: ['Gestante', 'Newborn', 'Família', 'Mentoria']
    },
    negocio: {
      horarioInicio: '08:00',
      horarioFim: '18:00',
      diasFuncionamento: ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'],
      tempoEnsaio: {
        gestante: 90,
        newborn: 180,
        familia: 120,
        mentoria: 240
      },
      intervaloAgendamentos: 30,
      antecedenciaMinima: 24,
      locaisAtendimento: ['Estúdio', 'Domicílio', 'Externa']
    },
    precos: {
      gestante: {
        essencial: { valor: 450, fotos: 20, tempo: 90 },
        completo: { valor: 650, fotos: 35, tempo: 120 },
        premium: { valor: 850, fotos: 50, tempo: 180 }
      },
      newborn: {
        basico: { valor: 550, fotos: 25, tempo: 120 },
        familia: { valor: 750, fotos: 40, tempo: 180 },
        lifestyle: { valor: 950, fotos: 60, tempo: 240 }
      },
      familia: {
        simples: { valor: 380, fotos: 20, tempo: 60 },
        tradicional: { valor: 580, fotos: 35, tempo: 90 },
        estendida: { valor: 780, fotos: 50, tempo: 120 }
      },
      mentoria: {
        basica: { valor: 200, horas: 2 },
        avancada: { valor: 350, horas: 4 },
        intensiva: { valor: 500, horas: 6 }
      }
    },
    pagamento: {
      descontoAvista: 10,
      parcelasMaximas: 12,
      jurosParcelas: 2.5,
      pixAtivo: true,
      cartaoAtivo: true,
      dinheiroAtivo: true,
      contaBanco: {
        banco: 'Banco do Brasil',
        agencia: '1234-5',
        conta: '12345-6',
        pix: 'contato@jessicasantos.com'
      }
    },
    integracoes: {
      whatsapp: {
        ativo: true,
        numero: '5511999999999',
        token: '',
        mensagemPadrao: 'Olá! Obrigada pelo interesse nos meus serviços. Como posso ajudar você?'
      },
      email: {
        ativo: false,
        servidor: 'smtp.gmail.com',
        porta: 587,
        usuario: '',
        senha: '',
        remetente: 'Jéssica Santos Fotografia'
      },
      analytics: {
        googleAnalytics: {
          ativo: false,
          trackingId: ''
        },
        facebookPixel: {
          ativo: false,
          pixelId: ''
        }
      },
      social: {
        instagram: 'https://instagram.com/jessicasantosfoto',
        facebook: '',
        youtube: ''
      }
    },
    visual: {
      tema: 'rose',
      logoUrl: '',
      corPrimaria: '#e11d48',
      corSecundaria: '#f43f5e',
      fontePrimaria: 'Inter',
      fonteSecundaria: 'Playfair Display'
    },
    textos: {
      heroTitle: 'Jéssica Santos Fotografia',
      heroSubtitle: 'Eternizando momentos únicos da maternidade e família com sensibilidade, técnica e muito amor.',
      sobreResumo: 'Há mais de 5 anos me dedico à arte de capturar momentos únicos e especiais.',
      chamadaContato: 'Vamos conversar sobre seu momento especial?',
      rodape: '© 2024 Jéssica Santos Fotografia. Todos os direitos reservados.'
    },
    seguranca: {
      senhaAdmin: 'admin123',
      sessaoExpira: 24,
      backupAutomatico: true,
      logAcessos: true,
      notificacaoLogin: true
    }
  }

  // Carregar configurações
  useEffect(() => {
    const loadConfig = () => {
      try {
        const savedConfig = localStorage.getItem('jessica_santos_config')
        if (savedConfig) {
          const parsedConfig = JSON.parse(savedConfig)
          setConfig({ ...defaultConfig, ...parsedConfig })
        } else {
          setConfig(defaultConfig)
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
        setConfig(defaultConfig)
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  // Salvar configurações
  const saveConfig = (newConfig) => {
    try {
      const configToSave = { ...config, ...newConfig }
      localStorage.setItem('jessica_santos_config', JSON.stringify(configToSave))
      setConfig(configToSave)
      return true
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
      return false
    }
  }

  // Resetar configurações
  const resetConfig = () => {
    localStorage.removeItem('jessica_santos_config')
    setConfig(defaultConfig)
  }

  // Exportar configurações
  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `jessica-santos-config-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Importar configurações
  const importConfig = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target.result)
          const mergedConfig = { ...defaultConfig, ...importedConfig }
          saveConfig(mergedConfig)
          resolve(true)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  // Obter configuração específica
  const getConfig = (path) => {
    if (!config) return null
    
    const keys = path.split('.')
    let value = config
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key]
      } else {
        return null
      }
    }
    
    return value
  }

  // Atualizar configuração específica
  const updateConfig = (path, value) => {
    if (!config) return false

    const keys = path.split('.')
    const newConfig = { ...config }
    let current = newConfig

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {}
      }
      current = current[key]
    }

    current[keys[keys.length - 1]] = value
    return saveConfig(newConfig)
  }

  const value = {
    config,
    loading,
    saveConfig,
    resetConfig,
    exportConfig,
    importConfig,
    getConfig,
    updateConfig,
    defaultConfig
  }

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}

// Hook para configurações específicas
export const useConfigValue = (path, defaultValue = null) => {
  const { getConfig } = useConfig()
  return getConfig(path) ?? defaultValue
}

// Hook para atualizar configurações
export const useConfigUpdate = () => {
  const { updateConfig } = useConfig()
  return updateConfig
}

// Utilitários de configuração
export const configUtils = {
  // Validar WhatsApp
  validateWhatsApp: (numero) => {
    const regex = /^55\d{10,11}$/
    return regex.test(numero.replace(/\D/g, ''))
  },

  // Validar email
  validateEmail: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  },

  // Formatar telefone
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    }
    return phone
  },

  // Calcular preço com desconto
  calculatePrice: (valor, desconto = 0) => {
    return valor * (1 - desconto / 100)
  },

  // Calcular parcelamento
  calculateInstallments: (valor, parcelas, juros = 0) => {
    if (parcelas <= 1) return valor
    const valorComJuros = valor * (1 + juros / 100)
    return valorComJuros / parcelas
  },

  // Verificar horário de funcionamento
  isBusinessHours: (config, date = new Date()) => {
    if (!config) return false
    
    const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']
    const currentDay = dayNames[date.getDay()]
    
    if (!config.negocio.diasFuncionamento.includes(currentDay)) {
      return false
    }

    const currentTime = date.getHours() * 60 + date.getMinutes()
    const [startHour, startMin] = config.negocio.horarioInicio.split(':').map(Number)
    const [endHour, endMin] = config.negocio.horarioFim.split(':').map(Number)
    
    const startTime = startHour * 60 + startMin
    const endTime = endHour * 60 + endMin
    
    return currentTime >= startTime && currentTime <= endTime
  }
}

