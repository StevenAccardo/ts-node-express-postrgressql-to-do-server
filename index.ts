/* eslint-disable import/first */
// Need to have env vars in entire application.
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}

import express, {
    type Express,
    type Request,
    type Response,
    type NextFunction,
    type ErrorRequestHandler,
} from 'express';

import sequelize from './util/database';

import authRoutes from './routes/auth';

(async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ alter: true });
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})().catch((err) => {
    console.log(err);
});

const app: Express = express();
app.use(express.json());

app.use(authRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
    console.log('Server is working!');
    res.status(200).send('Server is working!');
});

app.use(
    (
        error: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        console.log(error);
        res.status(500).json({ message: 'There was an unknown server error.' });
    },
);

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});
