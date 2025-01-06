import express from 'express';
import { Request, Response } from 'express';
import { getAllUsers} from '../controllers/userControllers/users';
import { deleteUser, updateUser } from '../controllers/userControllers/crudUser';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router)=>{
    router.get('/auth/user', isAuthenticated,getAllUsers);
    router.delete('/auth/user/:id',isAuthenticated,isOwner,deleteUser);
    router.patch('/auth/user/:id',isAuthenticated,isOwner, updateUser);
}