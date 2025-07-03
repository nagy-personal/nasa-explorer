const fetchFromNASA = require('../utils/fetchFromNASA');

exports.getAPOD = async (req, res) => {
  try {
    const { date, start_date, end_date, count, thumbs } = req.query;
    const data = await fetchFromNASA('/planetary/apod', {
      date, start_date, end_date, count, thumbs
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
}; 