import express from "express";
import mongoose from "mongoose";
import { postRouter } from "./routes/post";

const app = express();
const PORT: String | Number = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRouter);

mongoose
	.connect("mongodb://localhost:27017/posts", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
	})
	.catch((err) => {
		console.log(err);
	});
