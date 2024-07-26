const sequelize = require('../db');

const { TEXT, ENUM } = require('sequelize');

const Contract = sequelize.define('Contract', {
  terms: {
    type: TEXT,
    allowNull: false,
  },
  status: {
    type: ENUM('new', 'in_progress', 'terminated'),
    allowNull: false,
    defaultValue: 'new',
  },
});

module.exports = Contract;
