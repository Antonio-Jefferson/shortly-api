import { signUp, signIn } from "../Controllers/auth.controller.js";
import {Router} from "express"
import { userValidation, loginValidation } from '../Schemas/auth.schema.js'
import { validatUser, signInValidation } from "../Middlewares/validationSchemas.js";
import { GeneralValidation } from "../Middlewares/GeneralValidation.js";

const authRouter = Router();

authRouter.post("/signup",validatUser, GeneralValidation(userValidation), signUp)
authRouter.post("/signin",signInValidation, GeneralValidation(loginValidation), signIn)

export default authRouter