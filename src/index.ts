import express, { Request, Response } from 'express';
import publicRouter from './routers/publicRouters';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use('/', publicRouter);
app.use('/watched', publicRouter);
    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
