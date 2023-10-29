import { Router } from 'express';
import { body } from 'express-validator';

import { signup, signin } from '../controllers/auth.js';
import { User } from '../models/index.js';

const authRoutes = Router();

// Using express-validator to help add validation, and return error messages when requests do not meet validation requirements.
authRoutes.post(
    '/signup',
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom(async (value, { req }) => {
            // Express validator will await the promise resolution. If the promise resolves then it passes the validation step. If the promise is rejected, as it will be if the if block is entered, then it will treat it as an invalid check, and show the error message passed to the .reject method.
            const userDoc = await User.findOne({ where: { email: value } });
            if (userDoc !== null) {
                throw new Error(
                    'E-mail already exists, please pick a different one.',
                );
            }
            return true;
        })
        .normalizeEmail({ gmail_remove_dots: false }),
    body(
        'password',
        'Please enter a password with only numbers and text and at least 5 characters.',
    )
        .isLength({ min: 5 })
        .trim(),
    body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match!');
            }
            return true;
        }),
    signup,
);

authRoutes.post(
    '/signin',
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail({ gmail_remove_dots: false }),
    body(
        'password',
        'Please enter a password with only numbers and text and at least 5 characters.',
    )
        .isLength({ min: 5 })
        .trim(),
    signin,
);

export default authRoutes;
