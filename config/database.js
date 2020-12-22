const Sequelize = require("sequelize");
const db = new Sequelize("app-node", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

module.exports = db;
