import {check} from 'express-validator';

const tagValidator = [
    check('name', 'tag name should not be empty').isLength({min: 1}),
    check('userId', 'user id is not present').not().isEmpty()
];

export {
    tagValidator
}