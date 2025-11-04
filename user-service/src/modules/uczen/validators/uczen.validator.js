const Joi = require('joi');
const bcrypt = require('bcrypt');

const updateProfileSchema = Joi.object({
    imie: Joi.string().min(2).max(50),
    nazwisko: Joi.string().min(2).max(50),
    email: Joi.string().email()
});

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(128)
        .pattern(new RegExp('(?=.*[a-z])'))
        .pattern(new RegExp('(?=.*[A-Z])'))
        .pattern(new RegExp('(?=.*[0-9])'))
        .message('Hasło musi mieć min. 8 znaków i zawierać małą, wielką literę oraz cyfrę.')
});

class UczenValidator {
    validateUpdateProfile(data) {
        const { error } = updateProfileSchema.validate(data);
        if (error) throw new Error(error.details[0].message);
    }


    validateChangePassword(data) {
        const { error } = changePasswordSchema.validate(data);
        if (error) throw new Error(error.details[0].message);
    }


    async comparePasswords(plainText, hashed) {
        return bcrypt.compare(plainText, hashed);
    }
}

module.exports = new UczenValidator();
