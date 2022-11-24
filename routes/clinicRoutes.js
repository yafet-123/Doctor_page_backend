import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
  createClinic,
  deleteClinic,
  getAllClinics,
  getClinic,
  updateClinic,
} from "../controllers/clinicController.js";

router.route("/").post(createClinic).get(getAllClinics);
router
  .route("/:id")
  .delete(admin, deleteClinic)
  .patch(updateClinic)
  .get(getClinic);

export default router;
