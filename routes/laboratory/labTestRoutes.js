import express from "express";
const router = express.Router();
import { admin } from "../../middleware/auth.js";

import {
    createLabPannel,
    deleteLabPannel,
    getAllLabTest,
    getLabPannel,
    updateLabPannel,
} from "../../controllers/laboratory/labTestController.js";

router.route("/").post(admin, createLabPannel).get(admin, getAllLabTest);
router
  .route("/:id")
  .delete(admin, deleteLabPannel)
  .patch(admin, updateLabPannel)
  .get(admin, getLabPannel);

export default router;