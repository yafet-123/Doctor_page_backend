import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
  createRelationship,
  deleteRelationship,
  getAllRelationship,
  getRelationship,
  updateRelationship,
} from "../controllers/relationshipController.js";

router.route("/").post(admin, createRelationship).get(admin, getAllRelationship);
router
  .route("/:id")
  .delete(admin, deleteRelationship)
  .patch(admin, updateRelationship)
  .get(admin, getRelationship);

export default router;
