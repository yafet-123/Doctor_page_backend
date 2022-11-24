import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
    createLabPannel,
    deleteLabPannel,
    getAllLabPannel,
    getLabPannel,
    updateLabPannel,
} from "../../controllers/laboratory/labPanelController.js";

router.route("/").post(admin, createLabPannel).get(admin, getAllLabPannel);
router
  .route("/:id")
  .delete(admin, deleteLabPannel)
  .patch(admin, updateLabPannel)
  .get(admin, getLabPannel);

export default router;