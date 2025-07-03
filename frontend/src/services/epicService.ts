import { EPICImage } from '../types/epic';
import { apiClient, API_CONFIG } from '../config/api';

// Service for EPIC API calls
export const fetchEPIC = async (date: string): Promise<EPICImage[]> => {
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.EPIC, { 
      params: { date } 
    });
    const data = response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('EPIC fetch error:', error);
    throw error;
  }
}; 