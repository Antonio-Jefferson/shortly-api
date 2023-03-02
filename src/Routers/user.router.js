import {Router} from "express";
import { getByIdUser, getRanking } from "../Controllers/user.controller.js";
import { userMeValidation } from "../Middlewares/usersMe.middleware.js";

const userRouter = Router();

userRouter.get("/users/me",userMeValidation, getByIdUser )
userRouter.get("/ranking", getRanking )

export default userRouter;