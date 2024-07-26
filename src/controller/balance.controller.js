const { depositBalance, getBalance } = require('../service/balance.service');
const logger = require('../utils/logger')

exports.depositBalanceController = async (req, res) => {
  try {
    const { userId } = req.params;
    const authenticatedUserId = req.profile.id;

    if (userId != authenticatedUserId) {
      logger.warn(`Unauthorized deposit attempt by user ${authenticatedUserId} to account ${userId}`);
      res.status(403).send({ message: 'You are not authorized to deposit money into this account' });
      return;
    }

    const { amount } = req.body;

    const result = await depositBalance(userId, parseFloat(amount));

    if (result.success) {
      res.status(200).send({ message: 'Deposit successful' });
    } else {
      res.status(400).send({ message: 'Deposit failed' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// I WILL DELETE THIS
exports.getBalanceController = async (req, res) => {
  try {
    const userId = req.profile.id; 
    const result = await getBalance(userId);

    if (result.success) {
      res.status(200).send({ balance: result.balance });
    } else {
      res.status(404).send({ message: result.message });
    }
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while fetching the balance' });
  }
};