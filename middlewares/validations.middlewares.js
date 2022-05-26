const { body, validationResult } = require('express-validator');

const createRestaurantValidations = [
    body('name').notEmpty().withMessage('Enter a valid name'),
    body('adress').notEmpty().withMessage('Enter a valid address'),
    body('rating').contains(1, 2, 3, 4, 5),
];

const createUserValidations = [
    body('name').notEmpty().withMessage('Enter a valid name'),
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Must provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 10 })
        .withMessage('Password must be at least 10 characters'),
];

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const messages = errors.array().map(({ msg }) => msg);
        const errorMsg = messages.join('. ');

        return res.status(400).json({
            status: 'Error',
            message: errorMsg,
        });
    }
    next();
};

module.exports = {
    createUserValidations,
    createRestaurantValidations,
    checkValidations,
};
