import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
  createOrderLab,
  deleteOrderLab,
  getOrderLab,
  updateOrderLab,
} from "../../controllers/laboratory/orderLabController.js";

router.route("/").post(admin, createOrderLab);
router
  .route("/:id")
  .delete(admin, deleteOrderLab)
  .patch(admin, updateOrderLab)
  .get(admin, getOrderLab);

export default router;
