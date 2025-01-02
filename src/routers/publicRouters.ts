import { Router, Request, Response } from "express";
import { connect,closeConnection } from "../config/databaseConnect";
import { Db } from "mongodb";
import { json } from "stream/consumers";

const router = Router();

router.get('/', async (req:Request, res:Response)=>{
    const db = await connect();
    const collection = db.collection('series');
    const series = await collection.find().toArray();
    closeConnection();
    res.send(series);
});

router.get('/watched', (req:Request, res:Response)=>{
    res.send('Watched series list');
});

export default router;