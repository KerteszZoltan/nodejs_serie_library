
import {get , merge} from 'lodash';
import { Request, Response,NextFunction } from 'express';
import { getUserBySessionToken } from '../models/User';
import { CloseConnect, Connect } from '../configs/databaseConnect';


export const isOwner = async (req:Request, res:Response, next: NextFunction)=>{
    let message;
    try {
        const {id} = req.params;
        const currentId: string = get(req, 'identity._id') as unknown as string;
        if (!currentId) {
            message={
                message: "Unauthorized",
            };
            res.sendStatus(400);
            return;
        }
        if (currentId && currentId.toString() !== id) {
            message={
                message: "Unauthorized",
            };
            res.sendStatus(400);
            return;
        }
        next();
    } catch (error) {
        console.log(error);
    }

}


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) =>{
    await Connect();
    try {
        const sessionToken = req.cookies['SESSION-TOKEN'];
        let message={
            message: "Unauthorized",
        };
        if (!sessionToken) {
            CloseConnect();
            res.status(401).json(message);
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            CloseConnect();
            res.status(401).json(message);
            return;
        }
        merge(req, {identity: existingUser});
        return next();
        
    } catch (error) {
        console.log(error);
    }
}