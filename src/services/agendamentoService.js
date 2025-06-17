// Serviço de agendamentos
import apiService from './apiService';

class AgendamentoService {
  // Listar todos os agendamentos (admin)
  async getAll(filtros = {}) {
    try {
      const response = await apiService.get('/private/agendamentos', filtros);
      
      if (response.success) {
        return {
          success: true,
          data: response.data.agendamentos || [],
          total: response.data.total || 0
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao buscar agendamentos'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar agendamentos'
      };
    }
  }

  // Buscar agendamento por ID
  async getById(id) {
    try {
      const response = await apiService.get(`/private/agendamentos/${id}`);
      
      if (response.success) {
        return {
          success: true,
          data: response.data
        };
      }

      return {
        success: false,
        message: response.message || 'Agendamento não encontrado'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar agendamento'
      };
    }
  }

  // Criar novo agendamento (público)
  async create(agendamentoData) {
    try {
      const response = await apiService.post('/agendamentos', agendamentoData);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Agendamento criado com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao criar agendamento'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao criar agendamento'
      };
    }
  }

  // Atualizar agendamento (admin)
  async update(id, agendamentoData) {
    try {
      const response = await apiService.put(`/private/agendamentos/${id}`, agendamentoData);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Agendamento atualizado com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao atualizar agendamento'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao atualizar agendamento'
      };
    }
  }

  // Deletar agendamento (admin)
  async delete(id) {
    try {
      const response = await apiService.delete(`/private/agendamentos/${id}`);
      
      if (response.success) {
        return {
          success: true,
          message: 'Agendamento removido com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao remover agendamento'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao remover agendamento'
      };
    }
  }

  // Confirmar agendamento (admin)
  async confirmar(id) {
    try {
      const response = await apiService.patch(`/private/agendamentos/${id}/confirmar`);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Agendamento confirmado com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao confirmar agendamento'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao confirmar agendamento'
      };
    }
  }

  // Verificar disponibilidade (público)
  async verificarDisponibilidade(data, duracao = 60) {
    try {
      const response = await apiService.get('/agendamentos/disponibilidade', {
        data,
        duracao
      });
      
      if (response.success) {
        return {
          success: true,
          data: response.data
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao verificar disponibilidade'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao verificar disponibilidade'
      };
    }
  }

  // Obter agendamentos para calendário
  async getParaCalendario(dataInicio, dataFim) {
    try {
      const response = await apiService.get('/private/agendamentos', {
        dataInicio,
        dataFim
      });
      
      if (response.success) {
        // Converter para formato do calendário
        const eventos = response.data.agendamentos.map(agendamento => ({
          id: agendamento.id,
          title: `${agendamento.tipoEnsaio} - ${agendamento.cliente?.nome}`,
          start: agendamento.dataHora,
          end: new Date(new Date(agendamento.dataHora).getTime() + (agendamento.duracaoMinutos * 60 * 1000)),
          backgroundColor: this.getCorPorStatus(agendamento.status),
          borderColor: this.getCorPorStatus(agendamento.status),
          extendedProps: {
            agendamento
          }
        }));

        return {
          success: true,
          data: eventos
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao buscar agendamentos'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar agendamentos'
      };
    }
  }

  // Obter cor por status
  getCorPorStatus(status) {
    const cores = {
      'agendado': '#fbbf24', // amarelo
      'confirmado': '#10b981', // verde
      'realizado': '#3b82f6', // azul
      'cancelado': '#ef4444', // vermelho
      'reagendado': '#f59e0b' // laranja
    };

    return cores[status] || '#6b7280'; // cinza padrão
  }

  // Obter estatísticas de agendamentos
  async getEstatisticas(periodo = 'mes') {
    try {
      const agora = new Date();
      let dataInicio, dataFim;

      switch (periodo) {
        case 'semana':
          dataInicio = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - 7);
          dataFim = agora;
          break;
        case 'mes':
          dataInicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
          dataFim = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);
          break;
        case 'ano':
          dataInicio = new Date(agora.getFullYear(), 0, 1);
          dataFim = new Date(agora.getFullYear(), 11, 31);
          break;
        default:
          dataInicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
          dataFim = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);
      }

      const response = await this.getAll({
        dataInicio: dataInicio.toISOString(),
        dataFim: dataFim.toISOString()
      });

      if (response.success) {
        const agendamentos = response.data;
        
        const estatisticas = {
          total: agendamentos.length,
          confirmados: agendamentos.filter(a => a.status === 'confirmado').length,
          realizados: agendamentos.filter(a => a.status === 'realizado').length,
          cancelados: agendamentos.filter(a => a.status === 'cancelado').length,
          receita: agendamentos
            .filter(a => a.status === 'realizado')
            .reduce((total, a) => total + (a.valorPago || 0), 0),
          receitaPrevista: agendamentos
            .filter(a => ['agendado', 'confirmado'].includes(a.status))
            .reduce((total, a) => total + a.valor, 0)
        };

        return {
          success: true,
          data: estatisticas
        };
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao calcular estatísticas'
      };
    }
  }
}

// Instância singleton do serviço
const agendamentoService = new AgendamentoService();

export default agendamentoService;

