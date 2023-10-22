import express from "express";
import { allBookings, bookVisit, cancelBooking, createUser, getAllFavorites, toFav } from "../controllers/userController.js";
import jwtCheck from "../config/authConfig.js";


const router = express.Router()

router.post("/register",jwtCheck,createUser)
router.post("/bookVisit/:id",jwtCheck,bookVisit)
router.post("/allBookings",allBookings)
router.post("/removeBookings/:id",jwtCheck,cancelBooking)
router.post("/toFav/:id",jwtCheck,toFav)
router.post("/allFav",jwtCheck,getAllFavorites)


export {router as userRoute}