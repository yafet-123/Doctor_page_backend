import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createIdtype,
    deleteIdtype,
    getAllIdtype,
    getIdtype,
    updateIdtype,
} from "../controllers/idtypeController.js";

router.route("/").post(admin, createIdtype).get(admin, getAllIdtype);
router
  .route("/:id")
  .delete(admin, deleteIdtype)
  .patch(admin, updateIdtype)
  .get(admin, getIdtype);

export default router;
