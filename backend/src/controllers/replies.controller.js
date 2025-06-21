import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../config/prisma.js";

export const addReply = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { content } = req.body;

    if (!content) {
      throw new ApiError(400, "Reply content is required");
    }

    const ticket = await prisma.tickets.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new ApiError(404, "Ticket not found");
    }

    const reply = await prisma.replies.create({
      data: {
        content,
        ticketsId: ticketId,
        userId: req.user.id,
      },
    });

    res
      .status(201)
      .json(new ApiResponse(201, reply, "Reply added successfully"));
  } catch (error) {
    next(error);
  }
};
