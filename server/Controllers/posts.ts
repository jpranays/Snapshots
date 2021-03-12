import { Request, Response } from "express";
import Post from "../Models/Post";

export const allPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
export const createPost = async (req: Request, res: Response) => {
	try {
		const { postData, createdBy = "15" } = req.body;
		const newPost = new Post({ postData, createdBy });
		await newPost.save();
		res.status(201).json(newPost);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
export const updatePost = async (req: Request, res: Response) => {
	try {
		const { _id, createdBy = "15", newPostData } = req.body;
		let updatePost = await Post.updateOne(
			{
				_id: _id,
			},
			{
				$set: {
					postData: newPostData,
				},
			}
		);
		res.status(200).json(updatePost);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
export const deletePost = async (req: Request, res: Response) => {
	try {
		const { _id, createdBy = "15" } = req.body;
		let deletePost = await Post.deleteOne({
			_id: _id,
			createdBy: createdBy,
		});
		res.status(200).json(deletePost);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
