import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
  getAllLabRequest,
  TransferOrdeLabRequest,
} from "../controllers/labRequestController.js";

router
  .route("/:id")
  .patch(admin,TransferOrdeLabRequest)
  .get(admin, getAllLabRequest);

export default router;
