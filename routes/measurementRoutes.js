import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createMeasurement,
  deleteMeasurement,
  getAllMeasurement,
  getMeasurement,
  updateMeasurement,
} from "../controllers/measurementController.js";

router.route("/").post(admin, createMeasurement).get(admin, getAllMeasurement);
router
  .route("/:id")
  .delete(admin, deleteMeasurement)
  .patch(admin, updateMeasurement)
  .get(admin, getMeasurement);

export default router;
