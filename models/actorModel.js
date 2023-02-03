const sequelize = require('sequelize');
const DB = require('../database');

const Actor = DB.define('actor', {
  name: {
    type: sequelize.DataTypes.STRING,
  },
  age: {
    type: sequelize.DataTypes.STRING,
  },
});

module.exports = Actor;
