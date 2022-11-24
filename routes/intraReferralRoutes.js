import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createIntraReferral,
    deleteIntraReferral,
    getAllIntraReferral,
    getIntraReferral,
    updateIntraReferral,
} from "../controllers/intraReferralController.js";

router.route("/").post(admin, createIntraReferral).get(admin, getAllIntraReferral);
router
  .route("/:id")
  .delete(admin, deleteIntraReferral)
  .patch(admin, updateIntraReferral)
  .get(admin, getIntraReferral);

export default router;
