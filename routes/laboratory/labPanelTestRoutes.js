import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
    createLabPannel,
    deleteLabPannel,
    getAllLabPanelTest,
    getLabPannel,
    updateLabPannel,
} from "../../controllers/laboratory/labPanelTestController.js";

router.route("/").post(admin, createLabPannel).get(admin, getAllLabPanelTest);
router
  .route("/:id")
  .delete(admin, deleteLabPannel)
  .patch(admin, updateLabPannel)
  .get(admin, getLabPannel);

export default router;