import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
  getAllTransfers,
  PayedCasher,
  getAllPaid,
} from "../controllers/casherController.js";

router
  .route("/")
  .patch(admin,PayedCasher)
  router
  .route("/:id")
  .patch(admin,PayedCasher)
  .get(admin, getAllTransfers);
router
  .route("/paid/:id")
  .get(admin, getAllPaid);

export default router;
