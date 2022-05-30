import {check, body} from 'express-validator';

const shortcutValidator = [
    check('name').isLength({min: 1}).withMessage('name is required'),
    check('link', 'link can\'t be empty').isLength({min: 1}),
    check('shortlink', 'please enter a shortlink').isLength({min: 5}),
    check('userId', 'user id is required').isLength({min: 1})
];

export {
    shortcutValidator
}