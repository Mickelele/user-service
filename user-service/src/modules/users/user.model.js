const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class User extends Model {}

User.init({
    id_uzytkownika: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imie: { type: DataTypes.STRING, allowNull: false },
    nazwisko: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    haslo: { type: DataTypes.STRING, allowNull: false },
    rola: {
        type: DataTypes.ENUM('uczeń', 'opiekun', 'nauczyciel', 'administrator', 'gość'),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'uzytkownik',
    timestamps: false
});

const Zdjecie = require('../zdjecie/zdjecie.model');

User.belongsTo(Zdjecie, { foreignKey: 'id_zdjecia', as: 'zdjecie' });



module.exports = User;
