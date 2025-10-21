import { Router } from "express";
import { getConsignors } from "../controllers/userController";

const router = Router();

router.post("/consignors", getConsignors);

export default router;