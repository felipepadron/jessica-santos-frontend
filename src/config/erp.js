// Configurações do ERP da Jéssica Santos
export const erpConfig = {
  // Configurações gerais
  app: {
    nome: 'Jessica Santos ERP',
    versao: '2.0.0',
    ambiente: 'producao'
  },

  // Módulos ativos
  modulos: {
    clientes: true,
    agendamento: true,
    financeiro: true,
    analytics: true,
    whatsapp: true,
    email: true,
    galeria: true
  },

  // Configurações de integração
  integracoes: {
    whatsapp: {
      ativo: true,
      numero: '5511999999999',
      apiKey: process.env.WHATSAPP_API_KEY || '',
      webhook: process.env.WHATSAPP_WEBHOOK || ''
    },
    email: {
      ativo: true,
      smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || 'atendimento@jessicasantosfotografia.com.br',
          pass: process.env.EMAIL_PASS || ''
        }
      }
    },
    analytics: {
      googleAnalytics: {
        ativo: true,
        trackingId: process.env.GA_TRACKING_ID || 'GA4-XXXXXXXXX'
      },
      facebookPixel: {
        ativo: true,
        pixelId: process.env.FB_PIXEL_ID || 'XXXXXXXXX'
      }
    },
    pagamentos: {
      pix: {
        ativo: true,
        chave: 'atendimento@jessicasantosfotografia.com.br'
      },
      cartao: {
        ativo: false, // Para implementar futuramente
        gateway: 'stripe' // ou 'mercadopago'
      }
    }
  },

  // Configurações de backup
  backup: {
    ativo: true,
    frequencia: 'diaria', // diaria, semanal, mensal
    destinos: ['local', 'drive'],
    retencao: 30 // dias
  },

  // Configurações de notificações
  notificacoes: {
    whatsapp: {
      novoAgendamento: true,
      lembreteCliente: true,
      confirmacaoPagamento: true,
      entregaFotos: true
    },
    email: {
      novoAgendamento: true,
      lembreteCliente: true,
      confirmacaoPagamento: true,
      entregaFotos: true,
      relatorioMensal: true
    },
    sistema: {
      backupRealizado: true,
      errosImportantes: true,
      atualizacoesDisponiveis: true
    }
  },

  // Configurações de segurança
  seguranca: {
    autenticacao: {
      tipo: 'jwt',
      expiracao: '24h',
      refreshToken: true
    },
    criptografia: {
      algoritmo: 'AES-256-GCM',
      chaveRotacao: '30d'
    },
    lgpd: {
      ativo: true,
      consentimento: true,
      anonimizacao: true,
      retencaoDados: '5anos'
    }
  }
}

// Estados padrão do sistema
export const estadosIniciais = {
  cliente: {
    id: null,
    nome: '',
    email: '',
    telefone: '',
    instagram: '',
    endereco: {},
    preferencias: {},
    historico: [],
    status: 'ativo',
    criadoEm: null,
    atualizadoEm: null
  },

  agendamento: {
    id: null,
    clienteId: null,
    servicoId: null,
    data: null,
    horario: null,
    duracao: null,
    valor: 0,
    sinal: 0,
    status: 'pendente', // pendente, confirmado, realizado, cancelado
    observacoes: '',
    criadoEm: null,
    atualizadoEm: null
  },

  pagamento: {
    id: null,
    agendamentoId: null,
    valor: 0,
    tipo: 'pix', // pix, cartao, dinheiro
    status: 'pendente', // pendente, pago, cancelado
    dataVencimento: null,
    dataPagamento: null,
    comprovante: null,
    criadoEm: null
  },

  servico: {
    id: null,
    categoria: 'ensaio', // ensaio, mentoria
    nome: '',
    preco: 0,
    duracao: '',
    descricao: '',
    inclui: [],
    ativo: true,
    criadoEm: null,
    atualizadoEm: null
  }
}

// Configurações de interface
export const uiConfig = {
  tema: {
    cores: {
      primaria: '#d946ef',
      secundaria: '#a855f7',
      acento: '#ec4899',
      fundo: '#fefefe',
      texto: '#1a1a1a'
    },
    fontes: {
      principal: 'Inter, sans-serif',
      titulo: 'Playfair Display, serif'
    }
  },
  
  dashboard: {
    widgets: [
      'agendamentosHoje',
      'receitaMensal',
      'clientesAtivos',
      'conversaoSite',
      'proximosVencimentos'
    ],
    atualizacao: 'tempo-real' // tempo-real, manual
  },

  tabelas: {
    itensPorPagina: 10,
    ordenacaoPadrao: 'criadoEm',
    direcaoPadrao: 'desc'
  }
}

