import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    getAllUser, deleteTitle, getTitle, updateTitle,
} from "../controllers/userController.js";

router.route("/").get(admin, getAllUser);
router
  .route("/:id")
  .delete(admin, deleteTitle)
  .patch(admin, updateTitle)
  .get(admin, getTitle);

export default router;
