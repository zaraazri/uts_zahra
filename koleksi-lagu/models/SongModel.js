const sequelize = require("../config/database.js");
const { DataTypes } = require("sequelize");

const Song = sequelize.define(
  "Song",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    judul: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    penyanyi: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    album: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "lagu",
    timestamps: false,
  }
);

module.exports = Song;
