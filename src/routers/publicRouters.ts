import { Router, Request, Response } from "express";
import { connecToMongo } from "../config/databaseConnect";

const router = Router();

router.get('/', (req:Request, res:Response)=>{
    connecToMongo();
    res.send('Series list');
});

router.get('/watched', (req:Request, res:Response)=>{
    res.send('Watched series list');
});

export default router;