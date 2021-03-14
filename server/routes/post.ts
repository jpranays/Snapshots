import { Router } from "express";
import {
	getPosts,
	getPost,
	addPost,
	editPost,
	deletePost,
	editPostLike,
} from "../Controllers/posts";

export const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:_id", getPost);
postRouter.post("/addpost", addPost);
postRouter.post("/updatepost", editPost);
postRouter.post("/updatepostlike", editPostLike);
postRouter.post("/deletepost", deletePost);
