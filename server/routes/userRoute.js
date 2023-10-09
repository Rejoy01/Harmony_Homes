import express from "express";
import { allBookings, bookVisit, cancelBooking, createUser, getAllFavorites, toFav } from "../controllers/userController.js";

const router = express.Router()

router.post("/register",createUser)
router.post("/bookVisit/:id",bookVisit)
router.post("/allBookings",allBookings)
router.post("/removeBookings/:id",cancelBooking)
router.post("/toFav/:rid",toFav)
router.post("/allFav",getAllFavorites)


export {router as userRoute}