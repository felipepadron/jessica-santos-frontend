// Serviço de ensaios
import apiService from './apiService';

class EnsaioService {
  // Listar todos os ensaios
  async getAll(filtros = {}) {
    try {
      const response = await apiService.get('/private/ensaios', filtros);
      
      if (response.success) {
        return {
          success: true,
          data: response.data.ensaios || [],
          total: response.data.total || 0
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao buscar ensaios'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar ensaios'
      };
    }
  }

  // Buscar ensaio por ID
  async getById(id) {
    try {
      const response = await apiService.get(`/private/ensaios/${id}`);
      
      if (response.success) {
        return {
          success: true,
          data: response.data
        };
      }

      return {
        success: false,
        message: response.message || 'Ensaio não encontrado'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar ensaio'
      };
    }
  }

  // Criar novo ensaio
  async create(ensaioData) {
    try {
      const response = await apiService.post('/private/ensaios', ensaioData);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Ensaio criado com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao criar ensaio'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao criar ensaio'
      };
    }
  }

  // Atualizar ensaio
  async update(id, ensaioData) {
    try {
      const response = await apiService.put(`/private/ensaios/${id}`, ensaioData);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Ensaio atualizado com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao atualizar ensaio'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao atualizar ensaio'
      };
    }
  }

  // Deletar ensaio
  async delete(id) {
    try {
      const response = await apiService.delete(`/private/ensaios/${id}`);
      
      if (response.success) {
        return {
          success: true,
          message: 'Ensaio removido com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao remover ensaio'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao remover ensaio'
      };
    }
  }

  // Upload de fotos para ensaio
  async uploadFotos(ensaioId, formData) {
    try {
      const response = await apiService.post(`/private/ensaios/${ensaioId}/fotos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Fotos enviadas com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao enviar fotos'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao enviar fotos'
      };
    }
  }

  // Listar fotos do ensaio
  async getFotos(ensaioId, params = {}) {
    try {
      const response = await apiService.get(`/private/ensaios/${ensaioId}/fotos`, { params });
      
      if (response.success) {
        return {
          success: true,
          data: response.data
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao buscar fotos'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar fotos'
      };
    }
  }

  // Atualizar status da foto
  async updateStatusFoto(fotoId, dados) {
    try {
      const response = await apiService.put(`/private/fotos/${fotoId}`, dados);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Status da foto atualizado'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao atualizar foto'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao atualizar foto'
      };
    }
  }

  // Deletar foto
  async deleteFoto(fotoId) {
    try {
      const response = await apiService.delete(`/private/fotos/${fotoId}`);
      
      if (response.success) {
        return {
          success: true,
          message: 'Foto deletada com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao deletar foto'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao deletar foto'
      };
    }
  }

  // Finalizar edição do ensaio
  async finalizarEdicao(id, dadosFinalizacao) {
    try {
      const response = await apiService.patch(`/private/ensaios/${id}/finalizar`, dadosFinalizacao);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Edição finalizada com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao finalizar edição'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao finalizar edição'
      };
    }
  }

  // Obter estatísticas de ensaios
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
        const ensaios = response.data;
        
        const estatisticas = {
          total: ensaios.length,
          emAndamento: ensaios.filter(e => e.statusEdicao === 'em_andamento').length,
          finalizados: ensaios.filter(e => e.statusEdicao === 'finalizado').length,
          entregues: ensaios.filter(e => e.statusEdicao === 'entregue').length,
          totalFotos: ensaios.reduce((total, e) => total + (e.totalFotos || 0), 0),
          fotosEditadas: ensaios.reduce((total, e) => total + (e.fotosEditadas || 0), 0),
          fotosEntregues: ensaios.reduce((total, e) => total + (e.fotosEntregues || 0), 0)
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

  // Obter ensaios recentes
  async getRecentes(limite = 5) {
    try {
      const response = await this.getAll();
      
      if (response.success) {
        const ensaiosRecentes = response.data
          .sort((a, b) => new Date(b.dataRealizacao) - new Date(a.dataRealizacao))
          .slice(0, limite);

        return {
          success: true,
          data: ensaiosRecentes
        };
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar ensaios recentes'
      };
    }
  }

  // Obter tipos de ensaio mais populares
  async getTiposPopulares() {
    try {
      const response = await this.getAll();
      
      if (response.success) {
        const contadorTipos = {};
        
        response.data.forEach(ensaio => {
          const tipo = ensaio.tipoEnsaio;
          contadorTipos[tipo] = (contadorTipos[tipo] || 0) + 1;
        });

        const tiposOrdenados = Object.entries(contadorTipos)
          .map(([tipo, quantidade]) => ({ tipo, quantidade }))
          .sort((a, b) => b.quantidade - a.quantidade);

        return {
          success: true,
          data: tiposOrdenados
        };
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar tipos populares'
      };
    }
  }
}

// Instância singleton do serviço
const ensaioService = new EnsaioService();

export default ensaioService;

