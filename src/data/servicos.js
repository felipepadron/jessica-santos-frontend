// Dados dos serviços da Jéssica Santos
export const servicos = {
  ensaios: [
    {
      id: 'essencial',
      nome: 'Ensaio Essencial',
      preco: 1800,
      duracao: '1h',
      fotos: 15,
      video: false,
      kit: false,
      descricao: 'Perfeito para quem quer experimentar a experiência única de um ensaio profissional.',
      inclui: [
        '15 fotos editadas profissionalmente',
        '1 hora de sessão fotográfica',
        'Direção emocional personalizada',
        'Galeria privada online',
        'Entrega em até 20 dias úteis'
      ],
      destaque: false
    },
    {
      id: 'intenso',
      nome: 'Ensaio Intenso',
      preco: 2400,
      duracao: '1h30',
      fotos: 25,
      video: true,
      kit: false,
      descricao: 'A escolha mais popular! Mais tempo para explorar diferentes looks e emoções.',
      inclui: [
        '25 fotos editadas profissionalmente',
        '1h30 de sessão fotográfica',
        'Vídeo de 30 segundos',
        'Direção emocional personalizada',
        'Galeria privada online',
        'Entrega em até 20 dias úteis'
      ],
      destaque: true
    },
    {
      id: 'completo',
      nome: 'Ensaio Completo',
      preco: 3200,
      duracao: '2h30',
      fotos: 40,
      video: true,
      kit: true,
      descricao: 'A experiência completa e transformadora. Para quem quer viver intensamente cada momento.',
      inclui: [
        '40 fotos editadas profissionalmente',
        '2h30 de sessão fotográfica',
        'Vídeo personalizado',
        'Kit especial de lembranças',
        'Direção emocional personalizada',
        'Galeria privada online',
        'Entrega em até 20 dias úteis'
      ],
      destaque: false
    }
  ],
  mentorias: [
    {
      id: 'essencial',
      nome: 'Mentoria Essencial',
      preco: 950,
      duracao: '1h30',
      encontros: 1,
      descricao: 'Sessão única focada em autoconhecimento e empoderamento feminino.',
      inclui: [
        'Sessão de 1h30 personalizada',
        'Análise de perfil comportamental',
        'Plano de ação individual',
        'Material de apoio exclusivo',
        'Suporte via WhatsApp por 7 dias'
      ],
      destaque: false
    },
    {
      id: 'estrategica',
      nome: 'Mentoria Estratégica',
      preco: 2800,
      duracao: '3 encontros',
      encontros: 3,
      descricao: 'Programa quinzenal para transformação pessoal e profissional.',
      inclui: [
        '3 encontros quinzenais',
        'Plano estratégico personalizado',
        'Acompanhamento de resultados',
        'Material exclusivo de cada módulo',
        'Suporte via WhatsApp durante todo o programa'
      ],
      destaque: true
    },
    {
      id: 'transformadora',
      nome: 'Mentoria Transformadora',
      preco: 4800,
      duracao: '6 encontros',
      encontros: 6,
      descricao: 'Jornada completa de transformação e empoderamento feminino.',
      inclui: [
        'Programa completo de 6 encontros',
        'Transformação pessoal e profissional',
        'Acompanhamento individual contínuo',
        'Kit completo de materiais',
        'Suporte ilimitado via WhatsApp',
        'Certificado de conclusão'
      ],
      destaque: false
    }
  ]
}

// Políticas comerciais
export const politicas = {
  sinal: 300,
  cancelamento: 7, // dias mínimos
  reagendamento: 5, // dias mínimos
  parcelamento: 3, // máximo de parcelas
  entrega: 20, // dias úteis
  forcaMaior: true // permite reagendamento em casos especiais
}

// Horários de funcionamento
export const horarios = {
  segunda: { inicio: '10:00', fim: '18:00' },
  terca: { inicio: '10:00', fim: '18:00' },
  quarta: { inicio: '10:00', fim: '18:00' },
  quinta: { inicio: '10:00', fim: '18:00' },
  sexta: { inicio: '10:00', fim: '18:00' },
  sabado: { inicio: '09:00', fim: '13:00' },
  domingo: { fechado: true, especial: 'Apenas pacotes especiais' }
}

// Informações de contato
export const contato = {
  whatsapp: '5511999999999',
  email: 'atendimento@jessicasantosfotografia.com.br',
  instagram: '@jessicasantos.foto',
  endereco: {
    rua: 'Rua Luzia Maria Silva, 345',
    bairro: 'Vila Mariana',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '04142-000'
  }
}

// Processo de atendimento
export const processoAtendimento = [
  {
    etapa: 1,
    titulo: 'Recepção Humanizada',
    descricao: 'Recepção da cliente com mensagem humanizada via WhatsApp ou Instagram'
  },
  {
    etapa: 2,
    titulo: 'Identificação da Demanda',
    descricao: 'Identificação da demanda: ensaio, mentoria ou dúvida'
  },
  {
    etapa: 3,
    titulo: 'Apresentação Personalizada',
    descricao: 'Apresentação personalizada dos pacotes disponíveis'
  },
  {
    etapa: 4,
    titulo: 'Proposta Detalhada',
    descricao: 'Envio de proposta em PDF ou mensagem com detalhes'
  },
  {
    etapa: 5,
    titulo: 'Confirmação e Agendamento',
    descricao: 'Confirmação e agendamento via calendário'
  },
  {
    etapa: 6,
    titulo: 'Pré-Ensaio',
    descricao: 'Envio de orientações + checklist personalizado'
  },
  {
    etapa: 7,
    titulo: 'Dia do Ensaio',
    descricao: 'Acolhimento emocional e experiência completa'
  },
  {
    etapa: 8,
    titulo: 'Pós-Atendimento',
    descricao: 'Envio do material + mensagem de carinho'
  }
]

