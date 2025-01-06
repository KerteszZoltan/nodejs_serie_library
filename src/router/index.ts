import express from 'express';
import { Request, Response } from 'express';
import  authentication  from './authntication';
import users from './users';
import series from './series';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    series(router);
    return router;
}