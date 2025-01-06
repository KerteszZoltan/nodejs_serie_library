import express from 'express';
import { Request, Response } from 'express';

import { getAllUsers, deleteUser, updateUser, getOneUser } from '../controllers/userControllers/crudUser';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router)=>{
    router.get('/auth/user', isAuthenticated,getAllUsers);
    router.get('/auth/user/:id',isAuthenticated,isOwner,getOneUser);
    router.delete('/auth/user/:id',isAuthenticated,isOwner,deleteUser);
    router.patch('/auth/user/:id',isAuthenticated,isOwner, updateUser);
}