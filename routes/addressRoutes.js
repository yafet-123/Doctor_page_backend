import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createRegion,
    deleteRegion,
    getAllAddress,
    getRegion,
    updateRegion,
} from "../controllers/addressController.js";

router.route("/").post(admin, createRegion).get(admin, getAllAddress);
router
  .route("/:id")
  .delete(admin, deleteRegion)
  .patch(admin, updateRegion)
  .get(admin, getRegion);

export default router;
