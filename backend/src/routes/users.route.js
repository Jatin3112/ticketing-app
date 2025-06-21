import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { restrictUsersListAccess } from "../middlewares/restrictUsersAccess.js";
import {
  getUsers,
  getUserById,
  updateUserRole,
} from "../controllers/users.controller.js";

const router = Router();
router.get("/", authenticate, restrictUsersListAccess, getUsers);
router.get("/me", authenticate, getUserById);
router.patch(
  "/:id/role",
  authenticate,
  restrictUsersListAccess,
  updateUserRole
);

export default router;
