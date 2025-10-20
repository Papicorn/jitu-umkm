import type { Request, Response, NextFunction } from "express";
import { Consignor } from "../models/userModel";

export async function getConsignors(_req: Request, res: Response, next: NextFunction) {
    try {
        const rows = await Consignor.findAll();
        res.json(rows);
    } catch (err) {
        next(err);
    }
}