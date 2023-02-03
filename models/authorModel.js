const sequelize = require('sequelize');
const DB = require('../database');

const Author = DB.define('author', {
  name: {
    type: sequelize.DataTypes.STRING,
  },
  age: {
    type: sequelize.DataTypes.STRING,
  },
});

module.exports = Author;
