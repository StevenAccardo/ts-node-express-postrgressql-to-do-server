import type { Request, Response, NextFunction } from 'express';
import { body, oneOf, param, query, validationResult } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const validateCreateTask = (): ValidationChain[] => {
    return [
        body(
            'task',
            'The request requires a task property that has a minimum of 3 characters.',
        )
            .isString()
            .notEmpty()
            .trim()
            .escape()
            .isLength({ min: 3 }),
    ];
};

// We are requiring that the id, task, and completed properties be passed, even if one of those is not technically being updated.
// We could change the endpoint to a PATCH instead of a PUT and allow for single property updates, but I have decided to leave it as such.
export const validateUpdateTask = (): ValidationChain[] => {
    return [
        param(
            'taskId',
            'A numeric task id must be provided in order to edit a task.',
        )
            .notEmpty()
            .isNumeric(),
        body(
            'task',
            'The request requires a task property that has a minimum of 3 characters.',
        )
            .isString()
            .notEmpty()
            .trim()
            .escape()
            .isLength({ min: 3 }),
        body(
            'completed',
            'The completed property must be either true or false.',
        )
            .notEmpty()
            .isBoolean(),
    ];
};

export const validateDeleteTask = (): ValidationChain[] => {
    return [
        param(
            'taskId',
            'A numeric task id must be provided in order to delete a task.',
        )
            .notEmpty()
            .isNumeric(),
    ];
};

export const validateGetTasks = (): Array<ValidationChain | any> => {
    return [
        query(
            'order',
            'The query parameter order can only have a value of desc or asc.',
        )
            .optional()
            .notEmpty()
            .isString(),
        oneOf(
            [
                query('order').optional().equals('desc'),
                query('order').optional().equals('asc'),
            ],
            {
                message:
                    'The query parameter order can only have a value of desc or asc.',
            },
        ),
    ];
};

export const reporter = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(422).json({ message: errors.array()[0].msg });
        return;
    }

    next();
};
