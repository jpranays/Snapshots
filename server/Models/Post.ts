import { Schema, model } from "mongoose";

const PostSchema = new Schema(
	{
		postData: String,
		createdBy: String,
	},
	{ _id: true, timestamps: true }
);

export default model("posts", PostSchema);
