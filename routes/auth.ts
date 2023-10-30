import { Router } from 'express';

import {
    validateSignup,
    validateSignin,
    reporter,
} from '../middleware/auth-validation.js';
import { signup, signin } from '../controllers/auth.js';

const authRoutes = Router();

// Using express-validator to help add validation, and return error messages when requests do not meet validation requirements.
authRoutes.post('/signup', validateSignup(), reporter, signup);

authRoutes.post('/signin', validateSignin(), reporter, signin);

export default authRoutes;
