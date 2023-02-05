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
    type: sequelize.DataTypes.INTEGER,
  },
  authorId: {
    type: sequelize.DataTypes.INTEGER,
  },
  location: {
    type: sequelize.DataTypes.STRING,
  },
  year: {
    type: sequelize.DataTypes.INTEGER,
  },
});

module.exports = Movie;
