import { signUp, signIn } from "../Controllers/auth.controller.js";
import {Router} from "express"
import { userValidation, loginValidation } from '../Schemas/auth.schema.js'
import { validatSchemas } from "../Middlewares/validationSchemas.js";
import { GeneralValidation } from "../Middlewares/GeneralValidation.js";

const authRouter = Router();

authRouter.post("/signup", GeneralValidation(userValidation), signUp)
authRouter.post("/signin", validatSchemas(loginValidation), signIn)

export default authRouter