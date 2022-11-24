import express from "express";
const router = express.Router();

import { register, login ,Update} from "../controllers/authController.js";
import { admin } from "../middleware/auth.js";

router.route("/register").post(admin, register);
router.route("/forgot/:id").patch(admin, Update);
router.route("/login").post(login);

export default router;
