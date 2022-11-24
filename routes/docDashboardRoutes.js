import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createDocDashboard,
  deleteDocDashboard,
  getAllDocDashboard,
  getDocDashboard,
  updateDocDashboard,
} from "../controllers/docDashboardController.js";

router.route("/").post(admin, createDocDashboard).get(admin, getAllDocDashboard);
router
  .route("/:id")
  .delete(admin, deleteDocDashboard)
  .patch(admin, updateDocDashboard)
  .get(admin, getDocDashboard);

export default router;
