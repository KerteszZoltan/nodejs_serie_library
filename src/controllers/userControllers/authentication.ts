import express from 'express';
import { Request, Response } from 'express';
import { getUserByEmail , createUser} from '../../models/User';
import {authentication, random} from '../../helpers/index';
import { Connect,CloseConnect} from "../../configs/databaseConnect";

export const login = async (req: Request, res: Response)=>{
    await Connect();
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            CloseConnect();
            res.status(400).send("email and password are required");
        }

        const user = await getUserByEmail(email).select('+authentication.password +authentication.salt');

        if(!user){
            CloseConnect();
            res.status(400).send("Invalid e-mail address");
            return;
        }

        if (!user?.authentication?.salt) {
            CloseConnect();
            res.status(403).send("Invalid e-mail address");
            return;
        }
        const exceptedHash = authentication( password,user.authentication.salt);

        if (user.authentication.password !== exceptedHash) {
            CloseConnect();
            res.status(403).send("Invalid password");
        }

        const salt = random();
        user.authentication.sessionToken = authentication(user._id.toString(),salt);
        await user.save();

        CloseConnect();
        res.cookie('SESSION-TOKEN', user.authentication.sessionToken, {domain: 'localhost', path: '/'}).status(200).json(user);
        
    } catch (error) {
        CloseConnect();
        res.status(400).send("Login not successfull");
        console.log(error);
    }

}


export const register = async (req: Request, res: Response) => {  
    await Connect();
    try {
        const { username, email, password } = req.body;
        let message;
        if (!username || !email || !password) {
            CloseConnect();
            message = {
                "message" : "Missing fields!"
            };
            res.status(400).json(message);
            return;
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            CloseConnect();
            message = {
                "message" : "Existing user!"
            };
            res.status(400).json(message);
            return;
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                password: authentication(password, salt),
                salt,
            },
        });
        
        console.log(user);
        CloseConnect();
        message = {
            "message" : "User created",
            "user": {
                "username" : user.username,
                "email" : user.email,
            }
        };
        res.status(200).json(message).end();
    }catch (error) {
        res.status(400).json(error);
        return;
    }
}