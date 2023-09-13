import type { Request, Response, NextFunction } from 'express';

import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { User } from '../models/user';

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ message: errors.array()[0].msg });
        return;
    }

    try {
        const hashedPassword = await hash(password, 12);
        await User.create({
            email,
            password: hashedPassword,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

    console.log('New user created.');
    res.status(201).json({ message: 'New user successfully created.' });
};

export const signin = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ message: errors.array()[0].msg });
        return;
    }

    try {
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

        const token = sign({ id: user.id }, `${process.env.SECRET}`, {
            expiresIn: process.env.JWT_EXP_TIME,
        });

        res.status(200).json({ access_token: token });
    } catch (error) {
        console.log(error);
        next(error);
    }
};