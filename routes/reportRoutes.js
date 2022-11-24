import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
  getReport,
  getPatientCountReport,
} from "../controllers/reportController.js";

router.route("/pcount").get(admin, getPatientCountReport);
router.route("/:id").get(admin, getReport);

export default router;
