// create router for auth 
import { Router } from "express";
import { login, logout, register,getCurrentUser } from "../controllers/auth.controller";
import { isAuth } from "../middlewares/isAuth";
const router = Router()

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",isAuth,getCurrentUser);

export default router