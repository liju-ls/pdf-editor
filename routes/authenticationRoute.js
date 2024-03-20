import Express from "express";
import { login, register } from "../controllers/authenticationController.js";

const router = Express.Router();

router.post("/login", login);

router.post("/register", register);

export default router;
