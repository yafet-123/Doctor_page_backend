import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
    createlabDepartment,
    deletelabDepartment,
    getAlllabDepartment,
    getlabDepartment,
    updatelabDepartment,
} from "../../controllers/laboratory/labDepartmentController.js";

router.route("/").post(admin, createlabDepartment).get(admin, getAlllabDepartment);
router
  .route("/:id")
  .delete(admin, deletelabDepartment)
  .patch(admin, updatelabDepartment)
  .get(admin, getlabDepartment);

export default router;
