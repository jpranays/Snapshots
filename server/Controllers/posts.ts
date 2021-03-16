import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Post from "../Models/Post";
export const getPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find({}, { updatedAt: 0, __v: 0 });
		res.status(200).json(posts);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
export const addPost = async (req: Request | any, res: Response) => {
	try {
		const { title, content } = req.body;
		const { file = null } = req;
		const createdBy = {
			_id: req._id,
			username: req.username,
		};

		const newPost = new Post({
			title,
			content,
			image: file?.filename,
			createdBy,
		});
		await newPost.save();
		res.status(201).json(newPost);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		res.status(err.statusCode).json(err.message);
	}
};
export const editPostLike = async (req: Request | any, res: Response) => {
	try {
		const { _id } = req.body;
		let updateLike = await Post.updateOne(
			{
				_id: _id,
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
export const editPost = async (req: Request | any, res: Response) => {
	try {
		const { _id, title, content, prevImage } = req.body;
		const { file = null } = req;
		const createdBy = {
			_id: req._id,
			username: req.username,
		};

		if (file && prevImage) {
			fs.promises
				.unlink(path.join(path.resolve(), `../dist/uploads/${prevImage}`))
				.catch((err) => {
					console.log(err);
				});
		}
		await Post.updateOne(
			{
				_id: _id,
				"createdBy._id": createdBy._id,
			},
			{
				$set: {
					title: title,
					content: content,
					image: file ? file?.filename : prevImage[0],
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
export const deletePost = async (req: Request | any, res: Response) => {
	try {
		const { _id } = req.body;
		const createdBy = {
			_id: req._id,
			username: req.username,
		};

		let prevImage = await Post.findOne({ _id: _id }, { image: 1 });

		let deletedPost = await Post.deleteOne({
			_id: _id,
			"createdBy._id": createdBy._id,
		});
		fs.promises
			.unlink(path.join(path.resolve(), `../dist/uploads/${prevImage?.image}`))
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

export const getPost = async (req: Request | any, res: Response) => {
	try {
		const { _id } = req.params;
		const createdBy = {
			_id: req._id,
			username: req.username,
		};

		const post = await Post.find(
			{
				_id: _id,
				"createdBy._id": createdBy._id,
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
