import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(express.json());

app.use('/', (req, res, next) => {
    console.log('Thanks for coming!');
    res.status(200).send('Thanks for coming!');
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server listening on port: ${port}.`));
