import { Router } from "express";
import {
	getPosts,
	getPost,
	addPost,
	editPost,
	deletePost,
	editPostLike,
} from "../Controllers/posts";
import { auth } from "../middleware/auth";

export const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:_id", auth, getPost);
postRouter.post("/addpost", auth, addPost);
postRouter.post("/updatepost", auth, editPost);
postRouter.post("/updatepostlike", auth, editPostLike);
postRouter.post("/deletepost", auth, deletePost);
