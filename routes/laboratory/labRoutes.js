import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
  getAllPendinglabRequest,
  TransferOrderLabRequest,
  getAllPendingPaymentLabRequest,
  TransferBackLabRequest,
  getAllPendingResultLabRequest,
  AddLabResult,
  ResultLabRequest
} from "../../controllers/laboratory/labController.js";

router
  .route("/")
  .patch(admin, TransferOrderLabRequest)

router
  .route("/:id")
  .get(admin, getAllPendinglabRequest);

router
  .route("/payment/:id")
  .patch(admin, TransferBackLabRequest)
  .get(admin, getAllPendingPaymentLabRequest);
router
  .route("/pendingresult/:id")
  .patch(admin, AddLabResult)
  .get(admin, getAllPendingResultLabRequest);
router
  .route("/result/:id")
  .get(admin, ResultLabRequest);
export default router;
