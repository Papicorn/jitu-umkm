import { NextFunction, Request, Response } from "express";
import { Stores } from "../models/storeModel";


export async function getStores(_req: Request, res: Response, next: NextFunction) {
    try {
        const stores = await Stores.findAll();
        res.json(stores);
    } catch (err) {
        next(err);
    }
}