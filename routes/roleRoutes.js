import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
  createRole,
  deleteRole,
  getAllRoles,
  getRole,
  updateRole,
} from "../controllers/roleController.js";

router.route("/").post(admin, createRole).get(admin, getAllRoles);
router
  .route("/:id")
  .delete(admin, deleteRole)
  .patch(admin, updateRole)
  .get(admin, getRole);

export default router;
