import { Schema, model, Document } from "mongoose";

type PostModel = Document & {
	title: String;
	content: String;
	image: String;
	likes: Number;
	createdBy: String;
};
const PostSchema = new Schema(
	{
		title: String,
		content: String,
		image: String,
		likes: {
			type: Number,
			default: 0,
		},
		createdBy: String,
	},
	{
		_id: true,
		timestamps: true,
	}
);

export default model<PostModel>("Posts", PostSchema);
