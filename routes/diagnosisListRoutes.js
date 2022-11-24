import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createDiagnosisList,
    // deleteDiagnosisList,
    getAllDiagnosisList,
    getDiagnosisList,
    updateDiagnosisList,
} from "../controllers/diagnosisListController.js";

router.route("/").post(admin, createDiagnosisList).get(admin, getAllDiagnosisList);
router
  .route("/:id")
  // .delete(admin, deleteDiagnosisList)
  .patch(admin, updateDiagnosisList)
  .get(admin, getDiagnosisList);

export default router;