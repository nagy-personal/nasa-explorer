const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import the existing routes
const routes = require('../backend/src/routes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Use the existing routes
app.use('/api', routes);

// Health check (fallback)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'NASA Explorer API is running',
    timestamp: new Date().toISOString()
  });
});

// Catch-all error handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel
module.exports = app; 