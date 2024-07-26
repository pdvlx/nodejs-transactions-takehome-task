const {
  getBestProfession,
  getBestClients,
} = require('../service/admin.report.service');

exports.getBestProfessionController = async (req, res) => {
  const { start, end } = req.query;
  const result = await getBestProfession(start, end);
  res.json(result);
};

exports.getBestClientsController = async (req, res) => {
  const { start, end, limit } = req.query;
  const result = await getBestClients(start, end, limit || 2);
  res.json(result);
};
