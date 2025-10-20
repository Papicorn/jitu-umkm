import { Router } from "express";
import { getConsignors } from "../controllers/userController";

const router = Router();

router.get("/", getConsignors);

export default router;