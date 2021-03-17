import { Router } from "express";
import { signin, signup, verifyToken, verifyUser } from "../Controllers/users";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/verifytoken", verifyToken);
userRouter.post("/verifyuser", verifyUser);
