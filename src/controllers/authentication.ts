import express from 'express';
import { Request, Response } from 'express';
import { getUserByEmail , createUser} from '../models/User';
import {authentication, random} from '../helpers/index';
import { Connect,CloseConnect} from "../configs/databaseConnect";


export const register = async (req: Request, res: Response) => {  
    Connect();
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            CloseConnect();
            res.status(400).send('Missing fields');
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            CloseConnect();
            res.status(400).send('User already exists');
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

        CloseConnect();
        const message = {
            "message" : "User created",
            "user": {
                "username" : user.username,
                "email" : user.email,
            }
        };
        res.status(200).json(message).end();
    }catch (error) {
        res.status
    }
}