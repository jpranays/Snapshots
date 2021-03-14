import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Post from "../Models/Post";

export const getPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find({}, { createdBy: 0, updatedAt: 0, __v: 0 });
		res.status(200).json(posts);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
export const addPost = async (req: Request, res: Response) => {
	try {
		const { title, content } = req.body;
		const { file = null } = req;

		const newPost = new Post({ title, content, image: file?.filename });
		await newPost.save();
		res.status(201).json(newPost);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
export const editPostLike = async (req: Request, res: Response) => {
	try {
		const { _id, createdBy = "15" } = req.body;
		let updateLike = await Post.updateOne(
			{
				_id: _id,
				// createdBy: createdBy,
			},
			{
				$inc: {
					likes: 1,
				},
			}
		);
		res.status(200).json(updateLike);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
export const editPost = async (req: Request, res: Response) => {
	try {
		const { _id, title, content, prevImage } = req.body;
		const { file = null } = req;
		fs.promises
			.unlink(path.join(path.resolve(), `../dist/uploads/${prevImage}`))
			.then(() => {})
			.catch((err) => {
				console.log(err);
			});

		await Post.updateOne(
			{
				_id: _id,
			},
			{
				$set: {
					title: title,
					content: content,
					image: file?.filename,
				},
			}
		);
		let updatedPost = await Post.findOne({ _id: _id }, { image: 1 });
		res.status(200).json(updatedPost);
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
		let prevImage = await Post.findOne({ _id: _id }, { image: 1 });

		let deletedPost = await Post.deleteOne({
			_id: _id,
		});
		fs.promises
			.unlink(path.join(path.resolve(), `../dist/uploads/${prevImage?.image}`))
			.then(() => {})
			.catch((err) => {
				console.log(err);
			});
		res.status(200).json(deletedPost);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};

export const getPost = async (req: Request, res: Response) => {
	try {
		const { _id, createdBy = "15" } = req.params;
		const post = await Post.find(
			{
				_id: _id,
				// createdBy: createdBy,
			},
			{ createdBy: 0, updatedAt: 0, __v: 0 }
		);
		res.status(200).json(post);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
