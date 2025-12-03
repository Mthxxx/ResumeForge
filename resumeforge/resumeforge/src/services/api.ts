// src/services/api.ts
// Serviço de API para comunicação com o backend

const API_URL = 'http://localhost:3001/api';

// Tipos
interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    provider: string;
  };
  token: string;
}

// Classe de erro da API
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Função helper para requisições
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || 'Erro na requisição');
  }

  return data;
}

// ==================== AUTH API ====================

export const authApi = {
  // Login com email/senha
  async login(credentials: LoginData): Promise<ApiResponse<AuthResponse>> {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Registro
  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login com Google
  async googleLogin(credential: string): Promise<ApiResponse<AuthResponse>> {
    return request<AuthResponse>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    });
  },

  // Obter usuário atual
  async getMe(): Promise<ApiResponse<{ user: AuthResponse['user'] }>> {
    return request('/auth/me');
  },

  // Logout
  async logout(): Promise<ApiResponse> {
    return request('/auth/logout', {
      method: 'POST',
    });
  },
};

export default { authApi };








