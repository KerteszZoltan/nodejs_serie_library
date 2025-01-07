import { Request, Response } from "express";
import { CloseConnect, Connect } from "../../configs/databaseConnect";
import { getSeries, getSerieByTitleEN, updateSerieById, deleteSerieById, getSerieById} from "../../models/Serie";
import { createSerie } from "../../models/Serie";

let message;

export const getAllSeries = async (req:Request, res:Response ) => {
    await Connect();
    try {
        const series = await getSeries();
        CloseConnect();
        res.json(series).status(200);
        return;
    } catch (error) {
        CloseConnect();
        console.log(error);
        res.sendStatus(400).json(error);
        return;
    }

}

export const getOneSerie = async (req:Request, res:Response) => {
    await Connect();
    try {
        const {id} = req.params;
        const serie = await getSerieById(id);
        if (!serie) {
            CloseConnect();
            message = {
                "message" : "This serie is not in the database"
            }
            res.status(400).send(message);
            return;
        }
        CloseConnect();
        res.json(serie).status(200);
        return;
    } catch (error) {
        CloseConnect();
        console.log(error);
        return;
    }
}

export const addSerie = async (req:Request, res:Response) => {
    await Connect();
    try {
        const {titleEN, titleHU, descriptionEN, descriptionHU} = req.body;
        if (!titleEN) {
            await CloseConnect();
            message = {
                "message" : "english title is required"
            };
            res.status(400).send(message);
            return;
        }
        const existingTitle = await getSerieByTitleEN(titleEN);
        if (existingTitle) {
            message = {
                "message" : "The database inclouded this title"
            };
            res.status(400).send(message);
            return;
        }
        const newSerie = await createSerie({
            titleEN,
            titleHU,
            descriptionEN,
            descriptionHU,
        });

        CloseConnect();
        message={
            "message":"Successfully added",
            "serie" : {
                newSerie
            },
        }
        res.status(200).json(message).end();
    } catch (error) {
        res.send(error);
        console.log(error);
        return;
    }
}

export const updateSerie = async (req:Request, res:Response) => {
    await Connect();
    try{
    const {id} = req.params;
        const {titleEN} = req.body;
        if (!titleEN) {
            CloseConnect();
            message = {
                message : "english title is required"
            }
            res.status(400).json(message);
            return;
        }
        const existingSerie = await getSerieByTitleEN(titleEN);
        if (!existingSerie) {
            CloseConnect();
            message = {
                message : "This serie is not in the database"
            }
            res.status(400).json(message);
            return;
        }
        const updatingSerie = {
            id:existingSerie.id,
            titleEN: req.body.titleEN ? req.body.titleEN : existingSerie.titleEN,
            titleHU: req.body.titleHU ? req.body.titleHU : existingSerie.titleHU,
            descriptionEN: req.body.descriptionEN ? req.body.descriptionEN : existingSerie.descriptionEN,
            descriptionHU: req.body.descriptionHU ? req.body.descriptionHU : existingSerie.descriptionHU,
        }
        
        await updateSerieById(id, updatingSerie);
        res.json(updatingSerie).status(200);
        return;
    }catch(error){
        console.log(error);
        return;
    }
}

export const deleteSerie = async (req:Request, res:Response) =>{
    await Connect();
    try {
        const {id} = req.params;
        const serie = await getSerieById(id);
        if (!serie) {
            CloseConnect();
            message = {
                message : "This serie is not in the database"
            };
            res.status(400).json(message);
            return;
        }
        message = {
            message : "Successfully deleted",
            serie : {
                serie
            }
        }
        await deleteSerieById(id);
        res.status(200).json(message);
        return;
    } catch (error) {
        console.log(error);
        return;
    }
}