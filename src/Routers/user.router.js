import {Router} from "express";
import { auth } from "../Middlewares/auth.middlewarre.js";


const userRouter = Router();

userRouter.get("/users/me", auth, )