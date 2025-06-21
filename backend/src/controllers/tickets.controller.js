import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../config/prisma.js";

const getTickets = async (req, res, next) => {
  try {
    const tickets = await prisma.tickets.findMany({
      include: {
        user: {
          select: { username: true },
        },
        Replies: true,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, tickets, "Tickets fetched successfully"));
  } catch (error) {
    next(error);
  }
};
const createTicket = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new ApiError(400, "Title and description are required");
    }

    const newTicket = await prisma.tickets.create({
      data: {
        title,
        description,
        userId: req.user.id,
      },
    });

    res
      .status(201)
      .json(new ApiResponse(201, newTicket, "Ticket created successfully"));
  } catch (error) {
    next(error);
  }
};

const updateTicket = async (req, res, next) => {
  try {
    const { status } = req.body;
    const ticketId = req.ticket.id;

    if (!status) {
      throw new ApiError(400, "Status is required");
    }
    const validStatuses = ["OPEN", "CLOSED"];

    if (!validStatuses.includes(status.toUpperCase())) {
      throw new ApiError(400, "Invalid status value. Use 'OPEN' or 'CLOSED'");
    }

    const updatedTicket = await prisma.tickets.update({
      where: { id: ticketId },
      data: {
        status: status.toUpperCase(),
      },
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedTicket,
          "Ticket status updated successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const ticket = req.ticket;

    const deletedTicket = await prisma.tickets.delete({
      where: { id: ticket.id },
    });

    res
      .status(200)
      .json(new ApiResponse(200, deletedTicket, "Ticket Deleted Successfully"));
  } catch (error) {
    next(error);
  }
};

export { getTickets, createTicket, deleteTicket, updateTicket };
