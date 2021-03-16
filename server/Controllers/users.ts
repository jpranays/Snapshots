import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User";

export const signup = async (req: Request, res: Response) => {
	const { username, email, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Passwords dont match" });
	} else {
		try {
			const existingUser = await User.findOne({ username: username });
			if (existingUser) {
				return res.status(422).json({ message: "User Already Exists" });
			}
			let hashedPassword = await bcrypt.hash(password, 12);
			const newUser = new User({ username, email, password: hashedPassword });
			await newUser.save();
			return res.status(201).json({ message: "User Successfully Registered" });
		} catch (err) {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			res.status(err.statusCode).json(err.message);
		}
	}
};
export const signin = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const existingUser = await User.findOne({ username: username });
		if (!existingUser) {
			return res.status(404).json({ message: "No Such User Found" });
		}

		let isSame = await bcrypt.compare(password, existingUser.password!);

		if (!isSame) {
			return res
				.status(422)
				.json({ message: "Username or Password wont match" });
		}

		const token = jwt.sign(
			{
				_id: existingUser._id,
				username: username,
			},
			"test",
			{
				expiresIn: "1h",
			}
		);

		return res.status(200).json({
			token,
			_id: existingUser._id,
			username: existingUser.username,
			message: "User Successfully Logged-in",
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		console.log(err);

		res.status(err.statusCode).json(err.message);
	}
};

export const verifyToken = (req: Request, res: Response) => {
	const { oldToken: token } = req.body;
	let decodedData: any = jwt.verify(token, "test");
	if (decodedData) {
		res.status(200).json({ decodedData });
	} else {
		res.status(400);
	}
};
