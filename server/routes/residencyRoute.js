import express from "express"
import { createResidency, getAllResidencies, getResidency } from "../controllers/ResidencyController.js";
import jwtCheck from "../config/authConfig.js";
const router = express.Router();

router.post('/create',jwtCheck,createResidency)
router.get('/allres',getAllResidencies)
router.get('/:id',getResidency)
export {router as residencyRoute}