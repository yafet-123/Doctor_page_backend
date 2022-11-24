import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    searchPatient
} from "../controllers/searchController.js";

router
  .route("/")
  .post(admin, searchPatient);

export default router;