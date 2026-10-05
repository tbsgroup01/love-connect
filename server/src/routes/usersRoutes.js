import express from "express";
import {
  updateUserStatus,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserProfile,
} from "../controllers/usersController.js";

const router = express.Router();
router.put("/:id/status", updateUserStatus);
router.put("/:id/profile", updateUserProfile);
router.put("/:id", updateUserProfile);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
export default router;
