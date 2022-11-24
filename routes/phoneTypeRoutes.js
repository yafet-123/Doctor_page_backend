import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
  createPhoneType,
  deletePhoneType,
  getAllPhoneType,
  getPhoneType,
  updatePhoneType,
} from "../controllers/phoneTypeController.js";

router.route("/").post(admin, createPhoneType).get(admin, getAllPhoneType);
router
  .route("/:id")
  .delete(admin, deletePhoneType)
  .patch(admin, updatePhoneType)
  .get(admin, getPhoneType);

export default router;
