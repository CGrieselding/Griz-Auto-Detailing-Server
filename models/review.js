const { DataTypes } = require("sequelize");
const db = require("../db");

const Rev = db.define("rev", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    require: true,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  imageURL: {
    type: DataTypes.STRING,
  },
  // owner: {                      
  //   type: DataTypes.INTEGER,
  // },
});

module.exports = Rev;
