import type { Request, Response, NextFunction } from 'express';

import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/index.js';

// Create a new user record in the DB, storing the username and the hashed password.
export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await hash(password, 12);
        await User.create({
            email,
            password: hashedPassword,
        });
        console.log('New user created.');
        res.status(201).json({ message: 'New user successfully created.' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Compare the hashed password from the request against that stored for the user in the DB. If they match, create an access token and return it to the client.
export const signin = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (user === null) {
            res.status(422).json({
                message: 'User does not exist. Please check e-mail, or signup.',
            });
            return;
        }

        const doMatch = await compare(password, user.password);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!doMatch) {
            res.status(422).json({ message: 'Invalid email or password.' });
            return;
        }

        const token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
            expiresIn: process.env.JWT_EXP_TIME,
        });

        console.log(
            `User with id: ${user.id} and email: ${user.email} signed in.`,
        );
        res.status(200).json({ access_token: token });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
