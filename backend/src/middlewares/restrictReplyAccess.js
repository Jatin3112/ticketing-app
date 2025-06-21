import { ApiError } from "../utils/ApiError.js";

export const restrictReplyAccess = (req, res, next) => {
  if (req.user.role === "STAFF") {
    return next();
  }
  next(new ApiError(403, "Only staff can reply to tickets"));
};
