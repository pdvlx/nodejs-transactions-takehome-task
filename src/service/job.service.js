const { Op } = require('sequelize');
const { Job, Contract, Profile, sequelize } = require('../model');
const logger = require('../utils/logger');

exports.getUnpaidJobs = async (profileId) => {
  try {
    // Retrieve the contracts related to the profile
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
        status: 'in_progress',
      },
      include: [
        {
          model: Job,
          where: { paid: false },
        },
      ],
    });

    const unpaidJobs = contracts.reduce(
      (jobs, contract) => jobs.concat(contract.Jobs),
      []
    );
    return unpaidJobs;
  } catch (error) {
    console.error('Error getting unpaid jobs:', error);
    throw error;
  }
};

exports.payForJob = async (profileId, jobId) => {
  const transaction = await sequelize.transaction();

  try {
    const job = await Job.findByPk(jobId, {
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    const contract = await Contract.findByPk(job.ContractId, {
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (contract.status !== 'in_progress') {
      throw new Error('Contract not active');
    }

    const client = await Profile.findByPk(contract.ClientId, {
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    const contractor = await Profile.findByPk(contract.ContractorId, {
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (client.balance < job.price) {
      throw new Error('Insufficient funds!');
    }

    if (client.id !== profileId) {
      throw new Error('Unauthorized!');
    }

    logger.info(
      `Payment initiated: Client [ID: ${client.id}] pays Contractor [ID: ${contractor.id}] for Job [ID: ${job.id}], Amount: ${job.price}`
    );

    client.balance -= job.price;
    contractor.balance += job.price;
    job.paid = true;

    await client.save({ transaction });
    await contractor.save({ transaction });
    await job.save({ transaction });

    logger.info(
      `Payment successful: Client [ID: ${client.id}] paid Contractor [ID: ${contractor.id}] for Job [ID: ${job.id}], Amount: ${job.price}`
    );

    await transaction.commit();
  } catch (err) {
    logger.error(
      `Payment failed: Client [ID: ${profileId}] for Job [ID: ${jobId}], Error: ${err.message}`
    );
    await transaction.rollback();
    throw err;
  }
};
