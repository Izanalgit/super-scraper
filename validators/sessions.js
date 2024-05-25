const { body } = require('express-validator');

const userValidations = [
	body('name')
        .trim()
        .notEmpty()
        .withMessage('User name is required')
        .isLength({ max: 15})
		.withMessage('Name must be less than 15 characters long'),
	body('pswd')
        .trim()
        .notEmpty()
		.withMessage('User password is required')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        .withMessage('Must be a strong password'),
]

module.exports = { userValidations }