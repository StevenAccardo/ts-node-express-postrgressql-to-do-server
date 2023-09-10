import express, {
    type Express,
    type Request,
    type Response,
    type NextFunction,
} from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
    console.log('Thanks for coming!');
    res.status(200).send('Thanks for coming!');
});

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});
