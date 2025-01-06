import expres from 'express';
import { Request, Response } from 'express';
import {getUser} from '../../models/User';
import { Connect, CloseConnect } from '../../configs/databaseConnect';

export const getAllUsers = async (req: Request,res:Response) => {
    await Connect();
    try {
        const users = await getUser();
        CloseConnect();
        res.json(users).status(200);
    } catch (error) {
        CloseConnect();
        console.log(error);
        res.sendStatus(400).json(error);
    }
}
