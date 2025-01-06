import express from 'express';
import {register, login} from '../controllers/userControllers/authentication';

export default (router : express.Router) => {
    router.post('/register', register);
    router.post('/login', login);
};