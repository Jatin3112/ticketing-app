import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../config/prisma.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authorization header missing or malformed");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new ApiError(401, "User no longer exists");
    }
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized"));
  }
};
