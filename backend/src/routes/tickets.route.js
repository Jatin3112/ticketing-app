import { Router } from "express";
import {
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/tickets.controller.js";
import {
  restrictTicketListAccess,
  restrictTicketModification,
} from "../middlewares/restrictTicketAccess.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// RESTful ticket routes
router.get("/", authenticate, restrictTicketListAccess, getTickets);
router.post("/", authenticate, createTicket);
router.patch("/:id", authenticate, restrictTicketModification, updateTicket);
router.delete("/:id", authenticate, restrictTicketModification, deleteTicket);

export default router;
