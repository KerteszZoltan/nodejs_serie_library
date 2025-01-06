import express from 'express'
import { getAllSeries } from '../controllers/serieControllers/series';
import { addSerie } from '../controllers/serieControllers/crudSerie';
import { isAuthenticated } from '../middlewares';


export default (router: express.Router)=>{
    router.get('/series', getAllSeries);
    router.post('/auth/series/addserie', isAuthenticated, addSerie);
}