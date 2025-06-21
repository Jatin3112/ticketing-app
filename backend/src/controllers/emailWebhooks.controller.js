import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../config/prisma.js";

export const handleEmailWebhook = async (req, res, next) => {
  try {
    const { from, subject, text } = req.body;
    if (!from || !subject || !text) {
      throw new ApiError(400, "Missing email fields");
    }

    const username = from.split("@")[0];
    // 1. Find or create the user by sender email
    let user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          username,
          password: "123", // or random, but disable login
        },
      });
    }

    // 2. Create the ticket
    const ticket = await prisma.tickets.create({
      data: {
        title: subject,
        description: text,
        status: "OPEN",
        userId: user.id,
      },
    });

    // 3. (Optional) Send confirmation email or log

    return res
      .status(200)
      .json(new ApiResponse(200, ticket, "Ticket created via email"));
  } catch (error) {
    next(error);
  }
};
