import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
  createPrescription,
  deletePrescription,
  getAllPrescription,
  getPrescription,
  updatePrescription,
} from "../controllers/prescriptionController.js";

router
  .route("/")
  .post(admin, createPrescription)
  .get(admin, getAllPrescription);
router
  .route("/:id")
  .delete(admin, deletePrescription)
  .patch(admin, updatePrescription)
  .get(admin, getPrescription);

export default router;
