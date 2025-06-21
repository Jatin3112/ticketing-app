import prisma from "../config/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        Tickets: true,
      },
    });

    res
      .status(200)
      .json(new ApiResponse(200, users, "All users fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        role: true,
        Tickets: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "User details fetched successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["USER", "STAFF"].includes(role)) {
      throw new ApiError(400, "Invalid role provided");
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    res
      .status(200)
      .json(new ApiResponse(200, user, "User role updated successfully"));
  } catch (error) {
    next(error);
  }
};
