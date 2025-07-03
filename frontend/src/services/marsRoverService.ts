import { Rover, Photo } from '../types/marsRover';
import { apiClient, API_CONFIG } from '../config/api';

// Service for Mars Rover API calls
export const fetchRovers = async (): Promise<Rover[]> => {
  console.log('🌐 Frontend: Fetching Mars rovers from backend...');
  try {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.MARS_ROVERS);
    const data = response.data;
    console.log('✅ Frontend: Mars rovers fetched successfully, got', data.rovers?.length || 0, 'rovers');
    return data.rovers;
  } catch (error) {
    console.error('Mars rovers fetch error:', error);
    throw error;
  }
};

export const fetchPhotos = async (roverName: string, earthDate?: string, camera?: string): Promise<Photo[]> => {
  try {
    const params: Record<string, string> = {};
    if (earthDate) params.earth_date = earthDate;
    if (camera) params.camera = camera;

    const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.MARS_ROVER}/${roverName}`, { params });
    const data = response.data;
    return data.photos || [];
  } catch (error) {
    console.error('Mars photos fetch error:', error);
    throw error;
  }
}; 