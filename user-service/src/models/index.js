const sequelize = require('../config/db');
const User = require('../modules/users/user.model');
const Guardian = require('../modules/guardian/guardian.model');
const Teacher = require('../modules/teacher/teacher.model');
const Zdjecie = require('../modules/zdjecie/zdjecie.model');

module.exports = { sequelize, User, Guardian, Teacher , Zdjecie};
