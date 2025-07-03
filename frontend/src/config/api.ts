import axios from 'axios';

// ============================================================================
// API Configuration
// ============================================================================

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'),
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000'),
  ENDPOINTS: {
    APOD: '/api/apod',
    EPIC: '/api/epic',
    MARS_ROVERS: '/api/mars-rovers',
    MARS_ROVER: '/api/mars-rover',
    NEO: '/api/neo',
    HEALTH: '/api/health'
  }
} as const;

// ============================================================================
// Axios Configuration
// ============================================================================

export const axiosConfig = {
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

// ============================================================================
// Axios Instance
// ============================================================================

export const apiClient = axios.create(axiosConfig);

// ============================================================================
// Request Interceptors
// ============================================================================

apiClient.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// ============================================================================
// Response Interceptors
// ============================================================================

apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.response?.statusText);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    if (!error.response) {
      throw new Error('Backend server is not running. Please start the backend server.');
    }
    
    throw error;
  }
);

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Build API URL with query parameters
 * @param endpoint - API endpoint path
 * @param params - Query parameters object
 * @returns Complete API URL string
 */
export const buildApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  const url = new URL(endpoint, API_CONFIG.BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
}; 