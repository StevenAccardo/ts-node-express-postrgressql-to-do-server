import { Router } from 'express';

import { authMiddleware } from '../middleware/auth.js';
import {
    validateCreateTask,
    reporter,
    validateUpdateTask,
    validateDeleteTask,
    validateGetTasks,
} from '../middleware/task-validation.js';
import {
    createTask,
    deleteTask,
    editTask,
    getAllTasks,
    getCompletedTasks,
    getPendingTasks,
} from '../controllers/task.js';

const taskRoutes = Router();

// Create a task
taskRoutes.post(
    '/task',
    authMiddleware,
    validateCreateTask(),
    reporter,
    createTask,
);

taskRoutes.put(
    '/task/:taskId',
    authMiddleware,
    validateUpdateTask(),
    reporter,
    editTask,
);

taskRoutes.delete(
    '/task/:taskId',
    authMiddleware,
    validateDeleteTask(),
    reporter,
    deleteTask,
);

taskRoutes.get(
    '/tasks',
    authMiddleware,
    validateGetTasks(),
    reporter,
    getAllTasks,
);

taskRoutes.get(
    '/tasks/pending',
    authMiddleware,
    validateGetTasks(),
    reporter,
    getPendingTasks,
);

taskRoutes.get(
    '/tasks/completed',
    authMiddleware,
    validateGetTasks(),
    reporter,
    getCompletedTasks,
);

export default taskRoutes;
