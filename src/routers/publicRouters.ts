import { Router, Request, Response } from "express";
import { connect,closeConnection } from "../config/databaseConnect";
import { ObjectId } from "mongodb";

const router = Router();

function getId(raw:string){
    try{
        return new ObjectId(raw);
    }catch{
        return null;
    }
}

router.get('/', async (req:Request, res:Response)=>{
    const db = await connect();
    const collection = db.collection('series');
    const series = await collection.find().toArray();
    closeConnection();
    res.send(series);
});

router.get('/series/:id',async (req:Request, res:Response)=>{
    const db = await connect();
    const collection = db.collection('series');
    const id = getId(req.params.id);
    if(id){
        const series = await collection.findOne({_id: id});
        closeConnection();
        res.send(series);
    } else {
        closeConnection();
        res.status(400).send('Invalid id');
    }
});



router.get('/watched', (req:Request, res:Response)=>{
    res.send('Watched series list');
});

export default router;