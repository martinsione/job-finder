const Sequelize = require("sequelize");
const db = require("../config/database");

const Jobs = db.define("jobs", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  technologies: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  budget: {
    type: Sequelize.INTEGER,
  },
  contact_email: {
    type: Sequelize.STRING,
  },
});

module.exports = Jobs;
