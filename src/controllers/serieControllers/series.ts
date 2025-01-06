import { Request, Response } from "express";
import { getSeries } from "../../models/Serie";
import {Connect, CloseConnect} from "../../configs/databaseConnect";

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
    }

}
