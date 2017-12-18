module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull : false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    age: {
      type: DataTypes.INTEGER
    },
    safequestion:{
      type: DataTypes.STRING,
    },
    answer:{
      type: DataTypes.STRING,
    },
    realname:{
      type: DataTypes.STRING,
    },
    idcard:{
      type: DataTypes.STRING,
    },
    sex:{
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue : DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue : DataTypes.NOW
    }
  }, {
    freezeTableName: true
  });
  return User;
};