import type { Request, Response, NextFunction } from 'express';

import { Task } from '../models/index.js';

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    // Pull the userId off of the req.body that was placed there by the authMiddleware after verifying the accessToken.
    const userId: number = req.body.userId;
    // Pull the task property off of the req.body.
    const task: string = req.body.task;
    // Create a new task associated to the userId using the task property
    const createdTask = await Task.create({ userId, task });
    // Return the newly created task to the client
    res.status(201).json(createdTask);
};

export const editTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    console.log('put /task');
    res.sendStatus(200);
};

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    console.log('delete /task');
    res.sendStatus(200);
};

export const getAllTasks = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    console.log('get-all-tasks');
    res.sendStatus(200);
};

export const getPendingTasks = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    console.log('get-pending');
    res.sendStatus(200);
};

export const getCompletedTasks = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    console.log('get-completed');
    res.sendStatus(200);
};
