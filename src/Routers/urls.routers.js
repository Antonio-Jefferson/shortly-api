import {Router} from "express"
import { GeneralValidation } from "../Middlewares/GeneralValidation.js";
import {validationUrl} from "../Schemas/url.schema.js"
import {  isertShortUrl, showUrl, visitUrl,deleteUrl } from "../Controllers/shortUrl.controller.js";
import { validateId } from "../Middlewares/validationSchemas.js";
import { validateShortUrl } from "../Middlewares/validatedShortUrl.js";
import {authValidation} from "../Middlewares/auth.middlewarre.js"
const urlRouter = Router();

urlRouter.post("/urls/shorten",authValidation, GeneralValidation(validationUrl), isertShortUrl)
urlRouter.get("/urls/:id", validateId,  showUrl)
urlRouter.get("/urls/open/:shortUrl",validateShortUrl, visitUrl)
urlRouter.delete("/urls/:id",authValidation,validateId, deleteUrl)

export default urlRouter;