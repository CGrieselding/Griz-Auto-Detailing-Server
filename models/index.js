const db = require("../db");

const UserModel = require("./user");
const RevModel = require("./review");
const InqModel = require("./inquiry");

UserModel.hasMany(RevModel);
UserModel.hasMany(InqModel);

RevModel.belongsTo(UserModel);
InqModel.belongsTo(UserModel);

module.exports = {
  dbConnection: db,
  models: {
    UserModel,
    RevModel,
    InqModel,
  },
};
