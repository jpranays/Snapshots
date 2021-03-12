import { Schema, model } from "mongoose";

const PostSchema = new Schema({
	postData: String,
	createdBy: String,
});

export default model("posts", PostSchema);
