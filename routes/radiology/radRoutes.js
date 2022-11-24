import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
  getAllPendingRadRequest,
  TransferOrderRadRequest,
  getAllPendingPaymentRadRequest,
  TransferBackRadRequest,
  getAllPendingResultRadRequest,
  AddRadResult,
  ResultRadRequest
} from "../../controllers/radiology/radController.js";

router
  .route("/")
  .patch(admin, TransferOrderRadRequest)

router
  .route("/:id")
  .get(admin, getAllPendingRadRequest);

router
  .route("/payment/:id")
  .patch(admin, TransferBackRadRequest)
  .get(admin, getAllPendingPaymentRadRequest);
router
  .route("/pendingresult/:id")
  .patch(admin, AddRadResult)
  .get(admin, getAllPendingResultRadRequest);
router
  .route("/result/:id")
  .get(admin, ResultRadRequest);
export default router;
