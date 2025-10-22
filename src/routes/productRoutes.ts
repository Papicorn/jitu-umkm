import { Router } from "express";
import { getProducts } from "../controllers/productController";


const router = Router();

router.post("/products", getProducts);

export default router;