import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
    createRadDepartment,
    deleteRadDepartment,
    getAllRadDepartment,
    getRadDepartment,
    updateRadDepartment,
} from "../../controllers/radiology/radDepartmentController.js";

router.route("/").post(admin, createRadDepartment).get(admin, getAllRadDepartment);
router
  .route("/:id")
  .delete(admin, deleteRadDepartment)
  .patch(admin, updateRadDepartment)
  .get(admin, getRadDepartment);

export default router;
