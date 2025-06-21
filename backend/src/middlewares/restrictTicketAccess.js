import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";

export const restrictTicketListAccess = async (req, res, next) => {
  try {
    if (req.user.role === "STAFF") {
      return next();
    }
    throw new ApiError(403, "You do not have permission to view all tickets");
  } catch (error) {
    next(error);
  }
};

export const restrictTicketModification = async (req, res, next) => {
  try {
    const ticket = await prisma.tickets.findUnique({
      where: { id: req.params.id },
    });

    if (!ticket) {
      throw new ApiError(404, "Ticket not found");
    }

    const isStaff = req.user.role === "STAFF";

    // Allow staff to delete the ticket
    if (isStaff) {
      req.ticket = ticket;
      return next();
    }

    throw new ApiError(403, "You do not have permission");
  } catch (error) {
    next(error);
  }
};
