import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createOccupation,
    deleteOccupation,
    getAllOccupation,
    getOccupation,
    updateOccupation,
} from "../controllers/occupationController.js";

router.route("/").post(admin, createOccupation).get(admin, getAllOccupation);
router
  .route("/:id")
  .delete(admin, deleteOccupation)
  .patch(admin, updateOccupation)
  .get(admin, getOccupation);

export default router;