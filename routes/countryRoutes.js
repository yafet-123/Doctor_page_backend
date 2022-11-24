import express from "express";
const router = express.Router();
import { admin } from "../middleware/auth.js";

import {
    createCountry,
    deleteCountry,
    getAllCountry,
    getCountry,
    updateCountry,
} from "../controllers/countryController.js";

router.route("/").post(admin, createCountry).get(admin, getAllCountry);
router
  .route("/:id")
  .delete(admin, deleteCountry)
  .patch(admin, updateCountry)
  .get(admin, getCountry);

export default router;
