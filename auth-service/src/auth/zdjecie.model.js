const { Model, DataTypes } = require('sequelize');

class Zdjecie extends Model {}

Zdjecie.init({
    id_zdjecia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nazwa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zawartosc: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Zdjecie',
    tableName: 'zdjecia',
    timestamps: false,
});

module.exports = Zdjecie;
