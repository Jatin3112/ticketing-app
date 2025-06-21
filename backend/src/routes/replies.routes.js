import { Router } from "express";
import { addReply } from "../controllers/replies.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { restrictReplyAccess } from "../middlewares/restrictReplyAccess.js";

const router = Router();

router.post("/:ticketId/replies", authenticate, restrictReplyAccess, addReply);

export default router;
