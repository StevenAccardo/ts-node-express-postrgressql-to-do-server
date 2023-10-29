import { Router } from 'express';
// import { body } from "express-validator";
import {
    createTask,
    deleteTask,
    editTask,
    getCompletedTasks,
    getPendingTasks,
} from '../controllers/task.js';

const taskRoutes = Router();

// Create a task
taskRoutes.post('/task', createTask);

taskRoutes.put('/task:id', editTask);

taskRoutes.delete('/task:id', deleteTask);

taskRoutes.get('/tasks/pending', getPendingTasks);

taskRoutes.get('/tasks/completed', getCompletedTasks);

export default taskRoutes;
