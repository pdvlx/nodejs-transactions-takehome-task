const sequelize = require('../db');

const { TEXT, DECIMAL, BOOLEAN, DATE } = require('sequelize');

const Job = sequelize.define('Job', {
  description: {
    type: TEXT,
    allowNull: false,
  },
  price: {
    type: DECIMAL(12, 2),
    allowNull: false,
  },
  paid: {
    type: BOOLEAN,
    defaultValue: false,
  },
  paymentDate: {
    type: DATE,
  },
});

module.exports = Job;
