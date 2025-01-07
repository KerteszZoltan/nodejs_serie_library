import express from 'express';
import {register, login} from '../controllers/userControllers/authentication';
import { validateEmail } from '../helpers/emailValidator';
import { validatePassword } from '../helpers/passwordValidator';

export default (router : express.Router) => {
    router.post('/register', validateEmail(), validatePassword(), register);
    router.post('/login', login);
};