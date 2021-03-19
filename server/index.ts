import express, { NextFunction, Request, Response } from "express";
import path from "path";
import * as dotenv from "dotenv";

import multer from "multer";
import mongoose from "mongoose";

import { v4 } from "uuid";

import { postRouter } from "./routes/post";
import { userRouter } from "./routes/user";

const app = express();
dotenv.config({ path: "../../.env" });

const PORT: string | number = process.env.PORT || 5000;

console.log(path.resolve());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(), "/uploads")));

const fileFilter = (
	_req: Request,
	file: { mimetype: string },
	cb: (arg0: null, arg1: boolean) => void
) => {
	if (
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const storage = multer.diskStorage({
	destination: "uploads/",
	filename: function (req, file, cb) {
		cb(null, `${v4().toString()}_${file.originalname}`);
	},
});

app.use(
	"/posts/addpost",
	multer({
		storage: storage,
		limits: {
			fileSize: 1024 * 1024 * 5,
		},
		fileFilter: fileFilter,
	}).single("file")
);
app.use(
	"/posts/updatepost",
	multer({
		storage: storage,
		limits: {
			fileSize: 1024 * 5,
		},
		fileFilter: fileFilter,
	}).single("file")
);
app.use("/posts", postRouter);
app.use("/user", userRouter);
app.use((err: any, req: any, res: Response, next: NextFunction) => {
	if (!err.statusCode) {
		err.statusCode = 500;
	}
	res.status(err.statusCode).json(err.message);
});

mongoose
	.connect(process.env.DB_CONNECTION! as string, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
	})
	.catch((err) => {
		console.log(process.env.DB_CONNECTION!);

		console.log(err);
	});
