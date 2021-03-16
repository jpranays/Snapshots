import { Schema, model, Document } from "mongoose";

type PostModel = Document & {
	title: String;
	content: String;
	image: String;
	likes: Number;
	createdBy: {
		_id: String;
		username: String;
	};
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
		createdBy: {
			_id: String,
			username: String,
		},
	},
	{
		_id: true,
		timestamps: true,
	}
);

export default model<PostModel>("Posts", PostSchema);
