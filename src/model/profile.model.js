const sequelize = require('../db');

const { STRING, DECIMAL, ENUM } = require('sequelize');

const Profile = sequelize.define('Profile', {
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  profession: {
    type: STRING,
    allowNull: false,
  },
  balance: {
    type: DECIMAL(12, 2),
    defaultValue: 0,
  },
  type: {
    type: ENUM('client', 'contractor'),
  },
});

module.exports = Profile;