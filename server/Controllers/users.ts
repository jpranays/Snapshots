import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User";
import * as dotenv from "dotenv";

import { createTransport } from "nodemailer";

dotenv.config({ path: "../../.env" });

console.log(process.env.EMAIL_SENDER);

const SENDER = process.env.EMAIL_SENDER;
const PASSWORD = process.env.EMAIL_PASSWORD;
const Transport = createTransport({
	service: "gmail",
	auth: {
		user: SENDER,
		pass: PASSWORD,
	},
});
const mailOptions = {
	from: SENDER,
	to: "",
	subject: "ONE TIME PASSWORD",
	html: "",
};
export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, email, password, confirmPassword } = req.body;

	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Passwords dont match" });
	} else {
		try {
			const existingUser = await User.findOne({
				username: username,
				verified: true,
			});
			if (existingUser) {
				return res.status(422).json({ message: "User Already Exists" });
			}
			const otp = Math.floor(Math.random() * 10000);
			const newUser = new User({
				username,
				email,
				loginToken: {
					token: otp,
					tokenCreated: Date.now(),
				},
			});
			mailOptions.to = email;
			mailOptions.subject = "One Time Password";
			mailOptions.html = `<h2>Kindly Enter This OTP To Register Account ,OTP Is Valid For Only 10 Minutes</h2><h3>${otp}</h3>`;
			await Promise.all([newUser.save(), Transport.sendMail(mailOptions)]);
			return res
				.status(200)
				.json({ message: "OTP sent successfully,check your Email" });
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
};
export const verifyUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, email, password, OTP } = req.body;

	try {
		const existingUser = await User.findOne({
			username: username,
			email: email,
			"loginToken.token": OTP,
		});

		if (existingUser) {
			let now = Date.now();
			let isValid =
				now -
				Date.parse(
					(existingUser?.loginToken?.tokenCreated as unknown) as string
				);
			if (isValid > 1000 * 60 * 10) {
				return res.status(422).json({ message: "Token Expired " });
			}
			let hashedPassword = await bcrypt.hash(password, 12);
			const newUser = new User({
				username,
				email,
				password: hashedPassword,
				verified: true,
			});
			mailOptions.to = email;
			mailOptions.subject = "Account Created Successfully";
			mailOptions.html = `<h2>Thanks for using SnapShots</h2><h1>Welcome aboard ${username}</h1>`;
			await Promise.all([
				newUser.save(),
				Transport.sendMail(mailOptions),
				User.deleteMany({ username: username, verified: false }),
			]);
			return res.status(201).json({ message: "Account created successfully" });
		} else {
			return res.status(401).json({ message: "Something went wrong" });
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
};
export const signin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, password } = req.body;

	try {
		const existingUser = await User.findOne({
			username: username,
			verified: true,
		});
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
		next(err);
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
