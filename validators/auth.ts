import {body} from 'express-validator';

const loginValidator = [
    body('email').isLength({min: 3}).withMessage('please enter email with at least 3 char').isEmail().withMessage('please enter a valid email'),
    body('password', 'please enter a password with more than 5 charcaters').isLength({min:4})
];

const registerValidator = [
    body('fname').isLength({min: 4}).withMessage('first name should be at least 5 char'),
    body('email').isLength({min: 3}).withMessage('please enter email with at least 3 char').isEmail().withMessage('please enter a valid email'),
    body('password', 'please enter a password with more than 5 charcaters').isLength({min: 4})
];

export {
    loginValidator,
    registerValidator
}