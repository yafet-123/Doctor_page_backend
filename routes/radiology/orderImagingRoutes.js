import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
    createOrderImaging,
  deleteOrderImaging,
  getAllOrderImaging,
  getOrderImaging,
  updateOrderImaging,
} from "../../controllers/radiology/orderImagingController.js";

router.route("/").post(admin, createOrderImaging).get(admin, getAllOrderImaging);
router
  .route("/:id")
  .delete(admin, deleteOrderImaging)
  .patch(admin, updateOrderImaging)
  .get(admin, getOrderImaging);

export default router;
