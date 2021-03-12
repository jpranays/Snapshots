import { Router } from "express";
import {
	allPosts,
	createPost,
	updatePost,
	deletePost,
} from "../Controllers/posts";

export const postRouter = Router();

postRouter.get("/", allPosts);
postRouter.post("/addPost", createPost);
postRouter.patch("/updatePost", updatePost);
postRouter.delete("/deletePost", deletePost);
