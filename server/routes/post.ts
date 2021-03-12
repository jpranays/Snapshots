import { Router } from "express";
import { allPosts } from "../Controllers/posts";
import { createPost } from "../Controllers/posts";

export const postRouter = Router();

postRouter.get("/", allPosts);
postRouter.post("/addPost", createPost);
