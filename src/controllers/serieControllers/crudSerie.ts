import { Request, Response } from "express";
import { CloseConnect, Connect } from "../../configs/databaseConnect";
import { getSerieByTitleEN } from "../../models/Serie";
import { createSerie } from "../../models/Serie";

export const addSerie = async (req:Request, res:Response) => {
    await Connect();
    let message;
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
    }
}
