import express from 'express'
import { addSerie, deleteSerie, updateSerie, getAllSeries, getOneSerie} from '../controllers/serieControllers/crudSerie';
import { isAuthenticated } from '../middlewares';


export default (router: express.Router)=>{
    router.get('/series', getAllSeries);
    router.get('/series/:id', getOneSerie);
    router.post('/auth/series/addserie', isAuthenticated, addSerie);
    router.patch('/auth/series/:id', isAuthenticated, updateSerie);
    router.delete('/auth/series/:id', isAuthenticated, deleteSerie);
}