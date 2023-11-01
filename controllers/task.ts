import type { Request, Response, NextFunction } from 'express';

import { Task } from '../models/index.js';

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        // Pull the userId off of the res.locals that was placed there by the authMiddleware after verifying the accessToken.
        const decodedUserId: number = res.locals.userId;
        // Pull the task property off of the req.body.
        const task: string = req.body.task;
        // Create a new task associated to the userId using the task property
        const createdTask = await Task.create({ userId: decodedUserId, task });
        // Return the newly created task to the client
        console.log(
            `Task with id: ${createdTask.id} created for user with id: ${decodedUserId}.`,
        );
        res.status(201).json(createdTask);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const editTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        // Pull the userId off of the req.body object that was placed there by the authMiddleware after verifying the accessToken.
        const decodedUserId: number = res.locals.userId;
        // Pull the taskId off of the req.params object
        const taskId: number = parseInt(req.params.taskId);
        // Query for the task by task.id and userId
        const task: Task | null = await Task.findOne({
            where: { id: taskId, userId: decodedUserId },
        });

        // If task exists and userId matches userId from token decode, then update record
        if (task == null) {
            res.status(404).json({
                message:
                    'No task matching that id and userId was found. Please review your request and try again.',
            });
            return;
        }
        const updatedMessage: string = req.body.task;
        const updatedCompleted: boolean = req.body.completed;

        // Additional checks to ensure we are getting a proper request. Validation middleware should already handle this, but if that were ever not working properly, this would add an extra layer of protection. Whether this is needed is likely debateable.
        if (
            updatedMessage === undefined ||
            updatedCompleted === undefined ||
            typeof updatedCompleted !== 'boolean'
        ) {
            res.status(400).json({
                message:
                    "All task update requests must include a task and a completed property, even if they aren't being updated. Please review your request and try again.",
            });
            return;
        }

        const updateObj: {
            task: string;
            completed: boolean;
            completed_timestamp: null | Date;
        } = {
            task: updatedMessage,
            completed: updatedCompleted,
            completed_timestamp: null,
        };

        // Check if request completed porperty has been updated to true, and if add the completed date.
        // Since we are always setting he completed_timestamp to null, as it is created, if the completed property goes from true to false, then we will set it to null anyway here. So that case is covered already.
        if (task.completed !== updatedCompleted && updatedCompleted) {
            // If true. Means the incoming request update changed the status of the task to completed: true. We need to add a time to the db.
            updateObj.completed_timestamp = new Date();
        }

        // Make the update to persist the updated info to the the row in the DB.
        const updatedTask = await task.update(updateObj);
        // Return updated record
        console.log(
            `Task with id: ${updatedTask.id} edited for user with id: ${decodedUserId}.`,
        );
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        // Pull the userId off of the res.locals object that was placed there by the authMiddleware after verifying the accessToken.
        const decodedUserId: number = res.locals.userId;
        // Pull the taskId off of the req.params object
        const taskId: number = parseInt(req.params.taskId);

        // Delete task from DB
        const numOfDeletedRows = await Task.destroy({
            where: { id: taskId, userId: decodedUserId },
        });

        if (numOfDeletedRows === 0) {
            res.status(400).json({
                message:
                    'Unable to delete requested task. Please check your request and try again.',
            });
            return;
        }

        console.log(
            `Task with id: ${taskId} deleted for user with id: ${decodedUserId}.`,
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        next(error);
    }
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
