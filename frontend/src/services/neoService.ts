import { NEOData } from '../types/neo';
import { apiClient, API_CONFIG } from '../config/api';

// Service for NEO API calls
export const fetchNEO = async (startDate: string, endDate: string): Promise<NEOData> => {
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.NEO, { 
      params: { start_date: startDate, end_date: endDate } 
    });
    return response.data;
  } catch (error) {
    console.error('NEO fetch error:', error);
    throw error;
  }
}; 