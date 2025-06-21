import { ApiError } from "../utils/ApiError.js";

export const restrictUsersListAccess = async (req, res, next) => {
  try {
    if (req.user.role === "STAFF") {
      return next();
    }
    throw new ApiError(403, "You do not have permission to view all users");
  } catch (error) {
    next(error);
  }
};
