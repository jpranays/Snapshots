import { Request, Response, Router } from "express";
import { signin, signup, verifyToken } from "../Controllers/users";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/verifytoken", verifyToken);
