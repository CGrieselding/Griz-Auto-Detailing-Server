const { DataTypes } = require("sequelize");
const db = require("../db");

const Inq = db.define("inq", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(80),
    require: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  car: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false,
  },
  // owner: {                          DO I EVEN NEED THIS??
  //   type: DataTypes.INTEGER,
  // },
});

module.exports = Inq;
