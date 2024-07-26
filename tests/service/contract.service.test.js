// tests/contractService.test.js

const contractService = require('../../src/service/contract.service');
const { Contract, Profile } = require('../../src/model'); 
const { Op } = require('sequelize'); 

jest.mock('../../src/model', () => {
  const { DataTypes } = require('sequelize');

  const mockedProfile = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    hasMany: jest.fn(),
  };

  const mockedContract = {
    findOne: jest.fn(),
    findAll: jest.fn(),
  };

  // Define associations for the mocked models
  mockedProfile.hasMany.mockImplementation((model, options) => {
    const association = { ...options, target: model };
    mockedProfile.associations[options.as] = association;
    return association;
  });

  mockedContract.belongsTo = jest.fn((model, options) => {
    const association = { ...options, target: model };
    mockedContract.associations[options.as] = association;
    return association;
  });

  return {
    Profile: mockedProfile,
    Contract: mockedContract,
  };
});

describe('Contract Service', () => {
  describe('getContractById', () => {
    it('should return the contract if it belongs to the profile', async () => {
      const profileId = 1;
      const contractId = 2;
      const contract = { id: contractId, ClientId: profileId };

      Contract.findOne.mockResolvedValue(contract);

      const result = await contractService.getContractById(profileId, contractId);

      expect(result).toEqual(contract);
      expect(Contract.findOne).toHaveBeenCalledWith({
        where: { id: contractId, [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }] },
      });
    });

    it('should return null if the contract does not belong to the profile', async () => {
      const profileId = 1;
      const contractId = 2;

      Contract.findOne.mockResolvedValue(null);

      const result = await contractService.getContractById(profileId, contractId);

      expect(result).toBeNull();
      expect(Contract.findOne).toHaveBeenCalledWith({
        where: { id: contractId, [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }] },
      });
    });
  });
});
