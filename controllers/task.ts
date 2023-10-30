import type { Request, Response, NextFunction } from 'express';

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    console.log('post /task');
    res.sendStatus(200);
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
