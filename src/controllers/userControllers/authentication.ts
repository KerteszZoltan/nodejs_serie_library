import express from 'express';
import { Request, Response } from 'express';
import { getUserByEmail , createUser} from '../../models/User';
import {authentication, random} from '../../helpers/index';
import { Connect,CloseConnect} from "../../configs/databaseConnect";
import { validationResult } from 'express-validator';


let message;


export const login = async (req: Request, res: Response)=>{
    await Connect();
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            CloseConnect();
            message = {
                "message" : "email and password are required"
            }
            res.status(400).json(message);
            return;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return; 
        }

        const user = await getUserByEmail(email).select('+authentication.password +authentication.salt');

        if(!user){
            CloseConnect();
            message = {
                "message" : "Invalid e-mail address"
            }
            res.status(400).json(message);
            return;
        }

        if (!user?.authentication?.salt) {
            CloseConnect();
            message = {
                "message" : "User salt found"
            }
            res.status(403).json(message);
            return;
        }
        const exceptedHash = authentication( password,user.authentication.salt);

        if (user.authentication.password !== exceptedHash) {
            CloseConnect();
            message = {
                "message" : "Password is not match"
            }
            res.status(403).json(message);
            return;
        }

        const salt = random();
        user.authentication.sessionToken = authentication(user._id.toString(),salt);
        await user.save();

        CloseConnect();

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1); 
        message={
            "user" : user,
            "cookie expires at:" : expiresAt
        }

        res.cookie('SESSION-TOKEN', user.authentication.sessionToken, {
            domain: 'localhost', 
            path: '/',
            expires: expiresAt
        }).status(200).json(message);
        return;
        
    } catch (error) {
        CloseConnect();
        res.status(400).send("Login not successfull");
        console.log(error);
        return;
    }

}


export const register = async (req: Request, res: Response) => {  
    await Connect();
    try {
        const { username, email, password } = req.body;
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
        
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
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
        return;
    }catch (error) {
        res.status(400).json(error);
        return;
    }
}