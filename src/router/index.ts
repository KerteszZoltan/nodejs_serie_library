import express from 'express';
import { Request, Response } from 'express';
import  authentication  from './authntication';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    return router;
}