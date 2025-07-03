exports.healthCheck = (req, res) => {
  res.json({ status: 'OK', message: 'NASA Explorer API is running' });
}; 