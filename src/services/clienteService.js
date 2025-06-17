// Serviço de clientes
import apiService from './apiService';

class ClienteService {
  // Listar todos os clientes
  async getAll() {
    try {
      const response = await apiService.get('/private/clientes');
      
      if (response.success) {
        return {
          success: true,
          data: response.data.clientes || [],
          total: response.data.total || 0
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao buscar clientes'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar clientes'
      };
    }
  }

  // Buscar cliente por ID
  async getById(id) {
    try {
      const response = await apiService.get(`/private/clientes/${id}`);
      
      if (response.success) {
        return {
          success: true,
          data: response.data
        };
      }

      return {
        success: false,
        message: response.message || 'Cliente não encontrado'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao buscar cliente'
      };
    }
  }

  // Criar novo cliente
  async create(clienteData) {
    try {
      const response = await apiService.post('/private/clientes', clienteData);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Cliente criado com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao criar cliente'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao criar cliente'
      };
    }
  }

  // Atualizar cliente
  async update(id, clienteData) {
    try {
      const response = await apiService.put(`/private/clientes/${id}`, clienteData);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Cliente atualizado com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao atualizar cliente'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao atualizar cliente'
      };
    }
  }

  // Deletar cliente
  async delete(id) {
    try {
      const response = await apiService.delete(`/private/clientes/${id}`);
      
      if (response.success) {
        return {
          success: true,
          message: 'Cliente removido com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro ao remover cliente'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro ao remover cliente'
      };
    }
  }

  // Buscar clientes por termo
  async search(termo) {
    try {
      const response = await apiService.get('/private/clientes/search', { q: termo });
      
      if (response.success) {
        return {
          success: true,
          data: response.data.clientes || [],
          total: response.data.total || 0
        };
      }

      return {
        success: false,
        message: response.message || 'Erro na busca'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro na busca'
      };
    }
  }
}

// Instância singleton do serviço
const clienteService = new ClienteService();

export default clienteService;

