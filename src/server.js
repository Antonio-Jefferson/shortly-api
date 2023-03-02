import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRouter from "./Routers/urls.routers.js";
import authRouter from "./Routers/auth.router.js"
import userRouter from "./Routers/user.router.js";
userRouter
dotenv.config()

const server = express();


server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(urlRouter);
server.use(userRouter);

const port = process.env.PORT || 5000
server.listen(port, ()=> console.log(`running on the door ${port}`))