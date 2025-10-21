import { Router } from "express";
import { getStores } from "../controllers/storeController";


const router = Router();

router.post("/stores", getStores);

export default router;