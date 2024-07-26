const {
  getBestProfession,
  getBestClients,
} = require('../service/admin.report.service');

const { validateDateFormat, validateAmount } = require('../validate');

exports.getBestProfessionController = async (req, res) => {
  const { start, end } = req.query;

  try {
    validateDateFormat(start);
    validateDateFormat(end);

    const result = await getBestProfession(start, end);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBestClientsController = async (req, res) => {
  const { start, end, limit } = req.query;

  try {
    validateDateFormat(start);
    validateDateFormat(end);

    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (isNaN(parsedLimit) || parsedLimit <= 0) {
        throw new Error('Limit must be a positive integer.');
      }
    }

    const result = await getBestClients(start, end, limit || 2);
    res.json(result);
  } catch (error) {
    // Handle the error and send an error response to the client
    res.status(400).json({ error: error.message });
  }
};
