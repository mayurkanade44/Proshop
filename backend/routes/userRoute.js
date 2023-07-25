import express from "express";
import {
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUserById,
  updateUserProfile,
} from "../controllers/userController.js";
import { authAdmin, authProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(authProtect, authAdmin, getUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(authProtect, getUserProfile)
  .put(authProtect, updateUserProfile);
router
  .route("/:id")
  .get(authProtect, authAdmin, getUserById)
  .delete(authProtect, authAdmin, deleteUser)
  .put(authProtect, authAdmin, updateUserById);

export default router;
