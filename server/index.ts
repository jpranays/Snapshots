import express from "express";
import mongoose from "mongoose";
import { postRouter } from "./routes/post";
import multer from "multer";
import path from "path";
import { v4 } from "uuid";
const app = express();
const PORT: String | Number = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(path.resolve(), "/uploads")));
const fileFilter = (
	req: any,
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
			fileSize: 1024 * 1024 * 5,
		},
		fileFilter: fileFilter,
	}).single("file")
);
app.use("/posts", postRouter);

mongoose
	.connect("mongodb://localhost:27017/snapshots", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
	})
	.catch((err) => {
		console.log(err);
	});
