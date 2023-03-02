import {Router} from "express";
import { getByIdUser } from "../Controllers/user.controller.js";
import { auth, authValidation } from "../Middlewares/auth.middlewarre.js";


const userRouter = Router();

userRouter.get("/users/me", auth, getByIdUser )

export default userRouter;