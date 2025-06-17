// Templates de contratos da Jéssica Santos
import { formatarData, formatarMoeda, formatarDataHora } from '@/utils/helpers'

export const contractTemplates = {
  ensaio_fotografico: {
    nome: 'Contrato de Ensaio Fotográfico',
    categoria: 'servicos',
    descricao: 'Contrato padrão para ensaios fotográficos individuais',
    generate: (data) => ({
      titulo: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS FOTOGRÁFICOS',
      conteudo: `
CONTRATANTE:
Nome: ${data.cliente.nome}
CPF: ${data.cliente.cpf || 'Não informado'}
E-mail: ${data.cliente.email}
Telefone: ${data.cliente.telefone}
Endereço: ${data.cliente.endereco || 'Não informado'}

CONTRATADA:
JÉSSICA SANTOS FOTOGRAFIA
CNPJ: 00.000.000/0001-00
E-mail: jessica@jessicasantos.com.br
Telefone: (11) 99999-9999
Endereço: Rua Luzia Maria Silva, 345 - Vila Mariana, SP

OBJETO DO CONTRATO:
Prestação de serviços fotográficos para ensaio ${data.agendamento?.servico || 'personalizado'}.

DATA E HORÁRIO:
${data.agendamento ? formatarDataHora(data.agendamento.data, data.agendamento.horario) : 'A definir'}

LOCAL:
${data.agendamento?.local || 'Estúdio - Vila Mariana, São Paulo/SP'}

VALOR E FORMA DE PAGAMENTO:
Valor total: ${formatarMoeda(data.valor)}
Sinal: ${formatarMoeda(data.sinal)} (não reembolsável)
${data.parcelas > 1 ? `Restante: ${data.parcelas - 1}x de ${formatarMoeda((data.valor - data.sinal) / (data.parcelas - 1))}` : 'Pagamento à vista'}

ENTREGÁVEIS:
${data.agendamento?.inclui ? data.agendamento.inclui.map(item => `• ${item}`).join('\n') : '• Conforme pacote contratado'}

PRAZO DE ENTREGA:
20 (vinte) dias úteis após a realização do ensaio.

POLÍTICA DE CANCELAMENTO:
• Cancelamento até 7 dias antes: reembolso total exceto sinal
• Cancelamento entre 3-7 dias: reembolso de 50%
• Cancelamento com menos de 3 dias: sem reembolso

REAGENDAMENTO:
• Permitido até 5 dias antes da data agendada
• Sujeito à disponibilidade de agenda
• Sem custos adicionais para o primeiro reagendamento

DIREITOS AUTORAIS:
A contratada mantém todos os direitos autorais das imagens.
O contratante pode usar as imagens para fins pessoais e redes sociais.
Uso comercial das imagens requer autorização prévia por escrito.

FORÇA MAIOR:
Em caso de força maior (doença, condições climáticas extremas, etc.), será oferecido reagendamento sem custos adicionais.

RESPONSABILIDADES DO CONTRATANTE:
• Comparecer pontualmente no horário agendado
• Trazer as roupas e acessórios combinados
• Seguir as orientações da fotógrafa durante o ensaio
• Comunicar qualquer necessidade especial com antecedência

RESPONSABILIDADES DA CONTRATADA:
• Realizar o ensaio conforme acordado
• Entregar as imagens editadas no prazo estabelecido
• Manter sigilo sobre informações pessoais do cliente
• Fornecer orientações técnicas durante o ensaio

${data.observacoes ? `OBSERVAÇÕES ESPECIAIS:\n${data.observacoes}` : ''}

FORO:
Fica eleito o foro da comarca de São Paulo/SP para dirimir questões oriundas deste contrato.

Local e Data: São Paulo, ${formatarData(data.dataGeracao)}

_________________________                    _________________________
    CONTRATANTE                                  CONTRATADA
   ${data.cliente.nome}                      Jéssica Santos
      `,
      clausulas: [
        'O presente contrato é regido pelas leis brasileiras',
        'Foro da comarca de São Paulo para dirimir questões',
        'Contrato válido por 90 dias a partir da assinatura',
        'Alterações devem ser feitas por escrito e assinadas por ambas as partes'
      ]
    })
  },

  mentoria_fotografica: {
    nome: 'Contrato de Mentoria Fotográfica',
    categoria: 'educacao',
    descricao: 'Contrato para serviços de mentoria e ensino fotográfico',
    generate: (data) => ({
      titulo: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE MENTORIA FOTOGRÁFICA',
      conteudo: `
CONTRATANTE:
Nome: ${data.cliente.nome}
CPF: ${data.cliente.cpf || 'Não informado'}
E-mail: ${data.cliente.email}
Telefone: ${data.cliente.telefone}

CONTRATADA:
JÉSSICA SANTOS FOTOGRAFIA
CNPJ: 00.000.000/0001-00

OBJETO DO CONTRATO:
Prestação de serviços de mentoria fotográfica ${data.agendamento?.servico || 'personalizada'}.

PROGRAMA DE MENTORIA:
${data.agendamento?.inclui ? data.agendamento.inclui.map(item => `• ${item}`).join('\n') : '• Conforme programa acordado'}

CRONOGRAMA:
${data.agendamento?.cronograma || 'Conforme programa contratado'}

VALOR E PAGAMENTO:
Valor total: ${formatarMoeda(data.valor)}
Forma de pagamento: ${data.parcelas > 1 ? `${data.parcelas}x de ${formatarMoeda(data.valor / data.parcelas)}` : 'À vista'}

DURAÇÃO:
${data.agendamento?.duracao || 'Conforme programa contratado'}

MODALIDADE:
${data.agendamento?.modalidade || 'Presencial no estúdio'}

POLÍTICA DE REPOSIÇÃO:
• Aulas perdidas podem ser reagendadas com 24h de antecedência
• Máximo de 2 reagendamentos por programa
• Aulas não reagendadas serão consideradas como realizadas

MATERIAL DIDÁTICO:
• Material digital incluso conforme programa
• Acesso à comunidade exclusiva de alunos
• Suporte via WhatsApp durante o período do programa

CERTIFICADO:
Será emitido certificado de participação ao final do programa, mediante:
• Frequência mínima de 80%
• Entrega dos exercícios propostos

POLÍTICA DE CANCELAMENTO:
• Cancelamento até 7 dias antes do início: reembolso de 80%
• Cancelamento após início: sem reembolso
• Interrupção por motivo de força maior: reagendamento sem custos

DIREITOS AUTORAIS:
• Material didático é de propriedade da contratada
• Proibida reprodução ou distribuição sem autorização
• Trabalhos desenvolvidos durante a mentoria pertencem ao aluno

${data.observacoes ? `OBSERVAÇÕES ESPECIAIS:\n${data.observacoes}` : ''}

Local e Data: São Paulo, ${formatarData(data.dataGeracao)}

_________________________                    _________________________
    CONTRATANTE                                  CONTRATADA
   ${data.cliente.nome}                      Jéssica Santos
      `
    })
  },

  evento_corporativo: {
    nome: 'Contrato de Evento Corporativo',
    categoria: 'corporativo',
    descricao: 'Contrato para cobertura fotográfica de eventos empresariais',
    generate: (data) => ({
      titulo: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS FOTOGRÁFICOS - EVENTO CORPORATIVO',
      conteudo: `
CONTRATANTE:
Empresa: ${data.cliente.empresa || data.cliente.nome}
CNPJ/CPF: ${data.cliente.cnpj || data.cliente.cpf}
Responsável: ${data.cliente.responsavel || data.cliente.nome}
E-mail: ${data.cliente.email}
Telefone: ${data.cliente.telefone}

CONTRATADA:
JÉSSICA SANTOS FOTOGRAFIA

EVENTO:
Tipo: ${data.agendamento?.tipoEvento || 'Evento corporativo'}
Data: ${data.agendamento ? formatarData(data.agendamento.data) : 'A definir'}
Horário: ${data.agendamento?.horario || 'A definir'}
Local: ${data.agendamento?.local || 'A definir'}
Duração estimada: ${data.agendamento?.duracao || 'Conforme acordado'}

SERVIÇOS INCLUSOS:
• Cobertura fotográfica completa do evento
• Edição profissional das imagens
• Entrega em galeria online protegida
${data.agendamento?.inclui ? data.agendamento.inclui.map(item => `• ${item}`).join('\n') : ''}

VALOR E PAGAMENTO:
Valor total: ${formatarMoeda(data.valor)}
Forma de pagamento: ${data.parcelas > 1 ? `${data.parcelas}x de ${formatarMoeda(data.valor / data.parcelas)}` : 'À vista'}
${data.sinal ? `Sinal: ${formatarMoeda(data.sinal)} (confirmação do evento)` : ''}

ENTREGA:
15 (quinze) dias úteis após o evento.

DIREITOS DE USO:
• Imagens podem ser utilizadas para divulgação da empresa contratante
• Créditos fotográficos devem ser mantidos
• Uso em materiais promocionais permitido
• Cessão de direitos para terceiros requer autorização

RESPONSABILIDADES DA CONTRATADA:
• Chegar com 30 minutos de antecedência
• Equipamentos de backup disponíveis
• Discrição e profissionalismo durante o evento
• Entrega conforme especificações acordadas

RESPONSABILIDADES DO CONTRATANTE:
• Fornecer cronograma detalhado do evento
• Designar pessoa de contato no local
• Garantir acesso aos locais de cobertura
• Comunicar restrições ou protocolos especiais

CANCELAMENTO:
• Até 15 dias antes: reembolso total
• Entre 7-15 dias: reembolso de 50%
• Menos de 7 dias: sem reembolso

FORÇA MAIOR:
Eventos cancelados por força maior serão reagendados sem custos adicionais.

${data.observacoes ? `OBSERVAÇÕES ESPECIAIS:\n${data.observacoes}` : ''}

Local e Data: São Paulo, ${formatarData(data.dataGeracao)}

_________________________                    _________________________
    CONTRATANTE                                  CONTRATADA
      `
    })
  },

  casamento: {
    nome: 'Contrato de Casamento',
    categoria: 'eventos',
    descricao: 'Contrato específico para cobertura de casamentos',
    generate: (data) => ({
      titulo: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS FOTOGRÁFICOS - CASAMENTO',
      conteudo: `
CONTRATANTES:
Noivo: ${data.cliente.noivo || data.cliente.nome}
Noiva: ${data.cliente.noiva || ''}
CPF Noivo: ${data.cliente.cpfNoivo || data.cliente.cpf}
CPF Noiva: ${data.cliente.cpfNoiva || ''}
E-mail: ${data.cliente.email}
Telefone: ${data.cliente.telefone}

CONTRATADA:
JÉSSICA SANTOS FOTOGRAFIA

EVENTO:
Data do Casamento: ${data.agendamento ? formatarData(data.agendamento.data) : 'A definir'}
Cerimônia: ${data.agendamento?.localCerimonia || 'A definir'}
Recepção: ${data.agendamento?.localRecepcao || 'A definir'}
Horário de início: ${data.agendamento?.horarioInicio || 'A definir'}
Horário de término: ${data.agendamento?.horarioTermino || 'A definir'}

COBERTURA INCLUSA:
${data.agendamento?.inclui ? data.agendamento.inclui.map(item => `• ${item}`).join('\n') : `
• Making of da noiva
• Cerimônia completa
• Sessão de fotos dos noivos
• Recepção e festa
• Entrega em galeria online`}

VALOR E PAGAMENTO:
Valor total: ${formatarMoeda(data.valor)}
Sinal: ${formatarMoeda(data.sinal)} (confirmação da data)
${data.parcelas > 1 ? `Parcelas: ${data.parcelas - 1}x de ${formatarMoeda((data.valor - data.sinal) / (data.parcelas - 1))}` : ''}
Último pagamento: até 30 dias antes do casamento

ENTREGA:
• Prévia: 7 dias úteis
• Galeria completa: 45 dias úteis
• Álbum (se contratado): 60 dias úteis

POLÍTICA DE CANCELAMENTO:
• Até 6 meses antes: reembolso de 70%
• Entre 3-6 meses: reembolso de 50%
• Menos de 3 meses: sem reembolso
• Reagendamento: permitido uma vez sem custos

DIREITOS AUTORAIS:
• Imagens podem ser usadas pelos noivos para fins pessoais
• Autorização para publicação em redes sociais da fotógrafa
• Uso comercial requer autorização específica

RESPONSABILIDADES DOS CONTRATANTES:
• Fornecer cronograma detalhado do evento
• Comunicar tradições familiares ou religiosas
• Designar pessoa de contato no dia
• Informar sobre restrições de fotografia

CLÁUSULAS ESPECIAIS:
• Em caso de chuva, cobertura será adaptada aos locais disponíveis
• Equipamentos de backup garantem continuidade do serviço
• Fotógrafa reserva direito de usar imagens para portfólio

${data.observacoes ? `OBSERVAÇÕES ESPECIAIS:\n${data.observacoes}` : ''}

Local e Data: São Paulo, ${formatarData(data.dataGeracao)}

_________________________    _________________________    _________________________
       NOIVO                        NOIVA                    CONTRATADA
                                                           Jéssica Santos
      `
    })
  }
}

export default contractTemplates

