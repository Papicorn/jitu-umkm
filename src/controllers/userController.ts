import type { Request, Response, NextFunction } from "express";
import { Consignor } from "../models/userModel";

export async function getConsignors(_req: Request, res: Response, next: NextFunction) {
    try {
        const consignor = await Consignor.findAll();
        res.status(200).json({
            success: true,
            message: consignor.length ? "Consignor ditemukan" : "Tidak ada consignor terdaftar",
            data: consignor,
            meta: { count: consignor.length },
        });
    } catch (err) {
        next(err);
    }
}