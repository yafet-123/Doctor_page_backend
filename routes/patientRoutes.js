import express from "express";
const router = express.Router();
import {admin,reception} from '../middleware/auth.js'

import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatient,
  updatePatient,
} from "../controllers/patientsController.js";


router.route('/').post(reception,createPatient).get(reception,getAllPatients)
router.route('/:id').delete(admin,deletePatient).patch(admin,updatePatient).get(reception,getPatient)

export default router