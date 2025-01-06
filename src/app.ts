import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './router/index';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/', router());

    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
