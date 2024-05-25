const { body } = require('express-validator');

const searchValidations = [
	body('product')
        .trim()
        .notEmpty()
        .withMessage('Product is required')
        .isAlphanumeric() 
        .withMessage('Product must only contain numbers and letters')
        .isLength({ min: 3})
		.withMessage('Product must be atless 3 characters long')
        .isLength({ max: 15})
		.withMessage('Product must be less than 15 characters long'),
]

module.exports = { searchValidations }