import {Router} from "express";
import { getByIdUser, getRanking } from "../Controllers/user.controller.js";
import { auth } from "../Middlewares/auth.middlewarre.js";


const userRouter = Router();

userRouter.get("/users/me", auth, getByIdUser )
userRouter.get("/ranking", getRanking )

export default userRouter;