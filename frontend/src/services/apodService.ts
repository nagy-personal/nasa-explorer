import { APODData } from '../types/apod';
import { apiClient, API_CONFIG } from '../config/api';

export const fetchAPOD = async (date?: string): Promise<APODData> => {
  try {
    const params = date ? { date } : {};
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.APOD, { params });
    return response.data;
  } catch (error) {
    console.error('APOD fetch error:', error);
    throw error;
  }
}; 