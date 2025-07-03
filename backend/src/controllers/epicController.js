const fetchFromNASA = require('../utils/fetchFromNASA');

exports.getEPIC = async (req, res) => {
  try {
    const { date } = req.query;
    const endpoint = date ? `/EPIC/api/natural/date/${date}` : '/EPIC/api/natural/latest';
    const data = await fetchFromNASA(endpoint);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch EPIC data' });
  }
}; 