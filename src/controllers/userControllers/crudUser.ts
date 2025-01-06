import { Request, Response } from "express";
import { getUser, deleteUserById, getUserById, UserModel } from "../../models/User";
import { Connect, CloseConnect } from "../../configs/databaseConnect";
import { updateUserById } from "../../models/User";
import {authentication, random} from '../../helpers/index';


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


export const deleteUser = async (req:Request, res:Response)=>{
    await Connect();
    try {
        const {id} = req.params;
        const deletedUser = await deleteUserById(id);
        CloseConnect();
        res.json(deletedUser).status(200);
    }catch(error){
        console.log(error);
        CloseConnect();
        res.sendStatus(400).json(error);
    }
} 

export const updateUser = async (req:Request, res:Response)=>{
    await Connect();
    const salt = random();
    try{
        const {id} =req.params;
        const user = await getUserById(id);
        if (!user) {
            CloseConnect();
            res.sendStatus(404).json({ error: "User not found" });
            return;
        }
        const updatingUser = {
            username: req.body.username ? req.body.username : user.username,
            email: req.body.email ? req.body.email : user.email,
            authentication: {
                password: req.body.password ? authentication(req.body.password, salt) : user.authentication?.password ?? '',
                salt: req.body.password ? salt : user.authentication?.salt ?? '',
            }
        }

        await updateUserById(id, updatingUser);
        res.json(updatingUser).status(200);
        return;

    }catch(error){
    }
}