require('dotenv').config();

module.exports = {
  NASA_API_BASE: 'https://api.nasa.gov',
  NASA_API_KEY: process.env.NASA_API_KEY || 'DEMO_KEY',
}; 