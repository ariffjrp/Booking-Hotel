"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("booking", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      telepon: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      tanggal_berkunjung: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      jam_berkunjung: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      jumlah_orang: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      category_dituju: {
        allowNull: false,
        type: Sequelize.ENUM("wisata", "studi", "kuliner"),
      },
      object_dituju: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("booking");
  },
};
