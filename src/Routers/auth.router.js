import { signUp, signIn } from "../Controllers/usersController.js";
import {Router} from "express"
import {validatSchemas} from "../Middlewares/validatSchemas.js"
import { userValidation, loginValidation } from '../Schemas/userValidation.js'

const authRouter = Router();

authRouter.post("/signup", validatSchemas(userValidation), signUp)
authRouter.post("/signin", validatSchemas(loginValidation), signIn)

export default authRouter