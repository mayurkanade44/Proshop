import express from "express";

import { authAdmin, authProtect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getAllOrders,
  getMyOrder,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(authProtect, addOrderItems)
  .get(authProtect, authAdmin, getAllOrders);
router.route("/myOrder").get(authProtect, getMyOrder);
router.route("/:id").get(authProtect, getOrderById);
router.route("/:id/pay").get(authProtect, updateOrderToPaid);
router
  .route("/:id/deliver")
  .get(authProtect, authAdmin, updateOrderToDelivered);

export default router;
