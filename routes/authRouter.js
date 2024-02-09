import { Router } from "express";
const router = Router();
import { register, login, logout } from "../Controllers/authController.js";
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";

router.post('/register', validateRegisterInput, register);
router.post("/login",validateLoginInput, login);
router.get("/logout", logout);

export default router;