import { Router } from 'express';

// import { authMiddleware } from '../middleware/auth.js';
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
taskRoutes.post('/task', validateCreateTask(), reporter, createTask);

taskRoutes.put('/task/:taskId', validateUpdateTask(), reporter, editTask);

taskRoutes.delete('/task/:taskId', validateDeleteTask(), reporter, deleteTask);

taskRoutes.get('/tasks', validateGetTasks(), reporter, getAllTasks);

taskRoutes.get('/tasks/pending', validateGetTasks(), reporter, getPendingTasks);

taskRoutes.get(
    '/tasks/completed',
    validateGetTasks(),
    reporter,
    getCompletedTasks,
);

export default taskRoutes;
