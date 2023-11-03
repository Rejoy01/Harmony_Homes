import express from "express"
import { createResidency, deleteResidency, getAllResidencies, getResidency, markResidencyAsSold } from "../controllers/ResidencyController.js";
import jwtCheck from "../config/authConfig.js";
const router = express.Router();

router.post('/create',jwtCheck,createResidency)
router.get('/allres',getAllResidencies)
router.get('/:id',getResidency)
router.put("/:id",markResidencyAsSold)
router.delete("/:id",deleteResidency)
export {router as residencyRoute}