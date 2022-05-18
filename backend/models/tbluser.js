'use strict';
const {
  Model
} = require('sequelize');
const { encryptPswd } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class TblUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TblUser.hasMany(models.TblPost)
    }
  }
  TblUser.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Username must be not empty!"
        }
      }
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    bithday: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: function (user, options) {
        user.password = encryptPswd(user.password)
        user.image = user.image || "https://via.placeholder.com/150"
        user.bithday = user.bithday || 0
      }
    },
    sequelize,
    modelName: 'TblUser',
  });
  return TblUser;
};