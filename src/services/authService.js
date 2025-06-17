// Serviço de autenticação
import apiService from './apiService';

class AuthService {
  // Login do usuário
  async login(email, password) {
    try {
      const response = await apiService.post('/auth/login', {
        email,
        password
      });

      console.log('Resposta do login:', response);

      if (response.success && response.token) {
        // Armazenar token (corrigido para usar token diretamente)
        apiService.setToken(response.token);
        
        // Armazenar dados do usuário
        localStorage.setItem('user', JSON.stringify(response.user));
        
        return {
          success: true,
          user: response.user,
          token: response.token
        };
      }

      return {
        success: false,
        message: response.message || 'Erro no login'
      };
    } catch (error) {
      console.error('Erro no authService.login:', error);
      return {
        success: false,
        message: error.message || 'Erro no login'
      };
    }
  }

  // Logout do usuário
  async logout() {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      // Limpar dados locais
      apiService.setToken(null);
      localStorage.removeItem('user');
    }
  }

  // Verificar se usuário está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Obter usuário atual
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Validar token
  async validateToken() {
    try {
      const response = await apiService.post('/auth/validate');
      return response.success;
    } catch (error) {
      return false;
    }
  }

  // Registrar novo usuário
  async register(userData) {
    try {
      const response = await apiService.post('/auth/register', userData);
      
      if (response.success) {
        return {
          success: true,
          message: 'Usuário registrado com sucesso'
        };
      }

      return {
        success: false,
        message: response.message || 'Erro no registro'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erro no registro'
      };
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await apiService.post('/auth/refresh');
      
      if (response.success && response.data.token) {
        apiService.setToken(response.data.token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      return false;
    }
  }
}

// Instância singleton do serviço
const authService = new AuthService();

export default authService;

