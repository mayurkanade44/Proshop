import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { authAdmin, authProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(authProtect, authAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(authProtect, authAdmin, updateProduct)
  .delete(authProtect, authAdmin, deleteProduct);

export default router;
