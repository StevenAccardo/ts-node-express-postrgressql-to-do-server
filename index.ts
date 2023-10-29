// Need to have env vars in entire application.
import 'dotenv/config';

import express, {
    type Express,
    type Request,
    type Response,
    type NextFunction,
    type ErrorRequestHandler,
} from 'express';
import cors from 'cors';

import { syncDB } from './util/database.js';

import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';

// Uses top-level await to sync the database before the application starts listening on the port.
// I wanted to makes sure this was done before the application starts, but that isn't a huge issue, looking back
// as it will only happen in development anyway.
await syncDB();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(taskRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
    console.log('Server is working!');
    res.status(200).send('Server is working!');
});

// Custom Express error handler that will handle any unexpected errors thrown.https://expressjs.com/en/guide/error-handling.html
app.use(
    (
        error: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        // Hands control to express default error handler if the headers have already been sent to the client. https://expressjs.com/en/guide/error-handling.html
        if (res.headersSent) {
            next(error);
            return;
        }
        console.log(error);
        res.status(500).json({ message: 'There was an unknown server error.' });
    },
);

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});
