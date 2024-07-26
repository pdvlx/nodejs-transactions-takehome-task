const { Op } = require('sequelize');
const { Contract } = require('../model');


exports.getContractById = async (profileId, contractId) => {
  return Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
  });
};

exports.getContractsForUser = async (profileId) => {
  return Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      status: { [Op.ne]: 'terminated' },
    },
  });
};