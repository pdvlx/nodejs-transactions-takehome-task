const { Op } = require('sequelize');
const { Contract } = require('../model');


const getContractById = async (profileId, contractId) => {
  return Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
  });
};

const getContractsForUser = async (profileId) => {
  return Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      status: { [Op.ne]: 'terminated' },
    },
  });
};

module.exports = { getContractById, getContractsForUser };
