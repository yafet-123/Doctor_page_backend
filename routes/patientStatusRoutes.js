import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createPatientStatus,
    deletePatientStatus,
    getAllPatientStatus,
    getPatientStatus,
    updatePatientStatus,
} from "../controllers/patientStatusController.js";

router.route("/").post(admin, createPatientStatus).get(admin, getAllPatientStatus);
router
  .route("/:id")
  .delete(admin, deletePatientStatus)
  .patch(admin, updatePatientStatus)
  .get(admin, getPatientStatus);

export default router;