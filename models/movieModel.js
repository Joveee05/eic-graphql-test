const sequelize = require('sequelize');
const DB = require('../database');

const Movie = DB.define('movies', {
  title: {
    type: sequelize.DataTypes.STRING,
  },
  genre: {
    type: sequelize.DataTypes.STRING,
  },
  actorId: {
    type: sequelize.DataTypes.STRING,
  },
  authorId: {
    type: sequelize.DataTypes.STRING,
  },
  location: {
    type: sequelize.DataTypes.STRING,
  },
});

module.exports = Movie;
