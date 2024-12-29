import express from "express"

import {getAllUser, login, register, getMyProfile, logout } from "../controller/user.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.get("/all", getAllUser)

router.post("/register", register)

router.post("/login", login)

router.get("/logout", logout)

router.get("/me",isAuthenticated,getMyProfile)

export default router;