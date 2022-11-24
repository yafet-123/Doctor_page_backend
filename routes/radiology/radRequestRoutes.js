import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
    createRadRequest,
    deleteRadRequest,
    getAllRadRequest,
    getRadRequest,
    updateRadRequest,
} from "../../controllers/radiology/radRequestController.js";

router.route("/").post(admin, createRadRequest).get(admin, getAllRadRequest);
router
  .route("/:id")
  .delete(admin, deleteRadRequest)
  .patch(admin, updateRadRequest)
  .get(admin, getRadRequest);

export default router;
