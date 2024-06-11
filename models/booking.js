"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uid: DataTypes.STRING,
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      telepon: DataTypes.STRING,
      tanggal_berkunjung: DataTypes.DATE,
      jam_berkunjung: DataTypes.STRING,
      jumlah_orang: DataTypes.INTEGER,
      category_dituju: DataTypes.ENUM("wisata", "studi", "kuliner"),
      object_dituju: DataTypes.STRING,
      createdAt: DataTypes.STRING,
      updatedAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "booking",
      tableName: "booking",
      timestamps: false,
    }
  );
  return booking;
};
