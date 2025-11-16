const sequelize = require('../config/db');

const User = require('../modules/users/user.model');
const Zdjecie = require('../modules/zdjecie/zdjecie.model');
const Teacher = require('../modules/teacher/teacher.model');
const Student = require('../modules/student/student.model');
const Guardian = require('../modules/guardian/guardian.model');

require('./associations');

module.exports = {
    sequelize,
    User,
    Zdjecie,
    Teacher,
    Student,
    Guardian
};
