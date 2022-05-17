'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TblDetailUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TblDetailUser.init({
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    birthday: DataTypes.DATE,
    religion: DataTypes.STRING,
    nasionality: DataTypes.STRING,
    languages: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TblDetailUser',
  });
  return TblDetailUser;
};