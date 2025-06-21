import { Router } from "express";
import { handleEmailWebhook } from "../controllers/emailWebhooks.controller.js";

const router = Router();

router.post("/", handleEmailWebhook);

export default router;
