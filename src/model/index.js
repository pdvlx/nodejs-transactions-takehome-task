const sequelize = require('../db');
const Profile = require('./profile.model');
const Contract = require('./contract.model');
const Job = require('./job.model');

// Define associations
Profile.hasMany(Contract, { as: 'ContractsAsContractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor', foreignKey: 'ContractorId' });

Profile.hasMany(Contract, { as: 'ContractsAsClient', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client', foreignKey: 'ClientId' });

Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
};