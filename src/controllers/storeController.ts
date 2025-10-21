import { NextFunction, Request, Response } from "express";
import { Stores } from "../models/storeModel";

export async function getStores(_req: Request, res: Response, next: NextFunction) {
    try {
        const stores = await Stores.findAll();
        res.status(200).json({
            success: true,
            message: stores.length ? "Toko ditemukan" : "Tidak ada toko ditemukan",
            data: stores,
            meta: { count: stores.length },
        });
    } catch (err) {
        next(err);
    }
}