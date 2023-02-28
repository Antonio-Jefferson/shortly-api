import { singUp, singIn } from "../Controllers/usersController.js";
import {Router} from "express"
import {validatSchemas} from "../Middlewares/validatSchemas.js"
import { userValidation, loginValidation } from '../Schemas/userValidation.js'

const authRouter = Router();

authRouter.post("/singup",validatSchemas(userValidation), singUp)
authRouter.post("/singin",validatSchemas(loginValidation), singIn)

export default authRouter