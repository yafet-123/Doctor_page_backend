import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createTitle, deleteTitle, getAllTitle, getTitle, updateTitle,
} from "../controllers/titleController.js";

router.route("/").post(admin, createTitle).get(admin, getAllTitle);
router
  .route("/:id")
  .delete(admin, deleteTitle)
  .patch(admin, updateTitle)
  .get(admin, getTitle);

export default router;
