const { sequelize, Profile } = require('../model');
const logger = require('../utils/logger');
const { getUnpaidJobs } = require('./job.service');

// Self deposit.
exports.depositBalance = async (userId, amount) => {
  const transaction = await sequelize.transaction();

  try {
    // Retrieve the profile
    const profile = await Profile.findOne({
      where: { id: userId, type: 'client' },
    });

    if (!profile) {
      logger.info(`Profile not found for user ${userId}`);
      throw new Error('Profile not found');
    }

    // Get the total price of unpaid jobs
    const unpaidJobs = await getUnpaidJobs(userId);
    const totalUnpaid = unpaidJobs.reduce(
      (total, job) => total + parseFloat(job.price),
      0
    );

    // Check if the deposit is more than 25% of the total unpaid jobs
    if (amount > totalUnpaid * 0.25) {
      logger.info(
        `Deposit exceeds 25% of total unpaid jobs for user ${userId}`
      );
      throw new Error('Deposit exceeds 25% of total unpaid jobs');
    }

    // Update the balance
    profile.balance += amount;
    await profile.save({ transaction });

    // Commit the transaction
    await transaction.commit();

    logger.info(`Deposited ${amount} into balance for user ${userId}`);
    return { success: true };
  } catch (error) {
    // Rollback the transaction
    await transaction.rollback();

    logger.info(
      `Failed to deposit balance for user ${userId}: ${error.message}`
    );
    throw error;
  }
};

// I WILL DELETE THIS BEFORE FINALIZING THE CODE.
exports.getBalance = async (userId) => {
  try {
    const profile = await Profile.findByPk(userId);

    if (!profile) {
      return {
        success: false,
        message: 'Profile not found',
      };
    }

    return {
      success: true,
      balance: profile.balance,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An error occurred while fetching the balance',
    };
  }
};
