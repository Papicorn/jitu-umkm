import { NextFunction, Request, Response } from "express";
import { ProductStore } from "../models/productModel";

export async function getProducts(_req: Request, res: Response, next: NextFunction) {
    try {
        const products = await ProductStore.findAll();
        res.status(200).json({
            success: true,
            message: products.length ? "Produk ditemukan" : "Tidak ada Produk ditemukan",
            data: products,
            meta: { count: products.length },
        });
    } catch (err) {
        next(err);
    }
}