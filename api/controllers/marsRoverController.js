const fetchFromNASA = require('../utils/fetchFromNASA');

// Simple in-memory cache for rovers data
let roversCache = null;
let roversCacheTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

exports.getMarsRoverPhotos = async (req, res) => {
  try {
    const { rover } = req.params;
    const { sol, earth_date, camera, page } = req.query;
    const data = await fetchFromNASA(`/mars-photos/api/v1/rovers/${rover}/photos`, {
      sol, earth_date, camera, page
    });
    // Return the photos array in the expected format
    res.json({ photos: data.photos || [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Mars rover data' });
  }
};

exports.getMarsRovers = async (req, res) => {
  try {
    // Check cache first
    const now = Date.now();
    if (roversCache && (now - roversCacheTime) < CACHE_DURATION) {
      console.log('📦 Backend: Returning cached Mars rovers data');
      return res.json({ rovers: roversCache });
    }

    console.log('📡 Backend: Fetching Mars rovers from NASA API...');
    const data = await fetchFromNASA('/mars-photos/api/v1/rovers');
    console.log('✅ Backend: Mars rovers fetched successfully, returning', data.rovers?.length || 0, 'rovers');
    
    // Cache the data
    roversCache = data.rovers || [];
    roversCacheTime = now;
    
    // Return the rovers array in the expected format
    res.json({ rovers: roversCache });
  } catch (error) {
    console.error('❌ Backend: Error fetching Mars rovers:', error.message);
    res.status(500).json({ error: 'Failed to fetch Mars rovers data' });
  }
}; 