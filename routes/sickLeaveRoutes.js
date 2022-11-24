import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createSickLeave,
    deleteSickLeave,
    getAllSickLeave,
    getSickLeave,
    updateSickLeave,
} from "../controllers/sickLeaveController.js";

router.route("/").post(admin, createSickLeave).get(admin, getAllSickLeave);
router
  .route("/:id")
  .delete(admin, deleteSickLeave)
  .patch(admin, updateSickLeave)
  .get(admin, getSickLeave);

export default router;
