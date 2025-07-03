const fetchFromNASA = require('../utils/fetchFromNASA');

exports.getNEO = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const data = await fetchFromNASA('/neo/rest/v1/feed', {
      start_date, end_date
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
}; 