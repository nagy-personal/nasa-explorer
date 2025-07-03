const axios = require('axios');
const { NASA_API_BASE, NASA_API_KEY } = require('../config/nasa');

const fetchFromNASA = async (endpoint, params = {}) => {
  const url = `${NASA_API_BASE}${endpoint}`;
  const queryParams = { ...params, api_key: NASA_API_KEY };
  try {
    console.log('🌐 Fetching from NASA API:', endpoint);
    const response = await axios.get(url, { params: queryParams });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`NASA API Error ${error.response.status}:`, error.response.data);
      throw new Error(`NASA API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else {
      console.error('Error fetching from NASA API:', error.message);
      throw error;
    }
  }
};

module.exports = fetchFromNASA; 