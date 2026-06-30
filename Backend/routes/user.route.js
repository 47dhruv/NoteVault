import { Router } from "express";
import {
    registerUser,
    loginUser,
    upadtePassword,
    upadteUser,
    deleteUser,
    logoutUser,
    getCurrentUser
} from "../controllers/user.controller.js"
import { auth } from "../middlwares/auth.middlwares.js";


const router = Router()

router.route("/register")
    .post(registerUser)
router.route("/login")
    .post(loginUser)
router.route("/logout")
    .post(auth,logoutUser)
router.route("/delete")
    .delete(auth,deleteUser)
router.route("/updatepassword")
    .put(auth,upadtePassword)
router.route("/updateUser")
    .put(auth,upadteUser)
router.route("/currentuser")
    .get(auth,getCurrentUser)

export default router