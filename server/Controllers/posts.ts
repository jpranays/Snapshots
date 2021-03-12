import { Request, Response } from "express";
import Post from "../Models/Post";

export const allPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (err) {
		res.status(err.statusCode).json(err.message);
	}
};
export const createPost = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (err) {
		res.status(err.statusCode).json(err.message);
	}
};
